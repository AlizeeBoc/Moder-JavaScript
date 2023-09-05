export const createForecasts = (forecast) => {
  const forecasts = document.getElementById("forecasts");
  const dailyForecast = document.createElement("div");
  dailyForecast.setAttribute("class", "dailyForecast");

  const dayNameForecast = document.createElement("p");
  dayNameForecast.id = "dayNameForecast";
  dayNameForecast.innerText = forecast.nameDay;

  const iconForecast = document.createElement("img");
  iconForecast.id = "iconForecast";
  iconForecast.src = forecast.icon;

  const tempForecast = document.createElement("div");
  tempForecast.id = "tempForecast";

  const minMaxForecast = document.createElement("p");
  minMaxForecast.id = "minMaxForecast";
  minMaxForecast.innerText = forecast.min + "/" + forecast.max + "°c";

  tempForecast.appendChild(minMaxForecast);

  dailyForecast.append(dayNameForecast);
  dailyForecast.append(iconForecast);
  dailyForecast.append(tempForecast);

  forecasts.append(dailyForecast);
};
