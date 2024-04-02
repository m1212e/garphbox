import type { DMMF } from "@prisma/generator-helper";
import { garphImportVariableName } from "./garphInstance";
import { Annotation, parseDocumentation } from "./documentation";
import type { Model as ModelType } from "../util/modelMap";

export function Model(
  data: Pick<DMMF.Model, "fields" | "documentation" | "name">
): ModelType | undefined {
  const modelDoc = parseDocumentation(data.documentation);
  if (modelDoc.annotations.includes(Annotation.HIDDEN)) return undefined;

  const referencedTypes: string[] = [];

  const fields = data.fields
    .map((field) => {
      const doc = parseDocumentation(field.documentation);
      if (doc.annotations.includes(Annotation.HIDDEN)) return undefined;

      if (isPrimitivePrismaFieldType(field.type)) {
        return PrimitiveField({
          name: field.name,
          fieldType: field.type,
          isList: field.isList,
          isOptional: !field.isRequired,
          description: doc.description,
          isId: field.isId,
        });
      }
      referencedTypes.push(field.type);
      
      return RelationField({
        name: field.name,
        fieldType: field.type,
        isList: field.isList,
        isOptional: !field.isRequired,
        description: doc.description,
      });
    })
    .filter((x) => x) as string[];

  return {
    garphString: `${garphImportVariableName}.type('${data.name}',{${fields.join(",")}})\n`,
    referencedTypes,
  };
}

type PrimitivePrismaFieldType =
  | "Int"
  | "Float"
  | "Decimal"
  | "BigInt"
  | "String"
  | "DateTime"
  | "Json"
  | "Date"
  | "Boolean";

export function isPrimitivePrismaFieldType(
  str: string
): str is PrimitivePrismaFieldType {
  return [
    "Int",
    "BigInt",
    "Float",
    "Decimal",
    "String",
    "DateTime",
    "Date",
    "Json",
    "Boolean",
  ].includes(str);
}

export function PrimitiveField({
  name,
  fieldType,
  description,
  isOptional,
  isList,
  isId,
}: {
  fieldType: PrimitivePrismaFieldType;
  description: string | undefined;
  name: string;
  isOptional: boolean;
  isList: boolean;
  isId: boolean;
}) {
  let ret = `${name}: ${garphImportVariableName}`;

  if (isId) {
    ret += ".id()";
  } else if (["Int", "BigInt"].includes(fieldType)) {
    ret += ".int()";
  } else if (["Float", "Decimal"].includes(fieldType)) {
    ret += ".float()";
  } else if (fieldType === "String") {
    ret += ".string()";
  } else if (["DateTime", "Date"].includes(fieldType)) {
    ret += `.ref(${garphImportVariableName}.scalarType<Date, number>('Date', {
      serialize: (value) => value.getTime(),
      parseValue: (value) => new Date(value)
    }))`;
  } else if (fieldType === "Json") {
    ret += `.ref(${garphImportVariableName}.scalarType<any, any>('Any', {
      serialize: (value) => JSON.stringify(value),
      parseValue: (value) => JSON.parse(value)
    }))`;
  } else if (fieldType === "Boolean") {
    ret += ".boolean()";
  } else throw new Error("Invalid type for primitive generation");

  if (isList) {
    ret += ".list()";
  }

  if (isOptional) {
    ret += ".optional()";
  } else {
    ret += ".required()";
  }

  if (description) {
    ret += `.description(\`${description}\`)`;
  }

  return ret;
}

export function RelationField({
  name,
  fieldType,
  description,
  isOptional,
  isList,
}: {
  fieldType: string;
  description: string | undefined;
  name: string;
  isOptional: boolean;
  isList: boolean;
}) {
  let ret = `${name}: ${garphImportVariableName}.ref(() => ${fieldType})`;

  if (isList) {
    ret += ".list()";
  }

  if (isOptional) {
    ret += ".optional()";
  } else {
    ret += ".required()";
  }

  if (description) {
    ret += `.description(\`${description}\`)`;
  }

  return ret;
}
