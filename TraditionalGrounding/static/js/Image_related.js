// var searchParams = new URLSearchParams(window.location.search);
// var imageURLvalue = "https://ivc.ischool.utexas.edu/VizWiz_visualization_img/"+searchParams.get("img1");
// document.getElementById("IMAGE").src=imageURLvalue;

var xycoordinates = [];
var xycoordinates2 = [];
var xycoordinates3 = [];
var xycoordinates4 = [];
var xycoordinates5 = [];
// var clickTimeId;
var newLineFlag=0;
// var magnifyFlag=false;
var finishFlag=false;
var finishFlag2=false;
var finishFlag3=false;
var finishFlag4=false;
var finishFlag5=false;

var closeEnough=5;
var answerID_p = document.getElementById('xycoorcommonAnswer');
// init canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener('mousemove', mouseMove, false);


var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas.getContext("2d");
canvas2.addEventListener('mousemove', mouseMove, false);


var canvas3 = document.getElementById("myCanvas3");
var ctx3 = canvas.getContext("2d");
canvas3.addEventListener('mousemove', mouseMove, false);


var canvas4 = document.getElementById("myCanvas4");
var ctx4 = canvas.getContext("2d");
canvas4.addEventListener('mousemove', mouseMove, false);



var canvas5 = document.getElementById("myCanvas5");
var ctx5 = canvas.getContext("2d");
canvas5.addEventListener('mousemove', mouseMove, false);
//   load static image to canvas
// var imagecanvas = document.getElementById("canvas");
// var imagectx = imagecanvas.getContext("2d");

// var imageObj = new Image();

// imageObj.onload = function() {
//   h_w=scaleimage(imageObj, imagecanvas);
//   imagectx.drawImage(imageObj, 0, 0, h_w.width,h_w.height);
// };
// imageObj.src = imageURLvalue;






//=======================basic============================================================
// draw a small rectangular

// function Mouseoutfunction(){
//     zoom.style.display = "none";
// }

// function writeMessage(canvas, message) {
//     var context = canvas.getContext('2d');
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.font = '18pt Calibri';
//     context.fillStyle = 'black';
//     context.fillText(message, 10, 25);
//   }


// function MouseMovefunction(e){
//     var zoom = document.getElementById("zoom");
//     var zoomCtx = zoom.getContext("2d");
//     var mousePos = getMousePos(canvas, e);
//     // zoomCtx.fillStyle = "white";
//     zoom.style.border="1px black solid";
//     zoom.style.boxShadow="5px 5px 10 px #1e1e1e";
//     zoomCtx.clearRect(0,0, zoom.width, zoom.height);
//     zoomCtx.fillStyle = "transparent";
//     zoomCtx.fillRect(0,0, zoom.width, zoom.height);
//     zoomCtx.drawImage(imagecanvas, mousePos.x, mousePos.y, 200, 100, 0,0, 400, 200);
//     zoom.style.top = e.pageY -900+ "px"
//     zoom.style.left = e.pageX - 200 + "px"
//     zoom.style.display = "block";
// }
function mouseMove(e) {
    canvas.style.cursor = "crosshair";
    canvas2.style.cursor = "crosshair";
    canvas3.style.cursor = "crosshair";
    canvas4.style.cursor = "crosshair";
    canvas5.style.cursor = "crosshair";
}

function drawCircle(ctx,x,y, radius) {
    ctx.fillStyle = "#111111";
    ctx.strokeStyle = "#ffffff"
    ctx.beginPath();
    ctx.arc(x,y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


function checkCloseEnough(p1, p2) {
    return Math.abs(p1 - p2) < closeEnough;
}

//====================================draw a path and draw canvas========================================
// click to draw path


canvas.addEventListener('click', function(evt) {
    // magnifyFlag=false;
    if (finishFlag==false){
    var mousePos = getMousePos(canvas, evt);
        if(xycoordinates.length>2 && checkCloseEnough(mousePos.x, xycoordinates[0].x) && checkCloseEnough(mousePos.y, xycoordinates[0].y)){
            finishOne(canvas, xycoordinates);
        }
        else{xycoordinates.push(mousePos);
        draw_canvas(canvas,xycoordinates);
        }
    // smallRec(canvas,mousePos);
    }
  }, false);

  canvas2.addEventListener('click', function(evt) {
    // magnifyFlag=false;
    if (finishFlag2==false){
    var mousePos = getMousePos(canvas2, evt);
        if(xycoordinates2.length>2 && checkCloseEnough(mousePos.x, xycoordinates2[0].x) && checkCloseEnough(mousePos.y, xycoordinates2[0].y)){
            finishOne(canvas2, xycoordinates2);
        }
        else{xycoordinates2.push(mousePos);
        draw_canvas(canvas2,xycoordinates2);
        }
    // smallRec(canvas,mousePos);
    }
  }, false);


  canvas3.addEventListener('click', function(evt) {
    // magnifyFlag=false;
    if (finishFlag3==false){
    var mousePos = getMousePos(canvas3, evt);
        if(xycoordinates3.length>2 && checkCloseEnough(mousePos.x, xycoordinates3[0].x) && checkCloseEnough(mousePos.y, xycoordinates3[0].y)){
            finishOne(canvas3, xycoordinates3);
        }
        else{xycoordinates3.push(mousePos);
        draw_canvas(canvas3,xycoordinates3);
        }
    // smallRec(canvas,mousePos);
    }
  }, false);
  canvas4.addEventListener('click', function(evt) {
    // magnifyFlag=false;
    if (finishFlag4==false){
    var mousePos = getMousePos(canvas4, evt);
        if(xycoordinates4.length>2 && checkCloseEnough(mousePos.x, xycoordinates4[0].x) && checkCloseEnough(mousePos.y, xycoordinates4[0].y)){
            finishOne(canvas4, xycoordinates4);
        }
        else{xycoordinates4.push(mousePos);
        draw_canvas(canvas4,xycoordinates4);
        }
    // smallRec(canvas,mousePos);
    }
  }, false);
  canvas5.addEventListener('click', function(evt) {
    // magnifyFlag=false;
    if (finishFlag5==false){
    var mousePos = getMousePos(canvas5, evt);
        if(xycoordinates5.length>2 && checkCloseEnough(mousePos.x, xycoordinates5[0].x) && checkCloseEnough(mousePos.y, xycoordinates5[0].y)){
            finishOne(canvas5, xycoordinates5);
        }
        else{xycoordinates5.push(mousePos);
        draw_canvas(canvas5,xycoordinates5);
        }
    // smallRec(canvas,mousePos);
    }
  }, false);

// draw line
function draw_canvas(canvas,xycoordinates){
    var ctx=canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#F0C132";
    var i;
    clearCanvas(canvas);
    ctx.beginPath();
    for (i=0;i<xycoordinates.length;i++){
        
        if (i==0){
            ctx.moveTo(xycoordinates[i].x,xycoordinates[i].y);
        } else {
            ctx.lineTo(xycoordinates[i].x,xycoordinates[i].y);
        }
    }
    
    ctx.stroke();
    // ctx.fillStyle="red";
    // ctx.fill();
    // ctx.globalAlpha=0.5;


    
    for (i=0;i<xycoordinates.length;i++){
        drawCircle(ctx,xycoordinates[i].x,xycoordinates[i].y,closeEnough);
    }
    }


//==============================================Scale/Magnify=============================

// function Magnify(){
//     if (magnifyFlag==false){

//         magnifyFlag=true;
//         canvas.addEventListener("mousemove", MouseMovefunction);
//         canvas.addEventListener("mouseout", Mouseoutfunction);}
//     else{magnifyFlag=false;
//         canvas.removeEventListener("mousemove",MouseMovefunction);
//         canvas.removeEventListener("mouseout",Mouseoutfunction);
//     }
// }

// // scale image
// function scaleimage (sourceimage, imagecanvas){
//     var wrh = sourceimage.width / sourceimage.height;
//     var newWidth = imagecanvas.width;
//     var newHeight = newWidth / wrh;
//     if (newHeight > imagecanvas.height) {
//         newHeight = imagecanvas.height;
//         newWidth = newHeight * wrh;
//     }
//     return {height: newHeight, width:newWidth};
    
// }






//===========================================undo/delete/finish=======================================


// clear canvas and set finishFlag=False
function clearCanvas(canvas){
    var context= canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    finishFlag=false;
}




// change xycoor, clear canvas, finishFlag=false, draw canvas according to xycoor
function UnDo(){
    if (xycoordinates.length>0){
        xycoordinates.pop();
        draw_canvas(canvas,xycoordinates);
    }
}




// Undo  using ctrl+z
//   Finish one label using ENTER
window.addEventListener("keydown", function(event){
    if (event.ctrlKey && event.key == 'z') {
        UnDo();
      }
    else if (event.keyCode == 13) {   
        finishOne(canvas, xycoordinates);
       }
   },false);




//used by button only
//xycoor should only be changed if finished or delete all 
function DeleteAllThenInit(){
    //delete xy, storedxy, n,canvas,button according to xycoord list
    xycoordinates=[];
    xyToStoredxy();
    clearCanvas(canvas);
}

function finishOne(canvas, xycoordinates){
    if (finishFlag==false){
        var ctx=canvas.getContext("2d");
        if (xycoordinates.length<2){
            xycoordinates.pop();
            alert("your cannot finish for drawing less than 3 points");
        }
        else{
            
            ctx.strokeStyle = "#F0C132";
            ctx.lineTo(xycoordinates[0].x,xycoordinates[0].y);
            ctx.closePath();
            ctx.stroke();
            finishFlag=true;
            xyToStoredxy();
        };

    }
}

//========================================================================================
function xyToStoredxy(){ 
    // alert(JSON.stringify(xycoordinates));
    document.getElementById('xycoorcommonAnswer').innerHTML=JSON.stringify(xycoordinates);  //xycorr->stored
  
}


