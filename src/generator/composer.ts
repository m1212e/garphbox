import type { Models } from "../util/modelMap";
import { GarphImportStatement } from "./garphInstance";

export function Compose(models: Models) {
  let ret = `${GarphImportStatement()}`;

  const importSet = new Set<string>();
  for (const [_, model] of models) {
    for (const t of model.referencedTypes) {
      let found = false;
      for (const [key] of models) {
        if (key === t) {
          found = true;
          break;
        }
      }
      // we only want imports from other files
      if (!found) {
        importSet.add(t);
      }
    }
  }

  ret += `${Array.from(importSet)
    .map((t) => `import { ${t} } from "./${t}"`)
    .join("\n")}\n`;

  for (const [modelName, model] of models) {
    ret += `export const ${modelName} = ${model.garphString}\n`;
  }

  return ret;
}
