// Setup empty JS object to act as endpoint for all routes
const journalData = {};
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors();
// Initialize the main project folder
app.use(express.static('wj-app'));
// Callback to debug
const listening = () => {
	console.log('server running');
	console.log(`running on localhost: ${port}`);
};
// Spin up the server
const port = 3000;
const server = app.listen(port, listening);

// Callback function to complete GET '/all'
const getFunc = (req, res) => {
	res.send(journalData);
}

// Initialize './all' route with getFunc callback function
app.get('./getData', getFunc);

// Callback function to complete POST './addJournal'
const addJournal = (req, res) => {
	const journalInfo = req.body;
	const journalEntry = {
		temp: journalInfo.temp,
		date: journalInfo.date,
		userRes: journalInfo.userRes
	}
	journalData.push(journalEntry);
	res.send(journalData);
}

// Initialize './addJournal' Post Route
app.post('./addJournal', addJournal);
  