// import type { DMMF } from "@prisma/generator-helper";
// import { garphImportVariableName } from "./garphInstance";
// import { Annotation, parseDocumentation } from "./documentation";
// import { Model } from "./model";

// export function WhereModel(
//   data: Pick<DMMF.Model, "fields" | "documentation" | "name" | "uniqueFields">
// ) {
//   const modelDoc = parseDocumentation(data.documentation);
//   if (modelDoc.annotations.includes(Annotation.HIDDEN)) return undefined;

//   const plainUniqueFieldNames = data.fields
//     .map((field) => {
//       const doc = parseDocumentation(field.documentation);
//       if (doc.annotations.includes(Annotation.HIDDEN)) return undefined;
//       if (!field.isId && !field.isUnique) return undefined;

//       return field.name;
//     })
//     .filter((x) => x) as string[];

//   const uniqueIndexFieldNames = data.uniqueFields
//     .map((uniqueFieldFields) => {
//       return `${uniqueFieldFields.join("_")}`;
//     })
//     .filter((x) => x) as string[];

//   const uniqueIndexFields = data.uniqueFields
//     .map((uniqueFieldFields) => {
//       const fields = data.fields.filter((field) =>
//         uniqueFieldFields.includes(field.name)
//       );
//       return `${uniqueFieldFields.join("_")}: ${Model({ fields }, true)}`;
//     })
//     .filter((x) => x) as string[];

//   const baseType = `${garphImportVariableName}.Composite([${garphImportVariableName}.Object({${uniqueIndexFields.join(",")}}),${garphImportVariableName}.Pick(${data.name}Plain, [${plainUniqueFieldNames.map((f) => `"${f}"`).join(",")}])])`;

//   return `${garphImportVariableName}.Union([${[...plainUniqueFieldNames, ...uniqueIndexFieldNames].map((fieldname) => `${garphImportVariableName}.Composite([${garphImportVariableName}.Pick(${garphImportVariableName}.Required(${baseType}), ["${fieldname}"]),${garphImportVariableName}.Omit(${garphImportVariableName}.Partial(${baseType}), ["${fieldname}"])])`).join(",")}])\n`;
// }

// import type { DMMF } from "@prisma/generator-helper";
// import { garphImportVariableName } from "./garphInstance";
// import { Annotation, parseDocumentation } from "./documentation";
// import type { Model as ModelType } from "../util/modelMap";

// export function Model(
//   data: Pick<DMMF.Model, "fields" | "documentation" | "name">
// ): ModelType | undefined {
//   const modelDoc = parseDocumentation(data.documentation);
//   if (modelDoc.annotations.includes(Annotation.HIDDEN)) return undefined;

//   const referencedTypes: string[] = [];

//   const fields = data.fields
//     .map((field) => {
//       const doc = parseDocumentation(field.documentation);
//       if (doc.annotations.includes(Annotation.HIDDEN)) return undefined;

//       if (isPrimitivePrismaFieldType(field.type)) {
//         return PrimitiveField({
//           name: field.name,
//           fieldType: field.type,
//           isList: field.isList,
//           isOptional: !field.isRequired,
//           description: doc.description,
//           isId: field.isId,
//         });
//       }
//       referencedTypes.push(field.type);
      
//       return RelationField({
//         name: field.name,
//         fieldType: field.type,
//         isList: field.isList,
//         isOptional: !field.isRequired,
//         description: doc.description,
//       });
//     })
//     .filter((x) => x) as string[];

//   return {
//     garphString: `${garphImportVariableName}.type('${data.name}',{${fields.join(",")}})\n`,
//     referencedTypes,
//   };
// }