
//=============================================STEP3 ===========================================

$( document ).ready(function() {
    // Handler for .ready() called.
    $(ControlStep3());//initial: disable step3
    $(ControlNext());
  });


$ ('input[type=radio]').click(function(){ControlStep3();ControlCanvas();ControlNext()});//2 'No' radios clicked or unclicked: enable step3


function checkStep3(){
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

    if ($('input[value=N]:checked').length>1 && $('#nodraw:checked').length==0){
        draw_canvas();
    }
    else{
        clearCanvas();
    }
}

//===========================================CONTROL NEXT BUTTON================================
$('.image_wrap').click(function(){ControlNext()});
$('#nodraw').click(function(){ControlNext();ControlCanvas()});

function DisableTab(){
    
    $(tabName).parent().addClass("disabled");
}

function ControlNext(){
    var activate_btnid=activate_tab.toLowerCase();
    var currenttabID=(parseInt(activate_tab.slice(-1)[0]));
    if (($('input[value=Y]:checked').length>0 && $('input[type=radio]:checked').length>1) || $('#nodraw:checked').length>0 || finishFlags['finishFlag'+activate_tab]==true ){
        
        enableBtn('#'+activate_btnid+' > .btnNext');
        finishStep123["finishStep123"+activate_tab]=true;
        var j =currenttabID;
        while(finishStep123["finishStep123TAB"+j]==true){
            $('#TAB'+j).parent().removeClass("disabled");
            j++;
        }
        
        enableBtn('#'+activate_btnid+' > .btnsubmit');
        
    }
    else{
        disableBtn('#'+activate_btnid+' >.btnNext');

        for (i = currenttabID; i < tabnumber+1; i++) {
            $('#TAB'+i).parent().addClass("disabled");
            
        }

        finishStep123["finishStep123"+activate_tab]=false;
        disableBtn('#'+activate_btnid+' > .btnsubmit');
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

