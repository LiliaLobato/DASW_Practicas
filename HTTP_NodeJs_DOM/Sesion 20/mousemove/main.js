let container = document.getElementById('container');
let circle = document.getElementById('circle');
let txtX = document.getElementById('txtX');
let txtY = document.getElementById('txtY');

container.addEventListener('mousemove', function(event) {
    txtX.value = event.clientX;
    txtY.value = event.clientY;

    circle.style.top = (event.clientY - (150/2)) + "px";
    circle.style.left = (event.clientX - (150/2)) + "px";
});