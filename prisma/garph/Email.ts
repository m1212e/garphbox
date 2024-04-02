import { g } from "garph";
import { User } from "./User";
import { Token } from "./Token";
export const Email = g.type("Email", {
  email: g.id().required(),
  user: g.ref(() => User).required(),
  userId: g.string().required(),
  validated: g.boolean().required(),
  validationToken: g.ref(() => Token).optional(),
  validationTokenId: g.string().optional(),
});
