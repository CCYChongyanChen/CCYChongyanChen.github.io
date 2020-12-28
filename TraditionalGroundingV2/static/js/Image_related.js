

var closeEnough=5;
// init canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener('mousemove', mouseMove, false);



//=======================basic============================================================
function mouseMove(e) {
    if (Step3Flag==true && (!$('#nodraw:checked').length>0)){
        canvas.style.cursor = "crosshair";
        var mousePos = getMousePos(canvas, e);
        if(finishFlags['finishFlag'+activate_tab]==false && XY_names['xy'+activate_tab].length>2 && checkCloseEnough(mousePos.x, XY_names['xy'+activate_tab][0].x) && checkCloseEnough(mousePos.y, XY_names['xy'+activate_tab][0].y)){
            draw_canvas(style="#791E94");
        }
        else{
            draw_canvas();
        }
    }
    else{
        canvas.style.cursor = "not-allowed";
    }
}

function drawCircle(ctx,x,y, radius) {
    ctx.fillStyle = "#111111";
    ctx.strokeStyle = "#ffffff";
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
    if (Step3Flag==false || $('#nodraw:checked').length>0){
        
    }
    else{
        if (finishFlags['finishFlag'+activate_tab]==false){
            var mousePos = getMousePos(canvas, evt);
            if(XY_names['xy'+activate_tab].length>2 && checkCloseEnough(mousePos.x, XY_names['xy'+activate_tab][0].x) && checkCloseEnough(mousePos.y, XY_names['xy'+activate_tab][0].y)){
                
                finishOne(canvas);
            }
            else{
                XY_names['xy'+activate_tab].push(mousePos);
                draw_canvas();
            }
            // smallRec(canvas,mousePos);
        }
    }

  }, false);


// draw line
function draw_canvas(style="#F0C132"){
    var ctx=canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.strokeStyle = style;
    var i;
    var Xycoo=XY_names['xy'+activate_tab];
    clearCanvas();
    ctx.beginPath();
    for (i=0;i<Xycoo.length;i++){
        
        if (i==0){
            ctx.moveTo(Xycoo[i].x,Xycoo[i].y);
        } else {
            ctx.lineTo(Xycoo[i].x,Xycoo[i].y);
        }
    }
    
    ctx.stroke();


    
    for (i=0;i<Xycoo.length;i++){
        drawCircle(ctx,Xycoo[i].x,Xycoo[i].y,closeEnough);
    }

    if (finishFlags['finishFlag'+activate_tab]==true){
        ctx.strokeStyle = "#F0C132";
        ctx.lineTo(XY_names['xy'+activate_tab][0].x,XY_names['xy'+activate_tab][0].y);
        ctx.closePath();
        ctx.stroke();
        // 
        // ctx.fillStyle="red";
        // ctx.fill();
        // ctx.globalAlpha=0.5;
    }




    }




//===========================================undo/delete/finish=======================================


// clear canvas. Remember to set finishFlag=False
function clearCanvas(){
    var context= canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}



// change xycoor, clear canvas, finishFlag=false, draw canvas according to xycoor
function UnDo(){
    if (XY_names['xy'+activate_tab].length>0){
        XY_names['xy'+activate_tab].pop();
        finishFlags['finishFlag'+activate_tab]=false;
        draw_canvas();
    }
    else {
        // XY_names['xy'+activate_tab].pop();
        // draw_canvas();
        // xyToStoredxy();
        DeleteAllThenInit();
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

// xycoordinate_names['xycoordinatesTAB'+i]={}; 
//used by button only
//xycoor should only be changed if finished or delete all 
function DeleteAllThenInit(){
    //delete xy, storedxy, n,canvas,button according to xycoord list
    XY_names['xy'+activate_tab]=[];
    // xyToStoredxy();
    clearCanvas();
    finishFlags['finishFlag'+activate_tab]=false;
}
    

function finishOne(){
    if (finishFlags['finishFlag'+activate_tab]==false){
        var ctx=canvas.getContext("2d");
        // if (XY_names['xy'+activate_tab].length<2){
        //     XY_names['xy'+activate_tab].pop();
        //     alert("your cannot finish for drawing less than 3 points");
        //     finishFlags['finishFlag'+activate_tab]=false; //not yet finished
        // }
        // else{
            ctx.strokeStyle = "#791E94";
            ctx.lineTo(XY_names['xy'+activate_tab][0].x,XY_names['xy'+activate_tab][0].y);
            ctx.closePath();
            ctx.stroke();
            // xyToStoredxy();
            finishFlags['finishFlag'+activate_tab]=true; //finished
        // };

    }
}

//========================================================================================
// function xyToStoredxy(){ 
//     document.getElementById("xycoorcommonAnswer").innerHTML=JSON.stringify(XY_names['xy'+activate_tab]);  
// }
