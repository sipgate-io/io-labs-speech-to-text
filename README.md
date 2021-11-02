# Transcribe voicemails to text

In this example project, we will convert voicemails to text using the [sipgate.io node library](https://github.com/sipgate-io/sipgateio-node) and [&alpha;cephei Vosk](https://alphacephei.com/vosk/models).

## What is sipgate.io?

[sipgate.io](https://sipgate.io) is a collection of APIs, which enables sipgate's customers to build flexible integrations matching their individual needs.
Among other things, it provides interfaces for sending and receiving text messages or faxes, monitoring the call history, as well as initiating and manipulating calls. 
In this tutorial, we will use sipgate.io's history API to read incoming voicemails from your sipgate account.

## In this example

The script in this repository pulls the latest voicemail from your sipgate account history and converts it to text using the Vosk speech-to-text model.

**Prerequisite:** You need `npm` and Node.js installed on your machine. You also need `ffmpeg` installed from your package manager. 

## Getting started

To launch this example, navigate to a directory where you want the example service to be stored. In a terminal, you can clone this repository from GitHub and install the required dependencies using `npm install`.

```bash
git clone https://github.com/sipgate-io/io-labs-speech-to-text.git
cd io-labs-speech-to-text
npm install
```

To get access to the transcription model, visit the [&alpha;cephei Vosk website](https://alphacephei.com/vosk/models) and download a model for your desired language (e.g. `vosk-model-small-de-0.15`).
You can choose between different model sizes depending on your desired accuracy (large models are more accurate than smaller ones).

Extract the files in the `.zip` and move them to the model folder in the git repository.
Your directory structure should look something like this:

```
├── model
│   ├── am
│   │   └── final.mdl
│   ├── conf
│   │   ├── mfcc.conf
│   │   └── model.conf
│   ├── COPYING
│   ├── graph
│   │   ├── disambig_tid.int
│   │   ├── Gr.fst
│   │   ├── HCLr.fst
│   │   └── phones
│   │       └── word_boundary.int
│   ├── ivector
│   │   ├── final.dubm
│   │   ├── final.ie
│   │   ├── final.mat
│   │   ├── global_cmvn.stats
│   │   ├── online_cmvn.conf
│   │   └── splice.conf
│   └── README
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── main.js
    └── speechToTextEngine.js

7 directories, 20 files
```

## Execution

Make sure to set the credentials of your sipgate account (token and token ID with `scope: history`, see [Personal Access Token documentation](https://www.sipgate.io/rest-api/authentication#personalAccessToken) on sipgate.io) either in a `.env` file or by providing them as temporary environment variables at program execution:

```bash
SIPGATE_TOKEN=<token> \
SIPGATE_TOKEN_ID=<tokenId> \
npm start
```

You should now be able to convert your voicemails to text.