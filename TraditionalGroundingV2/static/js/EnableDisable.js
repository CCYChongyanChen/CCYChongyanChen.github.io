
//=============================================STEP3 ===========================================

$(ControlStep3());//initial: disable step3


$ ('input[type=radio]').click(function(){ControlStep3();ControlNext()});//2 'No' radios clicked or unclicked: enable step3


function checkStep3(){
    Step3Flag=$('input[value=N]:checked').length>1;
    return ($('input[value=N]:checked').length>1);
}


function ControlStep3() {
if (checkStep3()==true) {
    $("input.Step3").removeAttr("disabled");
} else {
    $("input.Step3").attr("disabled", true);
}
}

//===========================================CONTROL NEXT BUTTON================================
$('.image_wrap').click(function(){ControlNext()});
$('#nodraw').click(function(){ControlNext()});
function ControlNext(){
    if (($('input[value=Y]:checked').length>0 && $('input[type=radio]:checked').length>1) || $('#nodraw:checked').length>0 || finishFlags['finishFlag'+activate_tab]==true ){
        enableBtn('.btndiv.active > .btnNext');
        // enableBtn('ul.controlImg>li.active > a');
    }
    else{
        disableBtn('.btndiv.active > .btnNext');
        // disableBtn('ul.controlImg>li.active > a');
        
    }
}



$(disableBtn(".btnNext"));

function disableBtn(button) {
    $(button).attr("disabled", true);
    $(button).addClass("noHover");
}

function enableBtn(button) {
    $(button).removeAttr("disabled");
    $(button).removeClass("noHover");
}

