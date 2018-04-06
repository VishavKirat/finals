'use strict';
const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.Search = (event, context, callback) => {
    const params = {
       TableName: "music-appTable",
       Key: {
         Name: event.pathParameters.song
       }
     };

     dynamoDb.get(params).promise()

     .then(result => {
       const response = {
         statusCode: 200,
         body: JSON.stringify(result.Item),
       };

       callback(null, response);
     })
     
     .catch(error => {
       console.error(error);
       callback(new Error('Error Occured.'));
       return;
     });
 };


