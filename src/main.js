import * as dot from "dotenv";
import { createHistoryModule, sipgateIO } from "sipgateio";

import convertMp3ToText from "./speechToTextEngine.js";

// Load configurations
dot.config();
const tokenId = process.env.SIPGATE_TOKEN_ID;
const token = process.env.SIPGATE_TOKEN;

// Create a connection with the sipgate API
const client = sipgateIO({
  tokenId,
  token,
});

const historyClient = createHistoryModule(client);

// Get the latest history item of type VOICEMAIL from the sipgate API and
// call the function `convertMp3ToText` with the URL of the mp3 recording
historyClient.fetchAll({ types: ["VOICEMAIL"] }, { limit: 1 })
  .then((allVoicemails) => {
    allVoicemails.forEach((voicemail) => {
      convertMp3ToText(voicemail.recordingUrl);
    });
  });
