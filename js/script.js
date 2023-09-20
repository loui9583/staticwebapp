let carArray = [];

function deleteCar(carId) {
    fetch(`https://carsskoleprojekt.azurewebsites.net/api/cars/${carId}`, {method: "delete"})
        .then(res => {
            if (res.ok) {
                console.log("Great Success");
                loadCarsIntoDom();
            } else throw new Error(`ERROR: Status: ${res.status}. Most likely explanation: Car that is part of a reservation cannot be deleted.`);
        })
}

function loadCarsIntoDom() {
    fetch('https://carsskoleprojekt.azurewebsites.net/api/cars/includeAll')
        .then(res => {
            if (!res.ok) {
                throw new Error("FAIL: " + res.status);
            } else {
                return res.json();
            }
        })
        .then(data => {
            carArray = data;
            document.getElementById("tbody").innerHTML = carArray.map(car => `    
          <tr>
              <td>${car.id}</td>
              <td>${car.model}</td>
              <td>${car.brand}</td>
              <td>${car.pricePrDay}</td>
              <td><button onclick="deleteCar(${car.id})">Delete Car</button></td>
          </tr>`).join("");
        })
        .catch(error => console.log(`ERROR  ${error}`));
}
function addCar() {
    fetch("https://carsskoleprojekt.azurewebsites.net/api/cars", {
        method: "POST", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            brand: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            pricePrDay: document.getElementById('pricePrDay').value,
            bestDiscount: document.getElementById('bestDiscount').value,
        })

    }).then(res => {
        if (res.ok) {
            console.log("success");
            loadCarsIntoDom()
        }
    }).catch(error => console.log(`Error: + ${error}`))
}


loadCarsIntoDom();