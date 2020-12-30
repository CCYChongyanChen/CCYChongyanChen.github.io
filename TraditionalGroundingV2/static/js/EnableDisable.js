
//=============================================STEP3 ===========================================

$( document ).ready(function() {
    // Handler for .ready() called.
    $(ControlStep3());//initial: disable step3
    $(disableBtn(".btnNext"));
    $(disableBtn(".btnsubmit"));
  });


$ ('input[type=radio]').click(function(){ControlStep3();ControlCanvas();ControlNext()});//2 'No' radios clicked or unclicked: enable step3


function checkStep3(){
    Step3Flag=$('input[value=N]:checked').length>1;
    return ($('input[value=N]:checked').length>1);
}


function ControlStep3() {
if (checkStep3()==true) {
    $("input.Step3").removeAttr("disabled");
    $("div.step3").removeClass("noHover");

} else {
    $("input.Step3").attr("disabled", true);
    $("div.step3").addClass("noHover");
}
}

function ControlCanvas(){
    if (Step3Flag==true && $('#nodraw:checked').length==0){
        draw_canvas();
    }
    else{
        clearCanvas();
    }
}

//===========================================CONTROL NEXT BUTTON================================
$('.image_wrap').click(function(){ControlNext()});
$('#nodraw').click(function(){ControlNext();ControlCanvas()});
function ControlNext(){
    if (($('input[value=Y]:checked').length>0 && $('input[type=radio]:checked').length>1) || $('#nodraw:checked').length>0 || finishFlags['finishFlag'+activate_tab]==true ){
        enableBtn('.btndiv.active > .btnNext');
        enableBtn('.btndiv.active > .btnsubmit');
    }
    else{
        
        disableBtn('.btndiv.active > .btnNext');
        disableBtn('.btndiv.active > .btnsubmit');
        
    }
}



function disableBtn(button) {
    $(button).attr("disabled", true);
    $(button).addClass("noHover");
}

function enableBtn(button) {
    $(button).removeAttr("disabled");
    $(button).removeClass("noHover");
}

