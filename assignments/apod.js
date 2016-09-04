/**
 * Created by vanilla on 9/3/16.
 */
// Importing the request module.
var request = require('request');

// Importing the filesystem module.
var fs = require('fs');

// Reading NASA developer key from external file.
var contents = fs.readFileSync('apodAPIKey.json');

// Extracting the key.
var key = JSON.parse(contents).key;

// Making an HTTP request to NASA's APOD API.
request('https://api.nasa.gov/planetary/apod?api_key=' + key, function(err, response, body){

  // Converting the content to JSON.
  var content = JSON.parse(body);

  // Logging the picture of the day's title.
  console.log("APOD (Astronomical Picture Of the Day): " + content.title);

  // Creating a write stream to write the picture of the day into. Using the title of the picture.
  var dest = fs.createWriteStream('apod/' + content.title.replace(/\s+/g, '-') + '.jpg');

  // Making an HTTP request to capture the image in buffer and save it to file asynchronously.
  request(content.url, function(err, response, body) {
    if (err) throw err;
  }).pipe(dest);

});

