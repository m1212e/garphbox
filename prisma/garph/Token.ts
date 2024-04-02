import { g } from "garph";
import { Email } from "./Email";
import { PendingCredentialCreateTask } from "./PendingCredentialCreateTask";
export const Token = g.type("Token", {
  id: g.id().required(),
  expiresAt: g
    .ref(
      g.scalarType<Date, number>("Date", {
        serialize: (value) => value.getTime(),
        parseValue: (value) => new Date(value),
      }),
    )
    .required(),
  pendingEmailConfirmations: g
    .ref(() => Email)
    .list()
    .required(),
  pendingCredentialCreations: g
    .ref(() => PendingCredentialCreateTask)
    .list()
    .required(),
});
