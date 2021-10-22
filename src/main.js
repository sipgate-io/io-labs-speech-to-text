import { createHistoryModule, sipgateIO } from 'sipgateio';
import * as dot from 'dotenv';

dot.config();

const tokenId = process.env.SIPGATE_TOKEN_ID;
const token = process.env.SIPGATE_TOKEN;

const client = sipgateIO({
    tokenId: tokenId,
    token: token,
});

const historyClient = createHistoryModule(client);

historyClient.fetchAll({types: ['VOICEMAIL']})
    .then(allVoicemails => {
        allVoicemails.forEach(voicemail => {
            console.log(voicemail.recordingUrl);

        })
    }
)
