const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { features } = require("process");
const { maxHeaderSize } = require("http");
const router = express.Router();
const multer = require('multer')
const cors = require("cors");

const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.listen(PORT, () => {
	console.log("Server is running on port: " + PORT);
});

async function getEmotion(fileName) {
	process.env.GOOGLE_APPLICATION_CREDENTIALS = "./auth/vision-auth.json";

	const vision = require("@google-cloud/vision");
	const client = new vision.ImageAnnotatorClient();

	const [result] = await client.faceDetection(fileName);
	const faces = result.faceAnnotations;

	console.log(faces.length);

	console.log("Faces:");
	faces.forEach((face, i) => {
		console.log(`  Face #${i + 1}:`);
		console.log(`    Joy: ${face.joyLikelihood}`);
		console.log(`    Anger: ${face.angerLikelihood}`);
		console.log(`    Sorrow: ${face.sorrowLikelihood}`);
		console.log(`    Surprise: ${face.surpriseLikelihood}`);
	});

	if (faces.length == 0) {
		return "NEUTRAL";
	} else {
		return returnLikely(faces[0]);
	}
}

function returnLikely(face) {
	// Returns the level of likelihood of emotions
	likelyNum = (str) => {
		switch (str) {
			default:
				return 0;
				break;

			case "UNKNOWN":
				return 0;
				break;

			case "VERY_UNLIKELY":
				return 1;
				break;

			case "UNLIKELY":
				return 2;
				break;

			case "POSSIBLE":
				return 3;
				break;

			case "LIKELY":
				return 4;
				break;

			case "VERY_LIKELY":
				return 5;
				break;
		}
	};

	let emotions = [
		["JOY", likelyNum(face.joyLikelihood)],
		["ANGER", likelyNum(face.angerLikelihood)],
		["SORROW", likelyNum(face.sorrowLikelihood)],
		["SURPRISE", likelyNum(face.surpriseLikelihood)],
	];

	if (
		((emotions[0][1] == emotions[1][1]) == emotions[2][1]) ==
		emotions[3][1]
	) {
		return "NEUTRAL";
	} else {
		let emotionMax = Math.max(
			likelyNum(face.joyLikelihood),
			likelyNum(face.angerLikelihood),
			likelyNum(face.sorrowLikelihood),
			likelyNum(face.surpriseLikelihood)
		);
		let likelyEmotion = "NEUTRAL";

		emotions.forEach((emotion) => {
			if (emotion[1] == emotionMax) {
				//console.log(emotion[0]);
				likelyEmotion = emotion[0];
			}
		});

		return likelyEmotion;
	}
}

async function getSpeechText(fileName) {
	process.env.GOOGLE_APPLICATION_CREDENTIALS =
		"./credentials-69a069f361eb.json";

	const speech = require("@google-cloud/speech");
	const client = new speech.SpeechClient();

	const file = require("fs").readFileSync(fileName);
	const audioBytes = file.toString("base64");

	const audio = {
		content: audioBytes,
	};

	const config = {
		encoding: "LINEAR16",
		sampleRateHertz: 16000,
		languageCode: "en-US",
	};

	const request = {
		audio: audio,
		config: config,
	};

	const [response] = await client.recognize(request);

	const transcription = response.results
		.map((result) => result.alternatives[0].transcript)
		.join("\n");

	return transcription;
}
    
/*
const uploadImage = require('./helpers/helpers')

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
*/

// HTTP Requests

app.post('/uploads', async (req, res, next) => {
  
})



app.get("/get-emotion", async (req, res, err) => {
	let emotion = await getEmotion("./res/.jpg");
	res.send({ emotion: emotion });
});

app.get("/get-text", (req, res, err) => {
	try {
		return res.send(getSpeechText("./res/Welcome.wav"));
	} catch {
		console.log(err);
	}
});

app.get("/", (req, res) => {
	res.send(
		getEmotion("test.jpg").then((emotion) => {
			return emotion;
		})
	);
});

/*
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
    next(error)
  }
})

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  })
  next()
})
*/