document.addEventListener("DOMContentLoaded", function () {
const bgDiv = document.getElementById("bg-url");

const weatherBox = document.getElementById("weather-box");
const forecastBox = document.getElementById("forecast-box");

const change = document.getElementById('change-btn');
const temp = document.getElementById('temperature');

    // set background if present
if (bgDiv) {
    let imageUrl = bgDiv.dataset.bg;
    if (imageUrl) {
        document.body.style.backgroundImage = "url('" + imageUrl + "')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
    }
}

let offsetX = 0;
let offsetY = 0;
let isdragging = null;

document.addEventListener("mousedown", function(e) {
    if (e.target.id === "drag") {
        isdragging = weatherBox;
    } else if (e.target.id === "drag-forecast") {
        isdragging = forecastBox;
    }

    if (isdragging) {
        offsetX = e.clientX - isdragging.offsetLeft;
        offsetY = e.clientY - isdragging.offsetTop;
        e.target.style.cursor = "grabbing";
    }
});

document.addEventListener("mousemove", function(e){
    if (isdragging) {
        isdragging.style.left = (e.clientX - offsetX) + "px";
        isdragging.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", function(e){
    if (isdragging) {
        document.getElementById(e.target.id).style.cursor = "grab";
    }
    isdragging = null;
});


let isCelsius = true;

if (temp) {
    change.addEventListener("click", function() {

        let currentTemp = parseFloat(temp.textContent);

        if (isCelsius) {
            // C to F
            let fahrenheit = (currentTemp * 9/5) + 32;
            temp.textContent = fahrenheit.toFixed(2) + " °F";

          let elements = document.querySelectorAll(".temp");
            for (let i = 0; i < elements.length; i++) {
                let item = elements[i];

                let parts = item.textContent.split("°C - ");
                  let min = parseFloat(parts[0]);
                  let max = parseFloat(parts[1]);
                  let minF = (min * 9/5) + 32;
                  let maxF = (max * 9/5) + 32;
                  item.textContent = minF.toFixed(2) + " °F - " + maxF.toFixed(2) + " °F";
            }

          change.textContent = "Convert to Celsius";
          isCelsius = false;

        } else {
            let celsius = (currentTemp - 32) * 5/9;
            temp.textContent = celsius.toFixed(2) + " °C";

          //F to C
            let elements = document.querySelectorAll(".temp");
            for (let i = 0; i < elements.length; i++) {
              let item = elements[i];

              let parts = item.textContent.split("°F - ");
              if (parts.length === 2) {
                let min = parseFloat(parts[0]);
                let max = parseFloat(parts[1]);
                let minC = (min - 32) * 5/9;
                let maxC = (max - 32) * 5/9;

                item.textContent = minC.toFixed(2) + " °F - " + maxC.toFixed(2) + " °F";
              }
            }

          change.textContent = "Convert to Fahrenheit";
          isCelsius = true;

        }
    });
}
});