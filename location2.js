const button = document.getElementById('get-location-button');
        const weatherInfoDiv = document.getElementById('weather-info');

        async function getdata(lat, long) {
            const promise = await fetch(
                `http://api.weatherapi.com/v1/current.json?key=3fa533c5422f4130be1164031243010&q=${lat},${long}&aqi=no`
            );
            return await promise.json();
        }

        async function gotLocation(position) {
            const result = await getdata(
                position.coords.latitude,
                position.coords.longitude
            );
            displayWeather(result);
        }

        function failedToget() {
            console.log('There was some issue getting your location.');
            weatherInfoDiv.innerHTML = '<p>Unable to retrieve your location.</p>';
        }

        function displayWeather(data) {
            if (data && data.current) {
                const { temp_c, condition } = data.current;
                weatherInfoDiv.innerHTML = `
                    <h2>Current Weather</h2>
                    <p>Temperature: ${temp_c}°C</p>
                    <p>Condition: ${condition.text}</p>
                    <img src="${condition.icon}" alt="${condition.text}">
                `;
            } else {
                weatherInfoDiv.innerHTML = '<p>Weather data unavailable.</p>';
            }
        }

        button.addEventListener('click', async () => {
            navigator.geolocation.getCurrentPosition(gotLocation, failedToget);
        });