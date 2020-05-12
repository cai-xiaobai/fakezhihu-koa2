const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');
const moment = require('moment');

class uploadController {
  /**
   * 上传图片
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async upload(ctx, next) {
    const file = ctx.request.files.file;
    //利用时间和文件获取唯一的hash值
    const hash = hash = CryptoJS.MD5('${file.path}_${moment()}');
    const reader = fs.createReadStream(file.path); //创建可读流
    //创建文件路径
    let filePath = path.join(__dirname, '../../public/imgs') + '/${hash}.${file.name.split(".").pop()}';
    const upStream = fs.createWriteStream(filePath); //创建可写流
    reader.pipe(upStream); //可读流通过管道写入可写流
    ctx.body = {
      status: 201, //返回状态
      fileName: '${hash}.${file.name.split(".").pop()}', //返回图片名
    };
  };

}

module.exports = uploadController;