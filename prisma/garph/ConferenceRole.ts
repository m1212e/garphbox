import { g } from "garph";

export const ConferenceRole = g
  .enumType("ConferenceRole", [
    "ADMIN",
    "SECRETARIAT",
    "CHAIR",
    "COMMITTEE_ADVISOR",
    "NON_STATE_ACTOR",
    "PRESS_CORPS",
    "GUEST",
    "PARTICIPANT_CARE",
    "MISCELLANEOUS_TEAM",
  ] as const)
  .description(`The role of a user in a conference`);
