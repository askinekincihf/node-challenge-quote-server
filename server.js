// server.js
// This is where your node app starts

//load the 'express' module which makes writing web servers easy
const express = require("express");
const app = express();
const lodash = require("lodash");

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send(`
  <h1 style="text-align:center">Askin's Quote Server!</h1>
  <h2 style="color:blue">For quotes: <i>/quotes</i></h2> 
  <h2 style="color:green">For random quotes: <i>/quotes/random</i></h2>
  <h2 style="color:red">For search: <i>quotes/search?term=</i></h2>`);
});

//START OF YOUR CODE...

app.get("/quotes", (request, response) => response.send(quotes));


// Random quote is created by function named pickFromArray
// app.get("/quotes/random", (request, response) => response.send(pickFromArray(quotes)));


// Random quote is created by lodash library
app.get("/quotes/random", (request, response) => response.send(lodash.sample(quotes)));


app.get("/quotes/search", (request, response) => {
  let term = request.query.term;
  let filteredQuotes = quotes.filter((entry) => entry.quote.toLowerCase().includes(term.toLowerCase()) || entry.author.toLowerCase().includes(term.toLowerCase()))
  response.send(filteredQuotes)
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
