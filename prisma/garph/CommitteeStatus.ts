import { g } from "garph";

export const CommitteeStatus = g.enumType("CommitteeStatus", [
  "FORMAL",
  "INFORMAL",
  "PAUSE",
  "SUSPENSION",
  "CLOSED",
] as const);
