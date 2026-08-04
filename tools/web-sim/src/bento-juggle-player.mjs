import { createCreatorClubPreview } from "./creator-club-preview.mjs";
import {
  createBentoTimeline,
  inspectBentoProject,
  parametersToObject,
  resolveAudioFile,
} from "./bento-timeline.mjs";

const api = Object.freeze({
  createBentoTimeline,
  createCreatorClubPreview,
  inspectBentoProject,
  parametersToObject,
  resolveAudioFile,
});

globalThis.CreatorClubBentoPlayer = api;

export default api;
