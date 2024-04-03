import { GarphImportStatement, garphImportVariableName } from "./garphInstance";

export const dateVariableName = "_Date";

export function DateType() {
  return `${GarphImportStatement()}
  
  export const ${dateVariableName} = ${garphImportVariableName}.scalarType<Date, number>("Date", {
    serialize: (value) => value.getTime(),
    parseValue: (value) => new Date(value),
  })\n`;
}

export function DateImport() {
  return `import { ${garphImportVariableName} } from "./${dateVariableName}"\n`;
}

export const anyVariableName = "_Any";

export function AnyType() {
  return `${GarphImportStatement()}
  
  export const ${anyVariableName} = ${garphImportVariableName}.scalarType<any, any>('Any', {
    serialize: (value) => JSON.stringify(value),
    parseValue: (value) => JSON.parse(value)
  })\n`;
}

export function AnyImport() {
  return `import { ${garphImportVariableName} } from "./${anyVariableName}"\n`;
}
