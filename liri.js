
require("dotenv").config();

var keys = require('./keys.js');
var inquirer = require("inquirer");
var request = require("twitter");
var twitter = require('twitter');
var spotify = require('spotify');

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);
var client = new twitter(keys.twitterKeys);
var fs = require('fs');
 


//var query1 = (process.argv[2]);

var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
  case "movie-this":
    moviethis(value);
    //console.log(value);
    break;

  case "spotify-this-song":
    spotifythis(value);
    break;

  case "my-tweets":
    showTweets3();
    break;

  case "do-what-it-says":
    dowhatitsays();
    break;
   default : 
   	 defaultError();
     break;
}

	 

		//--------------------------------------------);
        //LIRI ERR FUNCTION
        //---------------------------------------------);
        function defaultError() {

        			console.log("--------------------------------------------------");
	                console.log("Liri doesn'tt Recognized this command ...Try Again !");
	                console.log("--------------------------------------------------");
        }
		function moviethis(movie) {
			//var movie = movie;
			request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

		    	if (!error && response.statusCode === 200) {


			    	console.log("------------------------------------------------------ " );
			    	


			    	console.log("The Movie Title  : " + JSON.parse(body).Title);
			    	console.log("Released Year   : " + JSON.parse(body).Released);
			    	console.log("Rating : " + JSON.parse(body).imdbRating);
			    	console.log("Runtime : " + JSON.parse(body).Runtime);
			       	console.log("Votes: " + JSON.parse(body).imdbVotes);
			    	console.log("Actors/Actresses : " + JSON.parse(body).Actors);
			    	console.log("Actors/Actresses : " + JSON.parse(body).Plot);
			    	console.log("Tomato Rating : " + JSON.parse(body).tomatoRating);
			    	console.log("Country : " + JSON.parse(body).Country);
			    	



			    	console.log("------------------------------------------------------ " );
			    	
		  		}
			});
		}

 		//--------------------------------------------);
        //SPOTIFY FUNCTION
        //---------------------------------------------);
		 

		function spotifythis(tracks) {
			var Spotify = require('node-spotify-api');
		   	var spotify = new Spotify({
    				id: "7fbbaeccca194130b81a900f526331ed",
   				secret: "a8a55142230b45f8ae6fa4238bb34f7c"
		  	});
			var params = {type: "track", query: tracks, limit: 20};
        	spotify.search(params, function(err, data) 	{
              if (!err) {
                data.tracks.items.forEach(function(ea){
                    console.log("---------------------------------------------");
	                console.log("Search Results");
	                console.log("---------------------------------------------");
	                console.log("Artist: ", ea.artists[0].name, "\n",
                                "Name: ", ea.name, "\n",
                                "External Link: ", ea.external_urls.spotify, "\n",
                                //"count: ", ea.artist.track[0], "\n",
                                "Album: ", ea.album.name);
	                
	                    //adds text to log.txt
				       	// fs.appendFile('log.txt', ea.artists[0].name);
				        // fs.appendFile('log.txt', ea.name);
				        // fs.appendFile('log.txt', ea.external_urls.spotify);
				        // fs.appendFile('log.txt', ea.album.name);
				        // fs.appendFile('log.txt', "-----------------------");
								        
				        
				     });
 
	                console.log("---------------------------------------------");
	                console.log("This search is limited to <= 20 results only");
	                console.log("---------------------------------------------");
	              }
              	//--------------------------------------------);
		        //SPOTIFY FUNCTION  
		        // - * if the song is undefined handler
		        //---------------------------------------------);
				 
               	if(tracks === undefined){	
		        	console.log("The Sign");
			        var params = {type: "track", query: "The Sign"};
			        spotify.search(params, function(err, data){
			            if(!err){
		               		data.tracks.items.forEach(function(ea){
		                    if (ea.artists[0].name === 'Ace of Base' && ea.name === 'The Sign'){
		                        console.log("--------------------");
		                        console.log("artist: ", ea.artists[0].name, "\n",
		                                "name: ", ea.name, "\n",
		                                "link: ", ea.external_urls.spotify, "\n",
		                                "album: ", ea.album.name);
		                    }  

		                	});
		            	}
		       		 })
    
    			}



       		 });
    	}

    	//--------------------------------------------);
        //TWITTER FUNCTION
        //---------------------------------------------);
		function twitterthis() {
			var Twitter = require('twitter');
			 
			var client= new Twitter({
			   

			  consumer_key: 'fKUzpMR82z3MKdhp9IeZmR8So',
			  consumer_key: 'k00qi73xE7k5X0dinY6gMeVpeUMsXh7utztQtjlnvJBsZAC79i',

			  access_token_key: 'JoutKnPHmDKhESnf8ifDQHx7xswaToY',
			  access_token_secret: 'rvLQkEs9O7UwWVXROpxAHqkggLvZlh8iCqQU4qcI6XNhT'


			});
			 
			

			var getTweets = function(){
    		var user = "obuenavidez1";

		    //get info from Twitter
		    console.log(user); //default
		    var params = {count: 20, screen_name: user};
		    client.get('statuses/user_timeline', params, function(error, tweets, response) {
		      if (!error) {
		          for (var i=0; i<tweets.length; i++){
		              console.log("--------------------");
		              console.log(tweets[i].text, "\n",
		                          tweets[i].created_at);
		          }
		      }
		    });
			}
			console.log("user"); 
		}

			 
		function twitterthis2() {
			var getTweets = function(){
			    //my-tweets
			var user = "obuenavidez1";
			    console.log(user); //default
			    var params = {count: 20, screen_name: user};
			    client.get('statuses/user_timeline', params, function(error, tweets, response) {
			      if (!error) {
			          for (var i=0; i<tweets.length; i++){
			              console.log("--------------------");
			              console.log(tweets[i].text, "\n",
			                          tweets[i].created_at);
			          }
			      }
			    });
			}
    	}



    	function showTweets3(){
		  //Display last 20 Tweets
		  var screenName = {screen_name: 'obuenavidez1'};
		  client.get('statuses/user_timeline', screenName, function(error, tweets, response){
		    	if(!error){
				      for(var i = 0; i<tweets.length; i++){
				        var date = tweets[i].created_at;
				        console.log("@obuenavidez1: " + tweets[i].text + " Created At: " + date.substring(0, 19));
				        console.log("-----------------------");
				        
				        //adds text to log.txt file
			        fs.appendFile('log.txt', "@obuenavidez1: " + tweets[i].text + " Created At: " + date.substring(0, 19));
			        fs.appendFile('log.txt', "-----------------------");
			    	}
		    	}else{
		      console.log('Error occurred');
		      console.log(error);
		    }
		  });
		}


    	//--------------------------------------------);
        //DO-WHAT-IT-SAYS  FUNCTION
        //---------------------------------------------);
		 
    	 

    	function dowhatitsays(){
			  		fs.readFile('random.txt', "utf8", function(error, data){
			    	var txt = data.split(',');

			    	spotifythis(txt[1]);
			 	 });
		}








		


	



	 