import { g } from "garph";
import { Committee } from "./Committee";
import { User } from "./User";
import { SpeakerOnList } from "./SpeakerOnList";
import { Delegation } from "./Delegation";
import { Presence } from "./Presence";
export const CommitteeMember = g.type("CommitteeMember", {
  id: g.id().required(),
  committee: g.ref(() => Committee).required(),
  committeeId: g.string().required(),
  user: g.ref(() => User).optional(),
  userId: g.string().optional(),
  speakerLists: g
    .ref(() => SpeakerOnList)
    .list()
    .required(),
  delegation: g.ref(() => Delegation).optional(),
  delegationId: g.string().optional(),
  presence: g.ref(() => Presence).required(),
});
