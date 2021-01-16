const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

// GOOGLE_APPLICATION_CREDENTIALS=E:\repos\emotive-text\server\credentials-69a069f361eb.json

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});

async function quickStart() {
    const vision = require('@google-cloud/vision');

    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.labelDetection('./test.jpg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
}

quickStart();