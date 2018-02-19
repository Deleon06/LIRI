require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var keys = require('./keys.js')
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = require("request");


var third_input = process.argv[2];
var fourth_input = process.argv[3];

if (third_input === "my-tweets") {
    var params = {
      screen_name: "gdelions",
      count: 20
    };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
      if (error) throw error; 
     
      {
        for (var i = 0; i < tweets.length; i++) {
          console.log(i+1);
          console.log(tweets[i].created_at);
          console.log(tweets[i].text);
        }
    }
    });
} 

else if (third_input === "spotify-this-song") {
    if (fourth_input === undefined) {
        fourth_input = "What's my age again"
    }
    //data.tracks.items does not hold the artists name, we need the map method to go back in the api and locate the name.  also need song[i] so the search can reference the specific song
    var getname = function(artist) {
        return artist.name
    }
    spotify.search(
        {
            type:"track",
            query: fourth_input
        },
        function(err, data){
        if (err) {
            console.log('Error occured: ' + err);
            return;
        }
        var song = data.tracks.items;

        for (var i = 0; i < song.length; i++){
            console.log(i + 1);
            console.log("artist(s): " + song[i].artists.map(getname));
            console.log("song name: " + song[i].name);
            console.log("preview song: " + song[i].preview_url);
            console.log("album: " + song[i].album.name)
        }
    }
  ); 
}

else if (third_input === "movie-this") {
    if (fourth_input === undefined) {
        fourth_input = "Mr.Nobody"
    }
    request("http://www.omdbapi.com/?t=" + fourth_input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // Took from class exercise... If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);

            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[2].Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
        }
    });
}
