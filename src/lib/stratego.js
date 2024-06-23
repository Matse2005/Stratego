/* 
  Takes a hex color and calculates if it should use black or white text
*/
const getTextColor = (backgroundColor) => {
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(backgroundColor);
  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 128 ? "white" : "black";
};

/*
  Generates a random hex color
*/
const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/*
  Will show a warning before leaving or reloading the page
*/
const leaveWarning = () => {
  const unloadCallback = (event) => {
    event.preventDefault();
    event.returnValue = "";
    return "";
  };

  window.addEventListener("beforeunload", unloadCallback);
  return () => window.removeEventListener("beforeunload", unloadCallback);
};

export { getRandomColor, getTextColor, leaveWarning };
