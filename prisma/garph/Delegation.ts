import { g } from "garph";
import { Conference } from "./Conference";
import { Nation } from "./Nation";
import { CommitteeMember } from "./CommitteeMember";
export const Delegation = g.type("Delegation", {
  id: g.id().required(),
  conference: g.ref(() => Conference).required(),
  conferenceId: g.string().required(),
  nation: g.ref(() => Nation).required(),
  nationId: g.string().required(),
  members: g
    .ref(() => CommitteeMember)
    .list()
    .required(),
});
