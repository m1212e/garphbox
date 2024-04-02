import { g } from "garph";

export const NationVariant = g.enumType("NationVariant", [
  "NATION",
  "NON_STATE_ACTOR",
  "SPECIAL_PERSON",
] as const);
