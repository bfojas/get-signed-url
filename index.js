const AWS = require("aws-sdk");
const s3 = new AWS.S3({
	signatureVersion: 'v4'
});

exports.handler = async (event, context, callback) => {
    const params = {Bucket: process.env.BUCKET_NAME, Key: JSON.parse(event.body).fileName};
    try {
    const url = await s3.getSignedUrl('putObject', params);
    const response = {
        statusCode: 200,
        body: JSON.stringify({"url": url})
    };
    return response;
    } catch(err) {
        return {statusCode: 500, body: JSON.stringify(err)};
    }
};
