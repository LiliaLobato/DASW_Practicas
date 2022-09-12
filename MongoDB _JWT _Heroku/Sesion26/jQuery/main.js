/* Ejemplo 1 */
$(function(){
    $('#btn1').click(function() {
        $('p').slideUp();
    });

    $('#btn2').click(function() {
        $('p').slideDown();
    });

    $('#btn3').click(function() {
        $('p').html('Hola <b>mundo</b>!');
    });

    $('#btn4').click(function() {        
        var element = $('<li></li>').html('Elemento');
        $('#myList').append(element);
    });

    $('#btn5').click(function() {
        $('p').css("font-size", "20px");
        $('p').css({"background-color": "black", "color": "white"});
    });
})