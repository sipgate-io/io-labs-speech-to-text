import { existsSync } from "fs";
import { Readable } from "stream";

import ffmpeg from "fluent-ffmpeg";
import * as vosk from "vosk";
import { Reader } from "wav";

// Check if the VOSK model is downloaded
const MODEL_PATH = "model";
if (!existsSync(MODEL_PATH)) {
  console.log(
    `Please download the model from https://alphacephei.com/vosk/models and unpack as ${MODEL_PATH} in the root folder.`,
  );
  process.exit();
}

vosk.setLogLevel(-1);
const model = new vosk.Model(MODEL_PATH);

// Configure a vosk waveform reader
const getWaveformReader = () => {
  const waveformReader = new Reader();
  const waveformReadable = new Readable().wrap(waveformReader);

  waveformReader.on("format", async ({ sampleRate }) => {
    // Create a new Recognizer
    const recognizer = new vosk.Recognizer({
      model,
      sampleRate,
    });

    // read the audio chunks
    for await (const data of waveformReadable) {
      recognizer.acceptWaveform(data);
    }

    // print the final result
    console.log(`Voicemail content: "${recognizer.finalResult().text}"`);
    recognizer.free();
  });
  return waveformReader;
};

// The model only accepts WAV files, so we need to convert the mp3 recording
// to a WAV audio stream beforehand.
const convertMp3ToText = (mp3Url) =>
  ffmpeg(mp3Url)
    .audioFrequency(16000)
    .toFormat("wav")
    .on("error", (err) => {
      console.log(
        `An error occurred while converting the stream: ${err.message}`,
      );
    })
    .pipe(getWaveformReader());

export default convertMp3ToText;
