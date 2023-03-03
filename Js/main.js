async function getWeatherData(location) {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=" +
      location +
      "&aqi=no"
  )
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
     console.log(err)
    });
    if(response.error)
    {
      alert(response.error.message);
    }
  document.getElementById("temperature").innerHTML =
    response.current.temp_c + "°";
  document.getElementById("feelsLike").innerHTML =
    "Feels " + response.current.feelslike_c + "°";
  var image = document.getElementById("weatherIcon");
  if (response.current.condition.text === "Overcast") {
    image.src = "image/overcast.svg";
  } else if (response.current.condition.text === "Sunny") {
    image.src = "image/sunny.svg";
  } else if (response.current.condition.text === "Mist") {
    image.src = "image/mist.svg";
  } else if (response.current.condition.text === "Clear") {
    image.src = "image/clear.svg";
  } else {
    image.src = "image/icon3.png";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    var loc = document.getElementById("locationInput").value;
    if (loc == null || loc == "") {
      document.getElementById("temperature").innerHTML = "0°";
      document.getElementById("feelsLike").innerHTML = "Feels 0°";
    } else {
      getWeatherData(loc);
    }
  }
});

(() => {
  document.getElementById("locationInput").innerHTML = "Kolkata";
})();
