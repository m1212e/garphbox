export let garphImportVariableName = "g";
export let garphImportDependencyName = "garph";

export function setGarphImportVariableName(name: string) {
  garphImportVariableName = name;
}

export function setGarphImportDependencyName(name: string) {
  garphImportDependencyName = name;
}

export function GarphImportStatement() {
  return `import { ${garphImportVariableName} } from "${garphImportDependencyName}"\n`;
}
