/**
 * Created by vanilla on 8/27/16.
 */
// Importing the AWS SDK as a node module.
var AWS = require('aws-sdk');

// Instancing a new AWS SDK Object.
var s3 = new AWS.S3();

// Making an object with the parameters for the call.
var params = {
  Bucket: 'not-your-average-grunt'
};

// Using the AWS S3 API to list the versions of all objects of my Bucket.
s3.listObjectVersions(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else {
    var lastDate = new Date(0);
    // data.Versions returns an array. Need to loop through all objects in array to search for the last modified date.
    for (var i in data.Versions)

      // Compare each object's modification date.
      if (data.Versions[i].LastModified.getTime() > lastDate.getTime()) lastDate = data.Versions[i].LastModified;

    // Logs the result of the last modification date.
    console.log('The last modified date for ' + params.Bucket + ' was: ' + lastDate);
  }
});
