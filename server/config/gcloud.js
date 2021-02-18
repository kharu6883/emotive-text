class cloudSvc {
    constructor(credentials) {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = credentials;
        
        const vision = require('@google-cloud/vision');
        const cloud = require('@google-cloud/storage');

        const serviceKey = path.join(__dirname, '../auth/face-imgs-auth.json');
    }

    async getEmotion(fileName) {
        
    }

    async getSpeechText(fileName) {

    }
}