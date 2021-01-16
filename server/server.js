const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

const PORT = 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});

async function getEmotion(fileName) {
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

async function getSpeechText(fileName) {
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

    return transcription;

}


app.get('/get-emotion', (req, res, err)=> {
    try {
        return res.send(getEmotion(res.locals.picture));
    } catch {console.log(err)};
});

app.get('/get-text', (req, res, err) => {
    try {
        return res.send(getSpeechText(res.locals.recording))
    } catch {console.log(err)};
});


app.get('/', (req, res) => {
    res.send(textToSpeech('Welcome.wav'));
});