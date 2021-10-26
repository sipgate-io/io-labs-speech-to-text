import * as dot from "dotenv";
import { createHistoryModule, sipgateIO } from "sipgateio";

import convertMp3ToText from "./speechToTextEngine.js";

dot.config();

const tokenId = process.env.SIPGATE_TOKEN_ID;
const token = process.env.SIPGATE_TOKEN;

const client = sipgateIO({
  tokenId,
  token,
});

const historyClient = createHistoryModule(client);

historyClient.fetchAll({ types: ["VOICEMAIL"] }, { limit: 1 })
  .then((allVoicemails) => {
    allVoicemails.forEach((voicemail) => {
      convertMp3ToText(voicemail.recordingUrl);
    });
  });
