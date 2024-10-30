import axios from "axios";

const url = 'http://localhost:3000/cars'; 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

var car = await axios.get(url+"/13");

while (true) {
    try {
        car = car.data.data[0]
        console.log(car);
        car.latitude = parseFloat(car.latitude)
        car.longitude = parseFloat(car.longitude)
        break
        
    } catch (error) {
        console.log("Error api trying");
        await delay(2000)
    }
}


const runLoop = async () => {
    while (true) {// Replace 5 with your desired number of iterations
        var latitud = getRandomBetween(-0.001, 0.001);
        var longitud = getRandomBetween(-0.001, 0.001);

        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
        const day = String(date.getDate()).padStart(2, '0');
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        const mysqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        

        car.latitude = car.latitude + latitud
        car.longitude = car.longitude + longitud
        car.updated_at = mysqlDateTime
        const response = await axios.put(url, car);
        await delay(500); // Wait for 2 seconds
        console.log(response);
    }
};

runLoop();



