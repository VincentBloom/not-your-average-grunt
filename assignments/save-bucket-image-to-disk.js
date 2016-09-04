/**
 * Created by vanilla on 9/3/16.
 */
// Importing the AWS SDK as a node module.
var AWS = require('aws-sdk');

// Importing filesistem library.
var fs = require('fs');

// Instancing a new S3 object.
var s3 = new AWS.S3();

// Target and destination buckets.
var downloadParams = {Bucket: 'not-your-average-grunt', Key: 'images/baby-cow.jpg'};
var uploadParams = {Bucket: 'cc116-assignment3', Key: '18462/custom-cow.jpg'};

// Creating a Writestream for the download target.
var file = fs.createWriteStream('test.jpg');

// Part 1. Save the file in disk.
s3.getObject(downloadParams).createReadStream().pipe(file);

// Part 2. Checking file metadata.
s3.getObject(downloadParams, function(err, data) {
  // Request error checking.
  if (err) throw err;

  // Verifying content type.
  else if (data.ContentType !== 'image/jpeg') console.log('File is not a jpeg image. Returning');

  // Veryfing user-defined metadata to grant access to upload.
  else if (data.Metadata.move.toLowerCase() !== 'true') console.log("'Move' key is not set to 'true'");

  // After error checking has been made.
  else {
    // Part 3. Uploading the file to target bucket.

    // Reading the file and storing it in buffer. Adding the open stream to the body of the request.
    uploadParams.Body = fs.createReadStream('test.jpg');

    // Uploading the file into destination.
    s3.upload(uploadParams, function(err, data) {
      // Request error checking.
      if (err) throw err;

      // Verification message.
      else console.log('Success! \nResponse: ', data);
    });
  }
});



