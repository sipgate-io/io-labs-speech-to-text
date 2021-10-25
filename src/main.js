import { createHistoryModule, sipgateIO } from 'sipgateio';
import * as dot from 'dotenv';
import {convertMp3ToText} from "./speechToTextEngine.js";

dot.config();

const tokenId = process.env.SIPGATE_TOKEN_ID;
const token = process.env.SIPGATE_TOKEN;

const client = sipgateIO({
    tokenId: tokenId,
    token: token,
});

const historyClient = createHistoryModule(client);

historyClient.fetchAll({types: ['VOICEMAIL']},{limit: 1})
    .then(allVoicemails => {
        allVoicemails.forEach(voicemail => {
            console.log(voicemail.recordingUrl);
            convertMp3ToText(voicemail.recordingUrl)

        })
    }
)
