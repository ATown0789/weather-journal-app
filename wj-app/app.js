//Global Variables
const tempEl = document.getElementById('temp');
const dateEl = document.getElementById('date');
const userResEl = document.getElementById('userRes');

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const API_KEY = config.WEATHER_KEY;

/* Get Current Local Date  */
const date = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const DATE = date.toLocaleDateString(undefined, options);

/* Function to GET Web API Data*/
const getWeatherInfo = async (baseURL, zip = '75236', API_KEY) => {
	const res = await fetch(baseURL + zip + API_KEY);
	try{
		const data = await res.json();
		return data;
	}
	catch(error){
		console.log('error', error);
	}
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
	const res = await fetch(url,{
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
		try {
			const newData = await res.json();
			return newData;
		}
		catch(error){
			console.log('error', error);
		}
}

/* Function to GET Project Data and update UI*/
const updateUI = async () => {
	const req = await fetch('/getData');
	try{
		const weatherData = await req.json();
		console.log(weatherData);
		const index = weatherData.length - 1;
		tempEl.textContent = weatherData[index].temp;
		dateEl.textContent = weatherData[index].date;
		userResEl.textContent = weatherData[index].userRes;
	}
	catch(error){
		console.log('error', error);
	}
}

/* Function called by event listener */
const makeStuffHappen = () => {
	const zip = document.getElementById('zip').value;
	const feel = document.getElementById('feelings').value;
	getWeatherInfo(baseURL, zip, API_KEY)
		.then((data) => {
			postData('/addJournal',{
			temp: data.main.temp,
			date: DATE,
			userRes: feel
			});
		updateUI();
		})
}

/* Event listener to add function to existing HTML DOM element */
const generate = document.getElementById('generate');
generate.addEventListener('click', makeStuffHappen);
