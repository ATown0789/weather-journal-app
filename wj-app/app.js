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
			console.log(newData);
			return newData;
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
			console.log(data)
			postData('./addJournal',{
			temp: data.main.temp,
			date: DATE,
			userRes: feel
			});	
		})
}

/* Event listener to add function to existing HTML DOM element */
const generate = document.getElementById('generate');
generate.addEventListener('click', makeStuffHappen);




/* Function to GET Project Data */
