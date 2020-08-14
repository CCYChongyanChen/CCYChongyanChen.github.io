var searchParams = new URLSearchParams(window.location.search);
var imageURLvalue = "https://ivc.ischool.utexas.edu/VizWiz_visualization_img/"+searchParams.get("img1");
// document.getElementById("IMAGE").src=imageURLvalue;

var xycoordinates = [];
var clickTimeId;
var newLineFlag=0;
var n=1;//n ^th path
var magnifyFlag=false;
var task1=document.getElementById("task1forsubmit2")


// init canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//   load image to canvas
var imagecanvas = document.getElementById("canvas");
var imagectx = imagecanvas.getContext("2d");
var imageObj = new Image();
imageObj.onload = function() {
  h_w=scaleimage(imageObj, imagecanvas);
  imagectx.drawImage(imageObj, 0, 0, h_w.width,h_w.height);
};
imageObj.src = imageURLvalue;


//=======================basic============================================================
// draw a small rectangular


function Mouseoutfunction(){
    zoom.style.display = "none";
}
function smallRec(canvas,mousePos){
    var context_r = canvas.getContext('2d');
    context_r.fillRect(mousePos.x,mousePos.y,5,5);
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
//====================================draw a path and draw canvas========================================
// click to draw path
canvas.addEventListener('click', function(evt) {
    magnifyFlag=false;
    clearTimeout(clickTimeId);
    clickTimeId = setTimeout(function() {
        var mousePos = getMousePos(canvas, evt);
        if (n==xycoordinates.length){
            
            xycoordinates[n-1].push(mousePos);
            // var message = 'Mouse position: ' + mousePos.x+',' + mousePos.y;
            // writeMessage(canvas, message);
            draw_canvas(canvas);   
            smallRec(canvas,mousePos);
        }
        else if (n==xycoordinates.length+1){
            xycoordinates.push([]);
            xycoordinates[n-1].push(mousePos);
            // var message = 'Mouse position: ' + mousePos.x+',' + mousePos.y;
            // writeMessage(canvas, message);
            draw_canvas(canvas);   
            smallRec(canvas,mousePos);
        }
        else{alert("wrong, please report the problem to us")};
        // updatetask1();

      }, 250);
    
  }, false);
// draw line
function draw_canvas(canvas){
    var ctx=canvas.getContext("2d");
    var i;
    clearCanvas(canvas);
    var temp_message="";
    
    for (k=0;k<xycoordinates.length;k++){
        ctx.beginPath();
        for (i=0;i<xycoordinates[k].length;i++){
            if (i==0){
                ctx.moveTo(xycoordinates[k][i].x,xycoordinates[k][i].y);
            } else {
                ctx.lineTo(xycoordinates[k][i].x,xycoordinates[k][i].y);
            }
        }
        ctx.strokeStyle= "green";
        ctx.stroke();
        ctx.fillStyle="red";
        ctx.fill();
        ctx.globalAlpha=0.5;
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


function UnDo(){
    if (xycoordinates[xycoordinates.length-1].length>0){
        xycoordinates[xycoordinates.length-1].pop();
        draw_canvas(canvas);
    }
    else {
        xycoordinates.pop();
        n=xycoordinates.length;
        draw_canvas(canvas);
    }
}

// double click to finish one label
canvas.addEventListener('dblclick', function(evt) {
    clearTimeout(clickTimeId);
    finishOne();
  }, false);


  // Undo  using ctrl+z
//   Finish one label using ENTER
window.addEventListener("keydown", function(event){
    if (event.ctrlKey && event.key === 'z') {
        UnDo();
        // updatetask1();
      }
    else if (event.keyCode === 13) {   
        finishOne();
       }
   },false);



// clear canvas
function clearCanvas(canvas){
    var context= canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}


function DelteAllCanvas(){
    clearCanvas(canvas);
    xycoordinates=[];
    n=1;
    //placeholder
}
function finishOne(){
    var ctx=canvas.getContext("2d");
    if (xycoordinates[xycoordinates.length-1].length<2){
        xycoordinates.pop();
    }
    else{
        ctx.closePath();
        ctx.stroke();
        n=xycoordinates.length+1;};
    updatetask1();
}





//delete trash button
function ClickTrash(clicked_id){
    var trash=document.getElementById(clicked_id);
    var id=clicked_id.slice(5,6);
    var xycoors=document.getElementById("task1forsubmit").value;
    var obj=JSON.parse(xycoors);
    delete obj["label_"+id]
    // alert(c.length)
    // xycoordinates=xycoordinates.slice(parseInt(id),1)

    xycoordinates.splice(parseInt(id),1);
    draw_canvas(canvas);
    n=n-1;
    trash.remove();
    document.getElementById("task1forsubmit").value=JSON.stringify(obj);
    document.getElementById("task1forsubmit2").innerHTML=JSON.stringify(obj);
}

//=========================================================================================


function updatetask1(){
    var temptext=""
    var tempjson='{'
    for (k=0;k<xycoordinates.length;k++){
        temptext+="<br>"+k+"labels"
        tempjson+='"label_'+k.toString()+'":['
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        x.setAttribute("value", "");
        x.setAttribute("id","groundlabel"+k);

        task1.appendChild(x);
        for (i=0;i<xycoordinates[k].length;i++){
            temptext+="x:"+xycoordinates[k][i].x+"y:"+xycoordinates[k][i].y;
            tempjson+='{"x":' + xycoordinates[k][i].x +',"y":'+ xycoordinates[k][i].y+'},'
            } 
        tempjson=tempjson.substr(0,tempjson.length-1);
        tempjson+='],';
    }
    
    tempjson=tempjson.substr(0,tempjson.length-1);
    tempjson+='}'
    document.getElementById("task1forsubmit").value=tempjson;
    document.getElementById("task1forsubmit2").innerHTML=tempjson;
    // "you have labeled " + xycoordinates.length+" items<br>";

    selectareas=document.getElementById("selectareas");

    
    selectareas.querySelectorAll('*').forEach(n => n.remove());
    for (i=0;i<xycoordinates.length;i++){
        selectareas.insertAdjacentHTML('beforeend','<button class="btn" type="button" id="trash'+ i.toString() +'" onclick=ClickTrash(this.id)><i class="fa fa-trash"></i>'+(i+1).toString()+'</button>');
    }
    
     
    
}


