$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});

   //Background
   let circles = [];

   function setup() {
     let canvas = createCanvas(windowWidth, windowHeight);
     canvas.position(0, 0);
     canvas.style('z-index', '-1');
   
     for (let i = 0; i < 100; i++) {
       let circle = {
         x: random(width),
         y: random(height),
         vx: random(-0.3, 0.3),
         vy: random(-0.3, 0.3),
         radius: 10,
         color: color(50,116,50)
       };
       circles.push(circle);
     }
   }
   
   function draw() {
     background(20);
   
     for (let i = 0; i < circles.length; i++) {
       // Move the circle
       circles[i].x += circles[i].vx;
       circles[i].y += circles[i].vy;
       
       // Bounce off the edges
       if (circles[i].x - circles[i].radius < 0 || circles[i].x + circles[i].radius > width) {
         circles[i].vx *= -1;
         circles[i].x = constrain(circles[i].x, circles[i].radius, width - circles[i].radius);
       }
       if (circles[i].y - circles[i].radius < 0 || circles[i].y + circles[i].radius > height) {
         circles[i].vy *= -1;
         circles[i].y = constrain(circles[i].y, circles[i].radius, height - circles[i].radius);
       }
       
       // Draw the circle
       fill(circles[i].color);
       noStroke();
       ellipse(circles[i].x, circles[i].y, circles[i].radius, circles[i].radius);
       
       // Check for connections to other circles
       for (let j = i+1; j < circles.length; j++) {
         let d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
         
         if (d < circles[i].radius + circles[j].radius + width/20) {
           stroke(lerpColor(circles[i].color, circles[j].color, 0.5));
           line(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
         }
       }
     }
   }
   
   function mouseMoved() {
     for (let i = 0; i < circles.length; i++) {
       let d = dist(mouseX, mouseY, circles[i].x, circles[i].y);
       if (d < 100) {
         let angle = atan2(circles[i].y - mouseY, circles[i].x - mouseX);
         circles[i].x = circles[i].x + cos(angle) * 5;
         circles[i].y = circles[i].y + sin(angle) * 5;
       }
     }
   }
   


//let networkd3 = document.getElementById("chart-container");
//D3 Graph
var   w = 1000,
      h =  800,
      circleWidth = 5; 
 

var palette = {
      "lightgray": "#E5E8E8",
      "gray": "#708284",
      "mediumgray": "#536870",
      "blue": "#3B757F"
  }

var colors = d3.scale.category20();




var nodes = [
      { name: "Skills"},
      { name: "React", target: [0], value: 58 },
      { name: "Node.js", target: [0, 1], value: 65 },  
      { name: "MongoDB", target: [0, 1, 2], value: 52 },
      { name: "Mongoose.js", target: [0, 3], value: 48 }, 
      { name: "Chart.js", target: [0,3,4], value: 40 }, 
      { name: "Postman", target: [0,3,4,5], value: 36 },
      { name: "AdobeXD", target: [0, 1, 2], value: 52 },
      { name: "Adobe Premiere", target: [0, 1, 2, 8], value: 42 },
      { name: "Unity", target: [0,1,2], value: 35 },
      { name: "Wordpress", target: [0,1,2,3,9], value: 67 },
      { name: "Git", target: [0,1,2,3,4,5,6,7,8,10], value: 68 },
      { name: "iMovie", target: [0,1,2,7,8 ], value: 16 },
      { name: "XR", target: [0,1,2,7,8], value: 25 },
      { name: "Unreal", target: [0,1,2,3,4,5,6,7,8,9,10,11,12], value: 45 },
      { name: "Audacity", target: [0,1,2,7,8], value: 27 },
      { name: "QisKit", target: [0,1,2,12], value: 57 },
      { name: "Ableton", target: [0,9,10], value: 20 },
      { name: "P5js", target: [0,9,10], value: 37 },
];

var links = [];

for (var i = 0; i < nodes.length; i++){
      if (nodes[i].target !== undefined) { 
            for ( var x = 0; x < nodes[i].target.length; x++ ) 
              links.push({
                  source: nodes[i],
                  target: nodes[nodes[i].target[x]]  
              });
      };
};


let networkd3 = d3.select('#chart-container')
      .append("div")
        .classed("svg-container", true)
      
      .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1000 800")
        .classed("svg-content-responsive", true)


var force = d3.layout.force()
      .nodes(nodes)
      .links([])
      .gravity(0.1)
      .charge(-1000)
      .size([w,h]); 

      var link = networkd3.selectAll('line') 
            .data(links).enter().append('line')
            .attr('stroke', palette.lightgray)
            .attr('strokewidth', '1');

      var node =  networkd3.selectAll('circle')  
            .data(nodes).enter() 
            .append('g') 
            .call(force.drag); 

     
     node.append('circle')
            .attr('cx', function(d){return d.x; })
            .attr('cy', function(d){return d.y; })
            .attr('r', function(d,i){
                  //console.log(d.value);
                  if ( i > 0 ) {
                        return circleWidth + d.value; 
                  } else {
                        return circleWidth + 35; 
                  }
            })
            .attr('fill', function(d,i){
                  if ( i > 0 ) {
                        return colors(i);
                  } else {
                        return '#fff';
                  }
            })
            .attr('strokewidth', function(d,i){
                  if ( i > 0 ) {
                        return '0';
                  } else {
                        return '2';
                  }
            })
            .attr('stroke', function(d,i){
                  if ( i > 0 ) {
                        return '';
                  } else {
                        return 'black';
                  }
            });


      force.on('tick', function(e){ 
            node.attr('transform', function(d, i){
              return 'translate(' + d.x + ','+ d.y + ')'
            })

          link 
              .attr('x1', function(d){ return d.source.x; }) 
              .attr('y1', function(d){ return d.source.y; })
              .attr('x2', function(d){ return d.target.x; })
              .attr('y2', function(d){ return d.target.y; })
      });


      node.append('text')
            .text(function(d){ return d.name; })
            .attr('font-family', 'Arial', 'Helvetica', 'sans-serif')
            .attr('fill', function(d, i){
              //console.log(d.value);
                  if ( i > 0 && d.value < 10 ) {
                        return palette.mediumgray;
                  } else if ( i > 0 && d.value >10 ) {
                        return palette.lightgray;
                  } else {
                        return palette.blue;
                  }
            })
            .attr('text-anchor', function(d, i) {
                  return 'middle';
            })
            .attr('font-size', function(d, i){
                  if (i > 0) {
                        return '.8em';
                  } else {
                        return '.9em';    
                  }
            }) 

force.start();



//Radar Chart
////Radar Chart

let radar = document.getElementById("chartjs-radar")
window.chartColors = {
      red: "rgb(255, 99, 132)",
      orange: "rgb(255, 159, 64)",
      yellow: "rgb(255, 205, 86)",
      green: "rgb(75, 192, 192)",
      blue: "rgb(54, 162, 235)",
      purple: "rgb(153, 102, 255)",
      grey: "rgb(231,233,237)",
    };
    
    window.randomScalingFactor = function () {
      return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    };
    
    var randomScalingFactor = function () {
      return Math.round(Math.random() * 100);
    };
    
    var colorChart = Chart.helpers.color;
    var config = {
      type: "radar",
      data: {
        labels: ["PYTHON", "JAVA", "C++", "C", "JAVASCRIPT", "HTML/CSS"],
        datasets: [
          {
            backgroundColor: "rgba(153,102,255,0.2)",
            borderColor: window.chartColors.purple,
            pointBackgroundColor: window.chartColors.purple,
            data: [8, 7, 9.5, 9, 9.5, 9],
          },
        ],
      },
      options: {
        elements: {
          line: {
            borderWidth: 1
          }
        },
        legend: {
          display: false,
        },
        scale: {
          r: {
            angleLines: {
              color: 'red',
            },
            grid:{
              color: 'blue',
            },
          },
          pointLabels: {
            fontFamily: "Open Sans",
            fontSize: 14,
            fontColor: "#493f75",
            fontStyle: "bold",
          },
          ticks: {
            beginAtZero: true,
            display: false,
          },
        },
      },
    };
    
    window.onload = function () {
      window.myRadar = new Chart(document.getElementById("canvas"), config);
    };
    colorNames = Object.keys(window.chartColors);


// window.addEventListener('scroll', function() {
//   var navbar = document.getElementById('myNavbar');
//   if (window.scrollY > 50) {
//     nav.classList.remove('hidden');
//     nav.classList.add('visible');
//   } else {
//     nav.classList.remove('visible');
//     nav.classList.add('hidden');
//   }
// });

 
// Get the nav element
var nav = document.querySelector('nav');

// Get the initial scroll position
var scrollPos = window.scrollY;

// Add an event listener to the window for scroll events
window.addEventListener('scroll', function() {
  // Get the current scroll position
  var currentScrollPos = window.scrollY;

  // Check if current scroll position is greater than 50px
  if (currentScrollPos > 50) {
    // If the user scrolled up and the current scroll position is less than the initial scroll position, show the nav bar
    if (currentScrollPos < scrollPos) {
      nav.classList.remove('hidden');
      nav.classList.add('visible');
      nav.style.backgroundColor = 'rgba(0, 0, 0, 1)'; // Set the background color to full black
    }

    // If the user scrolled down and the current scroll position is greater than the initial scroll position, hide the nav bar
    else {
      nav.classList.remove('visible');
      nav.classList.add('hidden');
    }

    // Set the new scroll position
    scrollPos = currentScrollPos;
  }

  // If the current scroll position is less than 50px, show the nav bar back to how it was
  else {
    nav.classList.remove('hidden');
    nav.classList.add('visible');
    nav.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Set the background color to half black
  }


});
