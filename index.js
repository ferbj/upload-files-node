
const AWS = require('aws-sdk');
require('dotenv/config');
const id = process.env.ID;
const secret = process.env.SECRET;
const bucket_name = process.env.BUCKET_NAME;


const s3 = new AWS.S3({
	accessKeyId: id,
	secretAccessKey: secret
});

const params = {
    Bucket: bucket_name,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "us-east-2"
    }
};
console.log('id', id);
console.log('secret',secret);
console.log('bucketname',bucket_name);
console.log('params',params)
s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});
