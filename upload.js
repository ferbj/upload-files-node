const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
require('dotenv/config');

const ruta = 'C:/Users/Hp/Pictures/';
const s3 = new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET,
});

   const distFolderPath = path.join(ruta);
    console.log(distFolderPath);
    // get of list of files from 'dist' directory
fs.readdir(distFolderPath, (err, files) => {

  if(!files || files.length === 0) {
    console.log(`provided folder '${distFolderPath}' is empty or does not exist.`);
    console.log('Make sure your project was compiled!');
    return;
  }

  // for each file in the directory
  for (const fileName of files) {

    // get the full path of the file
    const filePath = path.join(distFolderPath, fileName);
    
    // ignore if directory
    if (fs.lstatSync(filePath).isDirectory()) {
      continue;
    }

    // read file contents
    fs.readFile(filePath, (error, fileContent) => {
      // if unable to read file contents, throw exception
      if (error) { throw error; }

      // upload file to S3
      s3.putObject({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: fileContent
      }, (res) => {
        console.log(`Successfully uploaded '${fileName}'!`);
      });

    });
  }
});



