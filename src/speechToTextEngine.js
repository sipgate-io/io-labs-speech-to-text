import { existsSync } from "fs";
import { Readable } from "stream";

import ffmpeg from "fluent-ffmpeg";
import * as vosk from "vosk";
import { Reader } from "wav";

const MODEL_PATH = "model";
if (!existsSync(MODEL_PATH)) {
  console.log(`Please download the model from https://alphacephei.com/vosk/models and unpack as ${MODEL_PATH} in the root folder.`);
  process.exit();
}

vosk.setLogLevel(-1);
const model = new vosk.Model(MODEL_PATH);

const getWfReader = () => {
  const wfReader = new Reader();
  const wfReadable = new Readable().wrap(wfReader);

  wfReader.on("format", async ({ sampleRate }) => {
    const rec = new vosk.Recognizer({
      model,
      sampleRate,
    });
    for await (const data of wfReadable) {
      rec.acceptWaveform(data);
    }
    console.log(`Voicemail content: "${rec.finalResult().text}"`);
    rec.free();
  });
  return wfReader;
};

const convertMp3ToText = (path) => ffmpeg(path)
  .audioFrequency(16000)
  .toFormat("wav")
  .on("error", (err) => {
    console.log(
      `An error occurred while converting the stream: ${err.message}`,
    );
  })
  .on("progress", (progress) => {
    console.log(`Processing: ${progress.targetSize} KB converted`);
  })
  .on("end", () => {
    console.log("Processing finished!");
  })
  .pipe(getWfReader());

export default convertMp3ToText;
