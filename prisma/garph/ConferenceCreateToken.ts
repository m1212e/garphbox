import { g } from "garph";

export const ConferenceCreateToken = g.type("ConferenceCreateToken", {
  token: g.id().required(),
});
