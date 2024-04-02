export type ModelName = string;
export type Model = { garphString: string; referencedTypes: string[] };
export type Models = Map<ModelName, Model>;

export function emptyModels(): Models {
  return new Map();
}

export function mergeModels(...models: Models[]) {
  const ret: Models = new Map();

  for (const model of models) {
    for (const [modelName, modelString] of model) {
      ret.set(modelName, modelString);
    }
  }

  return ret;
}
