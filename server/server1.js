const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { features } = require('process');
const { maxHeaderSize } = require('http');
const multer = require('multer');
const router = express.Router();

const PORT = 5000;


let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', '*');
    next();
}

app.use(bodyParser.json());
app.use(allowCrossDomain);

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});
/*
async function callAnnotateImage(file) {
    var imageFile = fs.readFileSync(file);
    var encoded = Buffer.from(imageFile).toString('base64');

    const request = {
        "image": {
            "content": encoded
        },
        "features": [
            {
                "type": "FACE_DETECTION"
            }
        ]
    };

    try {
        const call = await client.annotateImage(request);
        return call;
    } catch(error) {
        return console.error(error);
    }
}

async function getEmotion(fileName) {
    const vision = require('@google-cloud/vision');
    const credentials = require('./auth/creds.json');
    const client = new vision.ImageAnnotatorClient({credentials});

    const fs = require('fs');

    var imageFile = fs.readFileSync(fileName);
    var encoded = Buffer.from(imageFile).toString('base64');

    const request = {
        "image": {
            "content": encoded
        },
        "features": [
            {
                "type": "FACE_DETECTION"
            }
        ]
    };

    try {
        let response = await client.annotateImage(request);
        console.log(response);
    } catch(error) {
        return console.error(error);
    }
}
*/

async function getEmotion(fileName) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "./auth/creds.json";

    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.faceDetection(fileName);
    const faces = result.faceAnnotations;

    return client.faceDetection(fileName).then((res) => {
        return res[0].joyLikelihood;
    });
}



function returnLikely(face) {

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

    let emotions = [
        ["JOY", likelyNum(face.joyLikelihood)],
        ["ANGER", likelyNum(face.angerLikelihood)],
        ["SORROW", likelyNum(face.sorrowLikelihood)],
        ["SURPRISE", likelyNum(face.surpriseLikelihood)]
    ];  

    if (emotions[0][1] == emotions[1][1] == emotions[2][1] == emotions[3][1]) {
        return console.log("NEUTRAL");
    } else {
        let emotionMax = Math.max(likelyNum(face.joyLikelihood), likelyNum(face.angerLikelihood), likelyNum(face.sorrowLikelihood), likelyNum(face.surpriseLikelihood));
    
        emotions.forEach((emotion) => {
            if (emotion[1] == emotionMax) {
                return emotion[0];
            }
        });
    }
}

// not needed
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

// posts

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 1048576,
    },
});
  
app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const Cloud = require('@google-cloud/storage')
const path = require('path');
process.env.GOOGLE_APPLICATION_CREDENTIALS = "./auth/creds.json";
const serviceKey = path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS);

const { Storage } = Cloud;
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 
})

app.post('/uploads', async (req, res, next) => {
    try {
      const myFile = req.file
      const imageUrl = await uploadImage(myFile)
      res
        .status(200)
        .json({
          message: "Upload was successful",
          data: imageUrl
        })
    } catch (error) {
      next(error);
    }
});


// HTTP Requests

app.get('/get-emotion', (req, res, err)=> {
    console.log(getEmotion('test.jpg'));
    res.send({ emotion: JSON.stringify(getEmotion('test.jpg')) });
});

app.get('/get-text', (req, res, err) => {
    try {
        return res.send(getSpeechText('Welcome.wav'))
    } catch {console.log(err)};
});

app.get('/', (req, res) => {
    res.send(getEmotion('test.jpg').then(emotion => {return (emotion)}));
});