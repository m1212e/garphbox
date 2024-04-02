import { g } from "garph";
import { SpeakersList } from "./SpeakersList";
import { CommitteeMember } from "./CommitteeMember";
export const SpeakerOnList = g.type("SpeakerOnList", {
  id: g.id().required(),
  speakersList: g.ref(() => SpeakersList).required(),
  speakersListId: g.string().required(),
  committeeMember: g.ref(() => CommitteeMember).required(),
  committeeMemberId: g.string().required(),
  position: g.int().required(),
});
