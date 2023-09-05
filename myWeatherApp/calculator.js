export const CalculMinTemperatures = (array) => {
  let min = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
  }
  return min;
};

export const minTemperature = (dataList) => {
  let dailyTemp = [];
  let minTemp = [];

  for (let j = 0; j < dataList.length - 1; j++) {
    let day = convertTimeStamp(dataList[j].dt).slice(0, 2);
    if (day != convertTimeStamp(dataList[j + 1].dt).slice(0, 2)) {
      dailyTemp.push(dataList[j].main.temp);
      minTemp.push(CalculMinTemperatures(dailyTemp));
      dailyTemp = [];
    } else {
      dailyTemp.push(dataList[j].main.temp);
    }
  }
  return minTemp;
};

export const convertTimeStamp = (timeStamp) => {
  let date = new Date(timeStamp * 1000);
  return date.toLocaleDateString("en-US", {
    month: "long",
    weekday: "long",
    year: "numeric",
    day: "numeric",
  });
};

export const calculMaxTemperatures = (array) => {
  let max = array[0]; /// il faudrait en faire une focn
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
};
// min temperatue over 5 days

export const maxTemperature = (dataList) => {
  let dailyTemp = [];
  let maxTemp = [];

  for (let j = 0; j < dataList.length - 1; j++) {
    let day = convertTimeStamp(dataList[j].dt).slice(0, 2);
    if (day != convertTimeStamp(dataList[j + 1].dt).slice(0, 2)) {
      dailyTemp.push(dataList[j].main.temp);
      maxTemp.push(calculMaxTemperatures(dailyTemp));
      dailyTemp = [];
    } else {
      dailyTemp.push(dataList[j].main.temp);
    }
  }
  return maxTemp;
};

// export default CalculMinTemperatures;










// const calculMean = (array) => {
//     let sum = 0;
//     let result = 0;
//     for (let i = 0; i < array.length; i++) {
//       sum += array[i];
//     }
//     result = sum / array.length;
//     return result;
//   };

//   const calculMeanTempPerDay = (dataList) => {
//     let temptab = [];
//     let DaysMeanTemp = [];
//     for (let j = 0; j < dataList.length - 1; j++) {
//       let day = convertTimeStamp(dataList[j].dt).slice(0, 2);
//       if (day != convertTimeStamp(dataList[j + 1].dt).slice(0, 2)) {
//         temptab.push(dataList[j].main.temp);
//         DaysMeanTemp.push(calculMean(temptab));
//         temptab = [];
//       } else {
//         temptab.push(dataList[j].main.temp);
//       }
//     }
//     return DaysMeanTemp;
//   };

// https://www.youtube.com/watch?v=Q3SBogjUfMk
