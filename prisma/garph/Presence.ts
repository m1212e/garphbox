import { g } from "garph";

export const Presence = g
  .enumType("Presence", ["PRESENT", "EXCUSED", "ABSENT"] as const)
  .description(`The presence status of a CommitteeMember`);
