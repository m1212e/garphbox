import { g } from "garph";

export const MessageCategory = g.enumType("MessageCategory", [
  "TO_CHAIR",
  "GUEST_SPEAKER",
  "FACT_CHECK",
  "INFORMATION",
  "GENERAL_SECRETARY",
  "OTHER",
] as const);
