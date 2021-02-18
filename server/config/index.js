const Cloud = require('@google-cloud/storage')
const serviceKey = path.join(__dirname, '../auth/face-imgs-auth.json');

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'agile-timing-301906',
})

module.exports = storage