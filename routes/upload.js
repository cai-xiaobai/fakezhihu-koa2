const UploadController = require('../controllers/upload');


module.exports = {
  'POST /imgs/upload': UploadController.upload
}