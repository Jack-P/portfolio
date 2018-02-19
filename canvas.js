

// BACKGROUND ANIMATION &  PAGE LOAD PREPARATIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


$(document).ready(function(){

  $('button.scrap').css("visibility", "hidden");
  $('.palette').css("visibility", "hidden");
  $('#color-wrap').hide();
  $('#radius').css("visibility", "hidden");

  var colors = ['#f4d35e', '#ee964b', '#0d3b66', '#faf0ca', '#f0d3f7', '#7e6b8f', '#8884ff','#2a324b', '#0d3b66','#ee964b', '#f0d3f7', '#7e6b8f', '#f15156'];

  for (var j = 0; j <= colors.length; j++) {
    var object = document.createElement('div');
    object.className = 'object';
    object.style.backgroundColor = colors[j];
    document.getElementById('animate-bg').appendChild(object);
  }

  anime({
    targets: '.object', // Targets the elements with class name of object
    translateX: function(el, index) { return anime.random(15, 100) + 'rem'; },
    scale: function(el, index) { return anime.random(1,2) / 2; },
    delay: function(el, index) { return anime.random(700,15000); },
    rotate: function(el, index) { return anime.random(-720,720); },
    duration: function(el, index) { return anime.random(5000,10000); },
    direction: 'alternate', // Makes the animation return
    loop: true // loops the animation
  });
});


$('a.button').click(function(){
  $(this).hide();
  setTimeout(function(){
    $('#color-wrap').fadeIn(300);
  }, 600);
  setTimeout(function(){
      $('button.scrap').css("visibility", "visible");
      $('button.scrap').addClass('scrapRotate');
  }, 1300);
  setTimeout(function(){
      $('#radius').addClass('radiusSlide');
      $('#radius').css("visibility", "visible");
  }, 1600);

})


$('button.scrap').click(function(){
  anime({
    targets: ['#open'],
    translateY: '60rem',
    easing: 'easeOutQuad',
    duration: 500,
    loop: false
  });
  setTimeout(function(){
  }, 500);
})


// ADDING A CANVAS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


document.getElementById('add').onclick = function() {

  var makeCanvas = document.createElement('canvas'); // Makes the canvas element
  var wrapper = document.getElementById('open');

  makeCanvas.id = "myCanvas"; // Give it an ID
  makeCanvas.width = wrapper.offsetWidth;
  makeCanvas.height = wrapper.offsetHeight;
  makeCanvas.style.cssText = 'background-color: #ffffff;';

  wrapper.appendChild(makeCanvas); // Appends the created canvas into a html wrapper


// DRAWING ON CANVAS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


   var canvas = document.getElementById('myCanvas');
   var ctx = canvas.getContext('2d');

   var radius = 15; // Width of the drawing brush
   var drag = false; // Used with up / down eventlistener to tell canvas when mouse is down or up

   ctx.lineWidth = radius*2; // increases the stroke line width to keep a constant flow

   var putPoint = function(e){
     if(drag){
       ctx.lineTo(e.offsetX, e.offsetY);
       ctx.stroke();
       ctx.beginPath();
       ctx.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
       ctx.fill();
       ctx.beginPath();
       ctx.moveTo(e.offsetX, e.offsetY);
     }
   }

   var mouseIsDown = function(e){ // Tells canvas mousedown is true
     drag = true;
     putPoint(e);
   }

   var mouseIsUp = function(){ // Tells canvas mousedown is false
     drag = false;
     ctx.beginPath(); // Ends the previous path and begins anew
   }

   canvas.addEventListener('mousedown', mouseIsDown);
   canvas.addEventListener('mouseup', mouseIsUp);
   canvas.addEventListener('mousemove', putPoint);



   // RADIUS CONTROL ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


   var setRadius = function(updateRadius){
     if(updateRadius < minRad ){
       updateRadius = minRad;
     }
     if(updateRadius > maxRad) {
       updateRadius = maxRad;
     }
     radius = updateRadius;
     ctx.lineWidth = radius*2;
     radSpan.innerHTML = radius; // Updates the number on screen to show current size
   }

   var minRad = null; // Min Size
   var maxRad = 50; // Max size
   var defaultRad = 15; // Default Size
   var interval = 5; // Interval of how much it'll increase / decrease by
   var radSpan = document.getElementById('radVal');
   var lowerRad = document.getElementById('lowerRadius');
   var addRad = document.getElementById('addRadius');

   lowerRad.addEventListener('click', function(){
     setRadius(radius-interval)
   });
   addRad.addEventListener('click', function(){
     setRadius(radius+interval)
   });


   // COLOUR PALETTE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


   var colors = ['#333333', '#888888', '#8884ff', '#f4d35e', '#ee964b', '#f15156', '#50ED65'];

   var makeColor = document.createElement('div'); // Makes a div
   makeColor.id = 'colour'; // Gives div an ID of colour
   document.getElementById('color-wrap').appendChild(makeColor); // Appends the div into the color-wrap div

    for (var i = 0; i < colors.length; i++) { // For loop to generate the color palettes into the HTML based on how many colours are present in the array
      var palette = document.createElement('div');
      palette.className = 'palette'; // Gives a class name
      palette.style.backgroundColor = colors[i];
      palette.addEventListener('click', setPalette);
      document.getElementById('colour').appendChild(palette);
    }

    function setColor(color){
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      var active = document.getElementsByClassName('active')[0]; // indexes it as part of the array
      if (active) {
        active.className = 'palette';
      }
    }

    function setPalette(e){
      var palettes = e.target;

      setColor(palettes.style.backgroundColor);

      palettes.className += ' active';
    }


    // CLEAR CANVAS AND ANIMATE IN ANOTHER  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    document.getElementById('scrap').onclick = function() {

      setTimeout(function(){
        var makeCanvas = document.createElement('canvas'); // Makes the canvas element
        var wrapper = document.getElementById('open');

        ctx.clearRect(0, 0, wrapper.offsetWidth, wrapper.offsetHeight);

        var canvasAni = anime({
            targets: ['#open'],
            translateX: '-1200px',
            duration: 1000,
            loop: false,
            direction: 'reverse'
          })
        }, 500);
    }


    // ANIMATIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    setTimeout(function(){
      var myAnimation = anime({
        targets: ['.palette'],
        translateX: '35rem',
        rotate: 360,
        delay: function(el, index) {
          return index * 200;
        },
        elasticity: 50,
        direction: 'reverse',
        borderRadius: 8,
        duration: 600,
        loop: false
      });
    }, 600);


    var canvasAni = anime({
      targets: ['#open'],
      translateX: '-1200px',
      duration: 1000,
      loop: false,
      direction: 'reverse'
    });

}
