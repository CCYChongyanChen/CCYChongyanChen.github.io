
var activate_tab="TAB1";
var xycoordinates = [];
var xycoordinates2 = [];
var xycoordinates3 = [];
var xycoordinates4 = [];
var xycoordinates5 = [];
var finishFlag=false;
var finishFlag2=false;
var finishFlag3=false;
var finishFlag4=false;
var finishFlag5=false;

var closeEnough=5;
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








//=======================basic============================================================
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
            finishFlag=finishOne(canvas, xycoordinates, finishFlag);
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
            finishFlag2=finishOne(canvas2, xycoordinates2, finishFlag2);
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
            finishFlag3=finishOne(canvas3, xycoordinates3, finishFlag3);
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
            finishFlag4=finishOne(canvas4, xycoordinates4, finishFlag4);
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
            finishFlag5=finishOne(canvas5, xycoordinates5, finishFlag5);
        }
        else{xycoordinates5.push(mousePos);
        draw_canvas(canvas5,xycoordinates5);
        }
    // smallRec(canvas,mousePos);
    }
  }, false);

// draw line
function draw_canvas(Canvas,Xycoo){
    var ctx=Canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#F0C132";
    var i;
    clearCanvas(Canvas);
    ctx.beginPath();
    for (i=0;i<Xycoo.length;i++){
        
        if (i==0){
            ctx.moveTo(Xycoo[i].x,Xycoo[i].y);
        } else {
            ctx.lineTo(Xycoo[i].x,Xycoo[i].y);
        }
    }
    
    ctx.stroke();
    // ctx.fillStyle="red";
    // ctx.fill();
    // ctx.globalAlpha=0.5;


    
    for (i=0;i<Xycoo.length;i++){
        drawCircle(ctx,Xycoo[i].x,Xycoo[i].y,closeEnough);
    }
    }





//===========================================undo/delete/finish=======================================


// clear canvas and set finishFlag=False
function clearCanvas(Canvas){
    var context= Canvas.getContext('2d');
    context.clearRect(0, 0, Canvas.width, Canvas.height);
    return false;
}


function THIS(){
    if (activate_tab=="TAB1"){
        return canvas, xycoordinates
    }
    if (activate_tab=="TAB2"){
        return canvas2, xycoordinates2
    }
    if (activate_tab=="TAB3"){
        return canvas3, xycoordinates3
    }
    if (activate_tab=="TAB4"){
        return canvas4, xycoordinates4
    }
    if (activate_tab=="TAB5"){
        return canvas5, xycoordinates5
    }
}

// change xycoor, clear canvas, finishFlag=false, draw canvas according to xycoor
function UnDo(){
    if (activate_tab=="TAB1"){
        if (xycoordinates.length>0){
            xycoordinates.pop();
            draw_canvas(canvas,xycoordinates);
            finishFlag=false;
        }
        else {
            xycoordinates.pop();
            draw_canvas(canvas,xycoordinates);
            xyToStoredxy()
        }
    }
    if (activate_tab=="TAB2"){
        if (xycoordinates2.length>0){
            xycoordinates2.pop();
            draw_canvas(canvas2,xycoordinates2);
            finishFlag2=false;
        }
        else {
            xycoordinates2.pop();
            draw_canvas(canvas2,xycoordinates2);
            xyToStoredxy()
        }
    }
    if (activate_tab=="TAB3"){
        if (xycoordinates3.length>0){
            xycoordinates3.pop();
            draw_canvas(canvas3,xycoordinates3);
            finishFlag3=false;
        }
        else {
            xycoordinates3.pop();
            draw_canvas(canvas3,xycoordinates3);
            xyToStoredxy()
        }
    }
    if (activate_tab=="TAB4"){
        if (xycoordinates4.length>0){
            xycoordinates4.pop();
            draw_canvas(canvas4,xycoordinates4);
            finishFlag4=false;
        }
        else {
            xycoordinates4.pop();
            draw_canvas(canvas4,xycoordinates4);
            xyToStoredxy()
        }
    }
    if (activate_tab=="TAB5"){
        if (xycoordinates5.length>0){
            xycoordinates5.pop();
            draw_canvas(canvas5,xycoordinates5);
            finishFlag5=false;
        }
        else {
            xycoordinates5.pop();
            draw_canvas(canvas5,xycoordinates5);
            xyToStoredxy()
        }
    }



}


var currentflag=false;

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



function reply_click(clicked_id)
{   activate_tab=clicked_id;
    if (clicked_id=="TAB1"){
        currentflag=finishFlag;
    }
    if (clicked_id=="TAB2"){
        currentflag=finishFlag2;}
    if (clicked_id=="TAB3"){
        currentflag=finishFlag3;
    }
    if (clicked_id=="TAB4"){
        currentflag=finishFlag4;}
    if (clicked_id=="TAB5"){
        currentflag=finishFlag5;}
    // alert(activate_tab);
}
//used by button only
//xycoor should only be changed if finished or delete all 
function DeleteAllThenInit(i){
    //delete xy, storedxy, n,canvas,button according to xycoord list
    if (i==1){xycoordinates=[];
        xyToStoredxy();
        finishFlag=clearCanvas(canvas);}
    if (i==2){xycoordinates2=[];
        xyToStoredxy();
        finishFlag2=clearCanvas(canvas2);}
    if (i==3){xycoordinates3=[];
        xyToStoredxy();
        finishFlag3=clearCanvas(canvas3);}
    if (i==4){xycoordinates4=[];
        xyToStoredxy();
        finishFlag4=clearCanvas(canvas4);}
    if (i==5){xycoordinates5=[];
        xyToStoredxy();
        finishFlag5=clearCanvas(canvas5);}
}

function finishOne(canvas, xycoo,fFlag){
    if (fFlag==false){
        var ctx=canvas.getContext("2d");
        if (xycoo.length<2){
            xycoo.pop();
            alert("your cannot finish for drawing less than 3 points");
            return false;
        }
    else{
        ctx.strokeStyle = "#F0C132";
        ctx.lineTo(xycoo[0].x,xycoo[0].y);
        ctx.closePath();
        ctx.stroke();
        
        xyToStoredxy();
        return true;
    };

    }
}

//========================================================================================
function xyToStoredxy(){ 
    // alert(JSON.stringify(xycoordinates));
    document.getElementById("xycoorcommonAnswer").innerHTML=JSON.stringify(xycoordinates);  //xycorr->stored
    document.getElementById("xycoorcommonAnswer2").innerHTML=JSON.stringify(xycoordinates2);
    document.getElementById("xycoorcommonAnswer3").innerHTML=JSON.stringify(xycoordinates3);
    document.getElementById("xycoorcommonAnswer4").innerHTML=JSON.stringify(xycoordinates4);
    document.getElementById("xycoorcommonAnswer5").innerHTML=JSON.stringify(xycoordinates5);
}


