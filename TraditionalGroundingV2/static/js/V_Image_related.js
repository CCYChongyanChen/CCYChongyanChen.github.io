

var closeEnough=5;
var UpdateCloseEnough=false;
// init canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");



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




// draw line
function draw_canvas(style="#F0C132"){
    var ctx=canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.strokeStyle = style;
    var i;
    var Xycoo=XY_names['xy'+activate_tab];
    
    console.log(XY_names);
    console.log(Xycoo);
    console.log(activate_tab);
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


    

function finishOne(){
    if (finishFlags['finishFlag'+activate_tab]==false){
            var ctx=canvas.getContext("2d");
            XY_names['xy'+activate_tab].push(XY_names['xy'+activate_tab][0]);
            ctx.strokeStyle = "#791E94";
            ctx.lineTo(XY_names['xy'+activate_tab][0].x,XY_names['xy'+activate_tab][0].y);
            ctx.closePath();
            ctx.stroke();
            // xyToStoredxy();
            finishFlags['finishFlag'+activate_tab]=true; //finished
        // };

    }
}
