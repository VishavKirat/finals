'use strict';
const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.List = (event, context, callback) => {
 const fetch = (error,data) => callback(null,{
    statusCode: error?400:200,
    body: error?error.message: JSON.stringify(data)
 });
 
 dynamoDb.scan({"TableName": "music-appTable"}).promise()
    .then(res => fetch(null, res))
    .catch(err => fetch(err));
};


