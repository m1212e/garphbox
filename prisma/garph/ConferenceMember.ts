import { g } from "garph";
import { Conference } from "./Conference";
import { User } from "./User";
import { ConferenceRole } from "./ConferenceRole";
export const ConferenceMember = g.type("ConferenceMember", {
  id: g.id().required(),
  conference: g.ref(() => Conference).required(),
  conferenceId: g.string().required(),
  user: g.ref(() => User).optional(),
  userId: g.string().optional(),
  role: g.ref(() => ConferenceRole).required(),
});
