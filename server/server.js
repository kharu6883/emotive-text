const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

const PORT = 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});

async function quickStart(fileName) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "./credentials-69a069f361eb.json"

    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.faceDetection(fileName);
    const faces = result.faceAnnotations;

    faces.forEach((face, i) => {
        console.log(`  Face #${i + 1}:`);
        console.log(`    Joy: ${face.joyLikelihood}`);
        console.log(`    Anger: ${face.angerLikelihood}`);
        console.log(`    Sorrow: ${face.sorrowLikelihood}`);
        console.log(`    Surprise: ${face.surpriseLikelihood}`);
    });
}

async function textToSpeech(fileName) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "./credentials-69a069f361eb.json"

    const speech = require('@google-cloud/speech');
    const client = new speech.SpeechClient();

    const file = require('fs').readFileSync(fileName);
    const audioBytes = file.toString('base64');
	
	const audio = {
		content: audioBytes
	};
	
	const config = {
		encoding: 'LINEAR16',
		sampleRateHertz: 16000,
		languageCode: 'en-US'
	};
	
	const request = {
		audio: audio,
		config: config
    };
    
    const [response] = await client.recognize(request);
	
    const transcription = response.results.map(result => 
        result.alternatives[0].transcript).join('\n');

    console.log(transcription);

}


app.get('/', (req, res) => {
    res.send(textToSpeech('Welcome.wav'));
});