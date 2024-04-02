import { g } from "garph";
import { ConferenceMember } from "./ConferenceMember";
import { CommitteeMember } from "./CommitteeMember";
import { Message } from "./Message";
import { Email } from "./Email";
import { Password } from "./Password";
import { PendingCredentialCreateTask } from "./PendingCredentialCreateTask";
export const User = g.type("User", {
  id: g.id().required(),
  name: g.string().required(),
  conferenceMemberships: g
    .ref(() => ConferenceMember)
    .list()
    .required(),
  committeeMemberships: g
    .ref(() => CommitteeMember)
    .list()
    .required(),
  messages: g
    .ref(() => Message)
    .list()
    .required(),
  emails: g
    .ref(() => Email)
    .list()
    .required(),
  passwords: g
    .ref(() => Password)
    .list()
    .required(),
  pendingCredentialCreationTasks: g
    .ref(() => PendingCredentialCreateTask)
    .list()
    .required(),
});
