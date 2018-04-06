'use strict';
const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.Post = (event, context, callback) => {
  event.Records.forEach((record) => {
    const fileName = record.s3.object.key;
    const action = record.eventName
    const Time = record.eventTime

    let params = {
      TableName: 'music-appTable',
      Item: {
        SongName: fileName,
        Action: action,
        Time: Time
      }
    }
   

    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    })
});
};