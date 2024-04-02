import { g } from "garph";
import { Committee } from "./Committee";
import { SpeakersList } from "./SpeakersList";
export const AgendaItem = g.type("AgendaItem", {
  id: g.id().required(),
  committee: g.ref(() => Committee).required(),
  committeeId: g.string().required(),
  title: g.string().required(),
  description: g.string().optional(),
  speakerLists: g
    .ref(() => SpeakersList)
    .list()
    .required(),
  isActive: g.boolean().required(),
});
