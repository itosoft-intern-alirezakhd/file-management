const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Minio = require("minio");
const minioEndPoint = process.env.MINIO_ENDPOINT;
const minioPort = process.env.MINIO_PORT;
const minioAccessKey = process.env.MINIO_ACCESSKEY;
const minioSecretKey = process.env.MINIO_SECRETKEY;
const bucketname = process.env.MINIO_BUCKETNAME;
const minioClient = new Minio.Client({
  endPoint: minioEndPoint,
  port: Number(minioPort),
  useSSL: false,
  accessKey: minioAccessKey,
  secretKey: minioSecretKey,
});
module.exports.saveFile = async (file, type) => {
  try {
    const fileName = uuidv4();
    const metaData = {
      "Content-Type": "application/octet-stream",
      "X-Amz-Meta-Testing": 1234,
      example: 5678,
    };
    const path = `/result/${fileName}`;
    minioClient.putObject(bucketname, path, file, metaData, (error) => {
      if (error) {
        console.log(error);
        fs.writeFileSync(fileName, [error, `{"bucket":${bucketname},"path":"${path}"}`].toString());
        return false;
      }
      return { bucket: bucketname, path: path };
    });
    return { bucket: bucketname, path: path };
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports.getFile = async (object) => {
  try {
    const myPromise = new Promise(async (resolve, reject) => {
      const chunks = [];
      const obj = await minioClient.getObject(object.bucketname, object.path);
      obj.on("data", (chunk) => {
        chunks.push(chunk);
      });
      obj.on("end", () => {
        resolve(Buffer.concat(chunks).toString("utf-8"));
      });
    });
    return myPromise;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports.getLink = async (object) => {
  try {
    const link = await minioClient.presignedGetObject(object.bucketname, object.path, 24 * 60 * 60);
    return link;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports.removeFile = async (object) => {
  try {
    await minioClient.removeObject(object.bucketname, object.path);
    return true;
  } catch (err) {
    console.log(object, err);
    return false;
  }
};
