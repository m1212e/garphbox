import { g } from "garph";

export const SpeakersListCategory = g
  .enumType("SpeakersListCategory", [
    "SPEAKERS_LIST",
    "COMMENT_LIST",
    "MODERATED_CAUCUS",
  ] as const)
  .description(`The type of a speakers list`);
