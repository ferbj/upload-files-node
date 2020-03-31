var restify = require('restify'), // require the restify library.
server = restify.createServer(); // create an HTTP server.

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
//server.use(restify.CORS());
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());


server.post('/hello', function (req, resMain, next) {
    if (req.body.ruta) {
        var ruta = req.body.ruta;
        //var user = req.body.user;
        console.log(ruta);

   //

   const fs = require('fs');
   const AWS = require('aws-sdk');
   const path = require('path');
   require('dotenv/config');

   //const ruta = 'C:/Users/Hp/Pictures/';
   //const ruta = '/home/ubuntu/Escritorio/ProyectoMicroservicios/'
   console.log('ruta' , ruta);
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





//  FIN DELA CONEXION AL API




        resMain.send({ response: "OK" });
    } else {
        resMain.send(400, { response: "Incorrect JSON structure" });
    }
    return next();
});













// add a route that listens on http://localhost:5000/hello/world
/*server.get('/hello', function (req, res, cb) {
  res.send("Hello World!");
  console.log(req);
  console.log(res);
  return cb();
});*/

server.listen(8080 , function () { // bind server to port 5000.
  console.log('%s listening at %s', server.name, server.url);
});
