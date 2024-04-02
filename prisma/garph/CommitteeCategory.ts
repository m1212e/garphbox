import { g } from "garph";

export const CommitteeCategory = g
  .enumType("CommitteeCategory", ["COMMITTEE", "CRISIS", "ICJ"] as const)
  .description(`The type of a committee in a conference`);
