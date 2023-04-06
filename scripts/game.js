let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let canvasHeight = window.innerHeight - 175;
let canvasWidth = canvasHeight*(4/3);
canvas.height = canvasHeight;
canvas.width = canvasWidth;
canvas.style.height = canvasHeight;
canvas.style.width = canvasWidth;