const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { features } = require('process');
const { maxHeaderSize } = require('http');
const router = express.Router();

const PORT = 5000;

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});

async function getEmotion(fileName) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "./auth/creds.json";

    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.faceDetection(fileName);
    const faces = result.faceAnnotations;
    
    return returnLikely(faces[0]);
}

returnLikely = (face) => {

    // translate Likelyhood to number
    likelyNum = (str) => {
        if (str == 'UNKNOWN') {
            return 0;
        } else if (str == 'VERY_UNLIKELY') {
            return 1;
        } else if (str == 'UNLIKELY') {
            return 2;
        } else if (str == 'POSSIBLE') {
            return 3;
        } else if (str == 'LIKELY') {
            return 4;
        } else if (str == 'VERY_LIKELY') {
            return 5;
        }
    }

    console.log(likelyNum(face.joyLikelihood));

    let emotions = [
        ["JOY", likelyNum(face.joyLikelihood)],
        ["ANGER", likelyNum(face.angerLikelihood)],
        ["SORROW", likelyNum(face.sorrowLikelihood)],
        ["SURPRISE", likelyNum(face.surpriseLikelihood)]
    ];  

    if (emotions[0][1] == emotions[1][1] == emotions[2][1] == emotions[3][1]) {
        return "NEUTRAL";
    } else {
        let emotionMax = Math.max(likelyNum(face.joyLikelihood), likelyNum(face.angerLikelihood), likelyNum(face.sorrowLikelihood), likelyNum(face.surpriseLikelihood));
        let emotion = "NEUTRAL";
    
        emotions.forEach((emotion) => {
            if (emotion[1] == emotionMax) {
                //console.log(emotion[0]);
                emotion = emotion[0];
            }
        });

        return emotion;
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




app.get('/get-emotion', async (req, res, err) => {
    let emotion = await getEmotion('./test.jpg');
    res.send({ emotion: emotion });
});

app.get('/get-text', (req, res, err) => {
    try {
        return res.send(getSpeechText('test.jpg'))
    } catch {
        console.log(err)
    };
});

app.get('/', (req, res) => {
    
    res.send(getEmotion('test.jpg').then(emotion => {return (emotion)}));
});