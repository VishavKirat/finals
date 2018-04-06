'use strict';
const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.Songs = (event, context, callback) => {

  const content =  JSON.parse(event.body);
  const params = {
    TableName: 'music-appTable',
    Item: {
      SongName: content.SongName,
      Songs: content.Songs
    }
  };

  dynamoDb.put(params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
  })
  const response = {
    statusCode: 200,
    body: JSON.stringify('Music added to playlist'),
  };
  callback(null, response);
};