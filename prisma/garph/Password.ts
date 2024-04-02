import { g } from "garph";
import { User } from "./User";
export const Password = g.type("Password", {
  id: g.id().required(),
  user: g.ref(() => User).required(),
  userId: g.string().required(),
});
