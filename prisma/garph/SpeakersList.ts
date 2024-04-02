import { g } from "garph";
import { AgendaItem } from "./AgendaItem";
import { SpeakersListCategory } from "./SpeakersListCategory";
import { SpeakerOnList } from "./SpeakerOnList";
export const SpeakersList = g.type("SpeakersList", {
  id: g.id().required(),
  agendaItem: g.ref(() => AgendaItem).required(),
  agendaItemId: g.string().required(),
  type: g.ref(() => SpeakersListCategory).required(),
  speakers: g
    .ref(() => SpeakerOnList)
    .list()
    .required(),
  speakingTime: g
    .int()
    .required()
    .description(`The time in seconds that a speaker has to speak`),
  timeLeft: g.int().optional(),
  startTimestamp: g
    .ref(
      g.scalarType<Date, number>("Date", {
        serialize: (value) => value.getTime(),
        parseValue: (value) => new Date(value),
      }),
    )
    .optional(),
  isClosed: g.boolean().required(),
});
