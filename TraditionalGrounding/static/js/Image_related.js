var searchParams = new URLSearchParams(window.location.search);
var imageURLvalue = "https://ivc.ischool.utexas.edu/VizWiz_visualization_img/"+searchParams.get("img1");
// document.getElementById("IMAGE").src=imageURLvalue;

var xycoordinates = [];
var clickTimeId;
var newLineFlag=0;
var magnifyFlag=false;
var finishFlag=false;
var closeEnough=5;
var answerID_p = document.getElementById('xycoorcommonAnswer');
// init canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//   load static image to canvas
var imagecanvas = document.getElementById("canvas");
var imagectx = imagecanvas.getContext("2d");

var imageObj = new Image();



canvas.addEventListener('mousemove', mouseMove, false);

imageObj.onload = function() {
  h_w=scaleimage(imageObj, imagecanvas);
  imagectx.drawImage(imageObj, 0, 0, h_w.width,h_w.height);
};
imageObj.src = imageURLvalue;


//=======================basic============================================================
// draw a small rectangular


function mouseMove(e) {
    canvas.style.cursor = "crosshair";
}
function Mouseoutfunction(){
    zoom.style.display = "none";
}

function drawCircle(ctx,x,y, radius) {
    ctx.fillStyle = "#111111";
    ctx.strokeStyle = "#ffffff"
    ctx.beginPath();
    ctx.arc(x,y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
  }
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function MouseMovefunction(e){
    var zoom = document.getElementById("zoom");
    var zoomCtx = zoom.getContext("2d");
    var mousePos = getMousePos(canvas, e);
    // zoomCtx.fillStyle = "white";
    zoom.style.border="1px black solid";
    zoom.style.boxShadow="5px 5px 10 px #1e1e1e";
    zoomCtx.clearRect(0,0, zoom.width, zoom.height);
    zoomCtx.fillStyle = "transparent";
    zoomCtx.fillRect(0,0, zoom.width, zoom.height);
    zoomCtx.drawImage(imagecanvas, mousePos.x, mousePos.y, 200, 100, 0,0, 400, 200);
    zoom.style.top = e.pageY -900+ "px"
    zoom.style.left = e.pageX - 200 + "px"
    zoom.style.display = "block";
}


function checkCloseEnough(p1, p2) {
    return Math.abs(p1 - p2) < closeEnough;
}

//====================================draw a path and draw canvas========================================
// click to draw path
canvas.addEventListener('click', function(evt) {
    magnifyFlag=false;
    clearTimeout(clickTimeId);
    clickTimeId = setTimeout(function() {
        if (finishFlag==false){
        var mousePos = getMousePos(canvas, evt);
            if(xycoordinates.length>2 && checkCloseEnough(mousePos.x, xycoordinates[0].x) && checkCloseEnough(mousePos.y, xycoordinates[0].y)){

                finishOne();
            }
            else{xycoordinates.push(mousePos);
            draw_canvas(canvas);
            }
        // smallRec(canvas,mousePos);
        }
      }, 250);
    
  }, false);

// draw line
function draw_canvas(canvas){
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

function Magnify(){
    if (magnifyFlag==false){

        magnifyFlag=true;
        canvas.addEventListener("mousemove", MouseMovefunction);
        canvas.addEventListener("mouseout", Mouseoutfunction);}
    else{magnifyFlag=false;
        canvas.removeEventListener("mousemove",MouseMovefunction);
        canvas.removeEventListener("mouseout",Mouseoutfunction);
    }
}

// scale image
function scaleimage (sourceimage, imagecanvas){
    var wrh = sourceimage.width / sourceimage.height;
    var newWidth = imagecanvas.width;
    var newHeight = newWidth / wrh;
    if (newHeight > imagecanvas.height) {
        newHeight = imagecanvas.height;
        newWidth = newHeight * wrh;
    }
    return {height: newHeight, width:newWidth};
    
}






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
        draw_canvas(canvas);
    }
}




// Undo  using ctrl+z
//   Finish one label using ENTER
window.addEventListener("keydown", function(event){
    if (event.ctrlKey && event.key == 'z') {
        UnDo();
      }
    else if (event.keyCode == 13) {   
        finishOne();
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

function finishOne(){
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


