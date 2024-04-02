import { g } from "garph";
import { Committee } from "./Committee";
import { Delegation } from "./Delegation";
import { ConferenceMember } from "./ConferenceMember";
export const Conference = g.type("Conference", {
  id: g.id().required(),
  name: g.string().required(),
  committees: g
    .ref(() => Committee)
    .list()
    .required(),
  start: g
    .ref(
      g.scalarType<Date, number>("Date", {
        serialize: (value) => value.getTime(),
        parseValue: (value) => new Date(value),
      }),
    )
    .optional(),
  end: g
    .ref(
      g.scalarType<Date, number>("Date", {
        serialize: (value) => value.getTime(),
        parseValue: (value) => new Date(value),
      }),
    )
    .optional(),
  delegations: g
    .ref(() => Delegation)
    .list()
    .required(),
  members: g
    .ref(() => ConferenceMember)
    .list()
    .required(),
});
