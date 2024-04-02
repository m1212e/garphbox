import { g } from "garph";

export const MessageStatus = g.enumType("MessageStatus", [
  "UNREAD",
  "PRIORITY",
  "ASSIGNED",
  "ARCHIVED",
] as const);
