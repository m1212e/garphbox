import { generatorHandler } from "@prisma/generator-helper";
import { writeFile, mkdir, rm, access } from "fs/promises";
import { join } from "path";
import { Model } from "./generator/model";
import { format } from "./util/format";
import { Enum } from "./generator/enum";
import {
  setGarphImportDependencyName,
  setGarphImportVariableName,
} from "./generator/garphInstance";
import { emptyModels, mergeModels, type Models } from "./util/modelMap";
import { Compose } from "./generator/composer";
import {
  AnyType,
  DateType,
  anyVariableName,
  dateVariableName,
} from "./generator/staticTypes";

generatorHandler({
  onManifest() {
    return {
      defaultOutput: "./garph",
      prettyName: "prisma-generator-garph",
    };
  },
  async onGenerate(options) {
    if (!options.generator.output?.value) {
      throw new Error("Could not find output directory in generator settings");
    }

    const outputDirectory = options.generator.output.value;

    if (options.generator.config?.typeboxImportVariableName) {
      setGarphImportVariableName(
        options.generator.config.typeboxImportVariableName as string
      );
    }

    if (options.generator.config?.typeboxImportDependencyName) {
      setGarphImportDependencyName(
        options.generator.config.typeboxImportDependencyName as string
      );
    }

    try {
      await access(outputDirectory);
      await rm(outputDirectory, { recursive: true });
    } catch (error) {}

    await mkdir(outputDirectory, { recursive: true });

    const modelTasks: Promise<void>[] = [];
    const modelTypes: Models = emptyModels();

    modelTasks.push(
      ...options.dmmf.datamodel.models.map(async (e) => {
        const model = Model(e);
        if (model) {
          modelTypes.set(e.name, model);
        }
      })
    );

    const enumTasks: Promise<void>[] = [];
    const enumTypes: Models = emptyModels();

    enumTasks.push(
      ...options.dmmf.datamodel.enums.map(async (e) => {
        const en = Enum(e);
        if (en) {
          enumTypes.set(e.name, { garphString: en, referencedTypes: [] });
        }
      })
    );

    // const whereTasks: Promise<void>[] = [];
    // const whereTypes: Models = new Map<string, string>();

    // whereTasks.push(
    //   ...options.dmmf.datamodel.models.map(async (e) => {
    //     const model = WhereModel(e);
    //     if (model) {
    //       whereTypes.set(e.name, model);
    //     }
    //   })
    // );

    // const dataTasks: Promise<void>[] = [];
    // const dataTypes: Models = new Map<string, string>();

    // dataTasks.push(
    //   ...options.dmmf.datamodel.models.map(async (e) => {
    //     const model = DataModel(e, enumTypes);
    //     if (model) {
    //       dataTypes.set(e.name, model);
    //     }
    //   })
    // );

    // const optionalDataTasks: Promise<void>[] = [];
    // const optionalDataTypes: Models = new Map<string, string>();

    // optionalDataTasks.push(
    //   ...options.dmmf.datamodel.models.map(async (e) => {
    //     const model = DataModelOptional(e, enumTypes);
    //     if (model) {
    //       optionalDataTypes.set(e.name, model);
    //     }
    //   })
    // );

    await Promise.all([...modelTasks, ...enumTasks]);
    // await Promise.all([...whereTasks, ...dataTasks]);

    await Promise.all([
      ...Array.from(modelTypes).map(async ([name, content]) => {
        const models = emptyModels();
        models.set(`${name}`, content);

        // const whereTypeForThisName = whereTypes.get(name);
        // if (whereTypeForThisName) {
        //   models.set(`${name}Where`, whereTypeForThisName);
        // }

        // const dataTypeForThisName = dataTypes.get(name);
        // if (dataTypeForThisName) {
        //   models.set(`${name}Data`, dataTypeForThisName);
        // }

        // const optionalDataTypeForThisName = optionalDataTypes.get(name);
        // if (optionalDataTypeForThisName) {
        //   models.set(`${name}DataOptional`, optionalDataTypeForThisName);
        // }

        await writeFile(
          join(outputDirectory, `${name}.ts`),
          await format(Compose(models))
        );
      }),
      ...Array.from(enumTypes).map(async (p) => {
        await writeFile(
          join(outputDirectory, `${p[0]}.ts`),
          await format(Compose(new Map([p])))
        );
      }),
      writeFile(
        join(outputDirectory, `${dateVariableName}.ts`),
        await format(DateType())
      ),
      writeFile(
        join(outputDirectory, `${anyVariableName}.ts`),
        await format(AnyType())
      ),
    ]);
  },
});
