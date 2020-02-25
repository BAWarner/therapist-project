require('dotenv').config();
let { S3_KEY, S3_SECRET, BUCKET_REGION, BUCKET_NAME } = process.env;

const AWS = require('aws-sdk');


AWS.config = new AWS.Config({
    accessKeyId: S3_KEY,
    secretAccessKey: S3_SECRET,
    region: BUCKET_REGION
});

const s3 = new AWS.S3();

const Bucket = BUCKET_NAME;

const generateGetUrl = Key => {
    return new Promise( (resolve, reject) => {
        const params = {
            Bucket,
            Key,
            Expires: 120

        };
        s3.generateSignedUrl('getObject', params, (err, url) => {
            if( err ){
                reject(err);
            }else{
                resolve(url);
            }
        });
    } );
}

const generatePutUrl = (Key, ContentType) => {
    return new Promise( (resolve, reject) => {
        const params = { Bucket, Key, ContentType };

        s3.getSignedUrl('putObject', params, (err, url) => {
            if(err){
                reject(err);
            }else{
                resolve(url);
            }
        });
    } );
}

module.exports = {
    generateGetUrl,
    generatePutUrl
}