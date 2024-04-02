import { g } from "garph";
import { User } from "./User";
import { Token } from "./Token";
export const PendingCredentialCreateTask = g.type(
  "PendingCredentialCreateTask",
  {
    id: g.id().required(),
    user: g.ref(() => User).required(),
    userId: g.string().required(),
    token: g.ref(() => Token).required(),
    tokenId: g.string().required(),
  },
);
