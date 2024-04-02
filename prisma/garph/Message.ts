import { g } from "garph";
import { MessageCategory } from "./MessageCategory";
import { Committee } from "./Committee";
import { User } from "./User";
import { MessageStatus } from "./MessageStatus";
export const Message = g.type("Message", {
  id: g.id().required(),
  subject: g.string().required(),
  category: g.ref(() => MessageCategory).required(),
  message: g.string().required(),
  committee: g.ref(() => Committee).required(),
  committeeId: g.string().required(),
  author: g.ref(() => User).required(),
  authorId: g.string().required(),
  timestamp: g
    .ref(
      g.scalarType<Date, number>("Date", {
        serialize: (value) => value.getTime(),
        parseValue: (value) => new Date(value),
      }),
    )
    .required(),
  status: g
    .ref(() => MessageStatus)
    .list()
    .required(),
  forwarded: g
    .boolean()
    .required()
    .description(`If the message was forwarded to the Research Service`),
  metaEmail: g
    .string()
    .optional()
    .description(`Saved Metadata without relation`),
  metaDelegation: g.string().optional(),
  metaCommittee: g.string().optional(),
  metaAgendaItem: g.string().optional(),
});
