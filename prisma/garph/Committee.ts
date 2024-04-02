import { g } from "garph";
import { CommitteeCategory } from "./CommitteeCategory";
import { Conference } from "./Conference";
import { CommitteeMember } from "./CommitteeMember";
import { Message } from "./Message";
import { AgendaItem } from "./AgendaItem";
import { CommitteeStatus } from "./CommitteeStatus";
export const Committee = g.type("Committee", {
  id: g.id().required(),
  name: g.string().required(),
  abbreviation: g.string().required(),
  category: g.ref(() => CommitteeCategory).required(),
  conference: g.ref(() => Conference).required(),
  conferenceId: g.string().required(),
  members: g
    .ref(() => CommitteeMember)
    .list()
    .required(),
  parent: g.ref(() => Committee).optional(),
  parentId: g.string().optional(),
  subCommittees: g
    .ref(() => Committee)
    .list()
    .required(),
  messages: g
    .ref(() => Message)
    .list()
    .required(),
  agendaItems: g
    .ref(() => AgendaItem)
    .list()
    .required(),
  whiteboardContent: g.string().required(),
  status: g.ref(() => CommitteeStatus).required(),
  stateOfDebate: g.string().optional(),
  statusHeadline: g.string().optional(),
  statusUntil: g
    .ref(
      g.scalarType<Date, number>("Date", {
        serialize: (value) => value.getTime(),
        parseValue: (value) => new Date(value),
      }),
    )
    .optional(),
  allowDelegationsToAddThemselvesToSpeakersList: g.boolean().required(),
});
