let image = document.getElementById("weatherIcon");
let clicked = document.getElementById("dropMenu");
let select = document.getElementById("locationInput");
let elmts = [
  "Kolkata",
  "London",
  "Mumbai",
  "Chennai",
  "Orissa",
  "Agra",
  "Bangalore",
  "Gujarat",
  "Hyderabad",
];

async function getWeatherData(location) {
  const url = `http://localhost:5000/${location}`;
  const response = await fetch(url)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
  if (response.error) {
    alert(response.error.message);
  } else {
    try {
      document.getElementById("temperature").innerHTML =
        response.data.tempC + "°";
      document.getElementById("feelsLike").innerHTML =
        "Feels " + response.data.feelsLike + "°";
      if (response.data.condition === "Overcast") {
        image.src = "image/overcast.svg";
      } else if (response.data.condition === "Sunny") {
        image.src = "image/sunny.svg";
      } else if (response.data.condition === "Mist") {
        image.src = "image/mist.svg";
      } else if (response.data.condition === "Clear") {
        image.src = "image/clear.svg";
      } else {
        image.src = "image/icon3.png";
      }
    } catch (err) {
      console.error(err);
    }
  }
}

function openMenu() {
  if (clicked.style.display == "block") {
    clicked.style.display = "none";
  } else {
    clicked.style.display = "block";
  }
}

function createDropdownList() {
  for (var i = 0; i < elmts.length; i++) {
    var op = elmts[i];
    var el = document.createElement("li");
    el.textContent = op;
    select.appendChild(el);
  }
}
createDropdownList();

var ele = document.querySelectorAll("#locationInput li");
ele.forEach((element) => {
  element.addEventListener("click", () => {
    document.getElementById("location").innerHTML = element.textContent;
    clicked.style.display = "none";
    var loc = element.textContent;
    if (loc == null || loc == "") {
      document.getElementById("temperature").innerHTML = "0°";
      document.getElementById("feelsLike").innerHTML = "Feels 0°";
    } else {
      getWeatherData(loc.toLowerCase());
    }
  });
});
