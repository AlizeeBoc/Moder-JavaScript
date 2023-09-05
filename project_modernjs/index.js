import Data from "./config.js";

const createElmt = (childClass, parent, elmt) => {
  const child = document.createElement(elmt);
  child.classList.add(childClass);
  parent.appendChild(child);
  return child;
};

const createElmt_txt = (elmt, txt, parent) => {
  const child = document.createElement(elmt);
  child.innerHTML = txt;
  parent.appendChild(child);
};

let createElmt_ClassTxt = (elmt, childClass, dataList, parent) => {
  const child = document.createElement(elmt);
  child.classList.add(childClass);
  child.innerHTML = dataList + "°C";
  parent.appendChild(child);
};

const searchBar = document.querySelector("#searchBar");
const container = document.querySelector(".container");
const cityNameContainer = document.querySelector(".city-name");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
console.log("hello world");
// Event will start on a keyup action
searchBar.addEventListener("keyup", (event) => {
  // checking the action for specific key (Enter)
  if (event.key === "Enter") {
    // Store target in variable
    const city = event.target.value.toLowerCase();
    const apiUrl =
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=` +
      Data.key;
    event.currentTarget.value = "";
    // Fetching first api to get the City coordinates
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const lat = data[0].lat;
        const long = data[0].lon;
        // console.log(data);
        cityNameContainer.innerHTML = data[0].name;

        // Fetching final data according to the coordinates
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=` +
            Data.key
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            console.log(
              "Welcome to this basic weather app. this is not a product but the product of an academic exercise."
            );

            
            while (container.firstChild) {
              container.removeChild(container.firstChild);
            }

            
            for (let i = 0; i < 5; i++) {
              // Use the remainder operator (%) to switch from saturday (last in array) back to sunday (first in array)
              const date = new Date();
              let dayOfTheWeek = weekdays[(date.getDay() + i) % 7];
              // console.log(date.getDay());

              const data = result.list[i];

              const card = createElmt("card", container, "div");

              const imageBox = createElmt("imgBx", card, "div");

              const cardImg = document.createElement("img");
              cardImg.src =
                "http://openweathermap.org/img/wn/" +
                data.weather[0].icon +
                "@2x.png";
              imageBox.appendChild(cardImg);

              const contentBox = createElmt("contentBx", card, "div");

              const cardHeader = createElmt_txt("h2", dayOfTheWeek, contentBox);

              const tempDescription = createElmt_txt(
                "h4",
                data.weather[0].description,
                contentBox
              );

              const currentTempBox = createElmt("color", contentBox, "div");

              const currentTempHeader = createElmt_txt(
                "h3",
                "Temp :",
                currentTempBox
              );

              const currentTemp = createElmt_ClassTxt(
                "span",
                "current-temp",
                data.main.temp,
                currentTempBox
              );

              const minMaxTemperatures = createElmt(
                "details",
                contentBox,
                "div"
              );

              const minMaxTempHeader = createElmt_txt(
                "h3",
                "More:",
                minMaxTemperatures
              );

              const minTemp = createElmt_ClassTxt(
                "span",
                "min-temp",
                data.main.temp_min,
                minMaxTemperatures
              );
              const maxTemp = createElmt_ClassTxt(
                "span",
                "max-temp",
                data.main.temp_max,
                minMaxTemperatures
              );
            }
          });
      })
      .catch((error) => {
        // If there are errors, send out an error message
        console.error("Error:", "not a place!");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        return alert("Are you sure you aren't holding your map upside down?");
      });
  }
});
