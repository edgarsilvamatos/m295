const express = require('express')
const app = express()
const port = 3000

async function fetchData() {
    const url = "https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=815200";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

app.get('/', async (request, response) => {
    try {
        const data = await fetchData();
        response.send(await fetchData()); 
    } catch (error) {
        response.status(500).send('Error fetching data'); 
    }
});

app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});

