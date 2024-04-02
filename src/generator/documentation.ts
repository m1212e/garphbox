import type { DMMF } from "@prisma/generator-helper";

export enum Annotation {
  HIDDEN = 0,
  HIDDEN_DATA = 1,
}

export function parseDocumentation(
  raw: DMMF.Model["fields"][number]["documentation"]
) {
  if (!raw) {
    return { annotations: [] as Annotation[], description: undefined };
  }

  const annotations: Annotation[] = [];

  let description = "";

  for (const line of raw.split("\n").map((l) => l.trim())) {
    if (line.startsWith("@garph.hide") || line.startsWith("@garph.hidden")) {
      if (
        line.startsWith("@garph.hide.data") ||
        line.startsWith("@garph.hidden.data")
      ) {
        annotations.push(Annotation.HIDDEN_DATA);
      } else {
        annotations.push(Annotation.HIDDEN);
      }
    } else {
      description += `${line}\n`;
    }
  }

  description = description.trim();

  return { annotations, description };
}
