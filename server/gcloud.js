class cloudSvc {
    constructor(credentials) {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = credentials;
        
        const vision = require('@google-cloud/vision');
        const speech = require('@google-cloud/speech');
    }

    async getEmotion(fileName) {
        
    }

    async getSpeechText(fileName) {

    }
}