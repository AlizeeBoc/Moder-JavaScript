/////////////////////////////: sources webPack ///////////////////////////////
//  https://www.youtube.com/watch?v=HNb6bapmsyI&t=790s
// https://www.sitepoint.com/webpack-beginner-guide/
// https://stackoverflow.com/questions/67926476/webpack-dev-server-config-contentbase-not-working-in-latest-version
// pour SASS : https://www.youtube.com/watch?v=P3aKRdUyr0s
// prettier : https://www.youtube.com/watch?v=DqfQ4DPnRqI

import "./image-component.js"
import "./style.css"
import config from "./config.js"

import {
  CalculMinTemperatures,
  minTemperature,
  convertTimeStamp,
  maxTemperature,
  calculMaxTemperatures,
} from "./calculator.js"
import { removeCityCardDef } from "./removeCityCardDef.js"
import { getDayOfWeek } from "./getDayOfWeek.js"
import { set_Id_InnerTxt } from "./setId_InnerText.js"
import { createForecasts } from "./createForecasts.js"

/////////////////////////////////////////////////// CODE //////////////////////////////////////////////////////////////////

const body = document.querySelector("body")
const inputDef = document.getElementById("inputDef")
const cityCard = document.getElementById("cityCard")
const input = document.querySelector(".input")
const submitBtn = document.querySelector("#submitDef")
const forecasts = document.getElementById("forecasts")

const myKey = config.Key_openWeather
const key_unsplash = config.key_Unsplash

const unsplashUrl_BXL =
  "https://api.unsplash.com/photos/random/?client_id=" +
  key_unsplash +
  "&query=Bruxelles"

/////////////////////////////////////////////// Ville par défaut /////////////////////////////////////////////////////////

fetch(
  `http://api.openweathermap.org/geo/1.0/direct?q=Brussels&limit=1&appid=` +
    myKey,
)
  .then((response) => response.json())
  .then((data) => {
    const lat = data[0].lat
    const long = data[0].lon
    // console.log(data);

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=` +
        myKey,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const day = {}

        day.name = "Brussels"
        day.dateTime = new Date(data.list[0].dt * 1000)
        day.description = data.list[0].weather[0].description
        day.temperature = Math.round(data.list[0].main.temp)
        // temperatures a modifier

        set_Id_InnerTxt("cityNameDef", day.name)
        set_Id_InnerTxt(
          "dateDef",
          day.dateTime.toLocaleString("en-US", {
            month: "long",
            weekday: "long",
            year: "numeric",
            day: "numeric",
          }),
        )

        set_Id_InnerTxt("tempDef", day.temperature + "°c")
        set_Id_InnerTxt("descriptionDef", day.description)

        const iconDef = document.getElementById("iconDef")
        iconDef.src =
          "https://openweathermap.org/img/wn/" +
          data.list[0].weather[0].icon +
          "@2x.png"
      })
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des coordonnées géographiques pour Bruxelles:",
      error,
    )
  })

///////////////////////////////////////////////  Event Listener - keyPress  /////////////////////////////////////////////////////////

inputDef.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    document.getElementById("forecasts").replaceChildren()
    document.body.style.height = "fit-content"

    fetchWeatherData()
    cityCard.style.display = "block"
    // cityCard.classList.add("oldCard");
  }
})

///////////////////////////////////////////////  Fetch datas de la ville recherchée  /////////////////////////////////////////////////////////

const fetchWeatherData = () => {
  setTimeout(removeCityCardDef, 50)
  body.classList = "styleBody"

  const city = input.value

  fetch(
    "https://api.unsplash.com/photos/random/?client_id=" +
      key_unsplash +
      `&query=${city}`,
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      body.style.backgroundImage = `url(${data.urls.regular})`
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des images pour la ville recherchée:",
        error,
      )
    })

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=` +
      myKey,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // console.log(data);

        const latitude = data[0].lat
        const longitude = data[0].lon

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=` +
            myKey,
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            console.log(data.list)

            ////////////////////////////  tableau days de day --> traitement des données a ne plus reproduire car objet day = données écrasées, non compilées?!  /////////////////////

            const days = []
            console.log(days)

            for (let i = 0; i < data.list.length - 1; i++) {
              const currentDay = convertTimeStamp(data.list[i].dt).slice(0, 2)
              const nextDay = convertTimeStamp(data.list[i + 1]?.dt).slice(0, 2)

              if (currentDay !== nextDay) {
                const dayOfWeek = getDayOfWeek(data.list[i].dt)
                const description = data.list[i].weather[0].description

                days.push({
                  nameDay: dayOfWeek,
                  description: description,
                  icon:
                    "https://openweathermap.org/img/wn/" +
                    data.list[i].weather[0].icon +
                    "@2x.png",
                })
              }
            }
            //////////// Données graphique ///////////////

            //fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
            //  .then ((response)=> response.json())
            //  .then ((data) => {
            //    console.log(data.hourly.temperature_2m)
            //    console.log(data.hourly.time)
            //    const hourlyTemp = []
            //    for (let i = 0; i<24; i++){
            //      hourlyTemp.push(data.hourly.temperature_2m[i])
            //    }
            //   console.log(hourlyTemp)

            //   let trace2 = {
            //    x: Array.from({length: 24}, (_, i) => i),
            //    y: hourlyTemp, 
            //    type: 'scatter'
            //  };
              
            //  var data = [trace2];
              
            //  Plotly.newPlot('myDiv', data);

            //  }).catch((error) => {
            //    console.error(
            //      "Une erreur s'est produite lors de la récupération des températures du jour pour la ville recherchée:",
            //      error,
            //    )
            //  })

              ////////////////////////////////////////////

            days.forEach((day, index) => {
              day.min = Math.round(minTemperature(data.list)[index])
              day.max = Math.round(maxTemperature(data.list)[index])
            })

            set_Id_InnerTxt("cityName", input.value)

            input.value = ""

            const newDate = new Date(data.list[0].dt * 1000).toLocaleString(
              "en-US",
              {
                month: "long",
                weekday: "long",
                year: "numeric",
                day: "numeric",
              },
            )

            set_Id_InnerTxt("date", newDate)

            set_Id_InnerTxt("temp", Math.round(data.list[0].main.temp) + "°c")

            set_Id_InnerTxt("description", data.list[0].weather[0].description)

            const icon = document.getElementById("icon")
            icon.src =
              "https://openweathermap.org/img/wn/" +
              data.list[0].weather[0].icon +
              "@2x.png"

            const minMax =
              Math.round(minTemperature(data.list)[0]) +
              "/" +
              Math.round(maxTemperature(data.list)[0]) +
              "°c"

            set_Id_InnerTxt("minMax", minMax)

            set_Id_InnerTxt("wind", data.list[0].wind.speed + " m/s")
            set_Id_InnerTxt("humidity", data.list[0].main.humidity + " %")
            set_Id_InnerTxt(
              "visibility",
              data.list[0].visibility / 1000 + " km",
            )

            days.slice(1).forEach((forecast) => {
              createForecasts(forecast)
            })
          })
      }
    })
}

submitBtn.addEventListener("click", () => {
  forecasts.replaceChildren()
  document.body.style.height = "fit-content"
  fetchWeatherData()

  cityCard.style.display = "block"
})

// const background = document.createElement("img");
// body.append(background);

fetch(unsplashUrl_BXL)
  .then((response) => response.json())
  .then((data) => {
    body.style.backgroundImage = `url(${data.urls.regular})`
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des images :",
      error,
    )
  })

///////////////////////////////////////////////////////////////////////////// APPRENTISSAGES ///////////////////////////////////////

// 1. Créer des fonctions pour alléger le code principal
// 2. SelectByClassName ----------------> collection HTML : impossible d'itérer dessus avec un forEach.
//    QuerySelectorAll  ----------------> NodeList donc ok pour le forEach
//    EXEMPLE :
//      inputs.forEach((input) => {
//        input.addEventListener("keypress", (event) => {
//          if (event.key === "Enter") {
//            fetchWeatherData();
//          }
//        });
//      });
// 3. json viewer extension
// 4. Quand une condition est posée dans une boucle, passer toutes les étapes de l'itération en revue, attention ++ aux premier et dernier élément.
// 5.

// ////////////////////////////////////////////////////////////////////////// SOURCES ///////////////////////////////////////////////////////////////////////////////////////////////////////////

//  http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//  https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey} --> non
//  api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} ---> ok mais nécessite une autre api pour fetch les min et max
//  json viewer extension
//  tuto css : https://www.youtube.com/watch?v=WZNG8UomjSI
//  tuto random picture unsplash : https://www.youtube.com/watch?v=e8p1zSNmK7Q
//  idées de petites apps à réaliser https://github.com/AsmrProg-YT/100-days-of-javascript/tree/master/Day%20%2310%20-%20Weather%20App
//  how to hide apiKey : https://medium.com/@oreillyalan88/how-to-hide-api-keys-from-github-7a14d1bf80c

// https://www.sitepoint.com/webpack-beginner-guide/
