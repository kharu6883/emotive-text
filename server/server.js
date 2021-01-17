const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { features } = require('process');
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
    
    return returnLikely(faces[1]);
}

returnLikely = (face) => {
    if (face.joyLikelihood >= 3) {
        return console.log("JOY");
    } else if (face.angerLikelihood >= 3) {
        return console.log("ANGER");
    } else if (face.sorrowLikelihood >= 3) {
        return console.log("SORROW");
    } else if (face.surpriseLikelihood >= 3) {
        return console.log("SURPRISE");
    } else {
        return console.log("NEUTRAL");
    }
};

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
    
    res.send(getEmotion('test.jpg').then(emotion => {return emotion}));
    
    //res.send(console.log(getEmotion('test.jpg')));
    
    //res.send(textToSpeech('Welcome.wav'));
});