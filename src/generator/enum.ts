import type { DMMF } from "@prisma/generator-helper";
import { garphImportVariableName } from "./garphInstance";
import { Annotation, parseDocumentation } from "./documentation";

export function Enum(
  data: Pick<DMMF.DatamodelEnum, "values" | "documentation" | "name">
) {
  const doc = parseDocumentation(data.documentation);
  if (doc.annotations.includes(Annotation.HIDDEN)) return undefined;

  return `${garphImportVariableName}.enumType('${data.name}', [${data.values.map((v) => `'${v.name}'`)}] as const)${doc.description ? `.description(\`${doc.description}\`)` : ""}\n`;
}
