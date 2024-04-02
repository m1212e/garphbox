import { g } from "garph";
import { NationVariant } from "./NationVariant";
import { Delegation } from "./Delegation";
export const Nation = g.type("Nation", {
  id: g.id().required(),
  alpha3Code: g.string().required(),
  variant: g.ref(() => NationVariant).required(),
  delegations: g
    .ref(() => Delegation)
    .list()
    .required(),
});
