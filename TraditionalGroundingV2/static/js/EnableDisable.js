
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
    var condition=(($('input[value=Y]:checked').length>0 && $('input[type=radio]:checked').length>1) || $('#nodraw:checked').length>0 || finishFlags['finishFlag'+activate_tab]==true)
    if (qualification_mode==false){
        if (condition==true){
            
            EnableNext(activate_btnid,currenttabID);}
        else{
            
            DisableNext(activate_btnid,currenttabID);
        }
    }
    else{
        
        $('#qualiFail').hide();
        $('#qualiPass').hide();
        if (condition==true){
            if (quali_Step12()){
                   
                EnableNext(activate_btnid,currenttabID);
            }
            else{
                DisableNext(activate_btnid,currenttabID);
            }
        }
        else{
            DisableNext(activate_btnid,currenttabID);
        }
    }

}
function quali_Step12(){
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].type=="radio") { 
            if(ele[i].checked) {
                if (gt_useranswer_names['useranswers'+activate_tab][ele[i].name] != ele[i].value){
                    
                    $("#TqualiFail").text("your answer for step 1 or step 2 is wrong");
                    $('#qualiFail').show();
                    return false;
                };
            }
        }

        if(ele[i].type=="checkbox") { 
            if ($('input[value=N]:checked').length!=2){//STEP 3-NOT ACTIVATED
                // if(gt_useranswer_names['useranswers'+activate_tab][ele[i].name] != 'Not activated'){
                    
                //     $("#TqualiFail").innerHTML="your answer for step 3 is wrong";
                //     $('#qualiFail').show();
                //     return false;
                // };
            }
            else {
                if(ele[i].checked) {
                    if (gt_useranswer_names['useranswers'+activate_tab][ele[i].name] != ele[i].value){
                        
                        $("#TqualiFail").text("your answer for step 3 is wrong");
                        $('#qualiFail').show();
                        return false;
                    };
                }

                else{
                    return quali_Step3();}

            } 
                
        }

    }
    
    $('#qualiFail').hide();
    return true 
}

function quali_Step3(){
    
    if ( finishFlags['finishFlag'+activate_tab]==true){
        check_IOU();
        if (qualifications["quali"+activate_tab]){
            $('#qualiFail').hide();
            $('#qualiPass').show();
            return true;
        }
        else{
            $('#qualiPass').hide();
            $("#TqualiFail").text("The grounding you draw for step 3 is wrong");
            $('#qualiFail').show();
            return false;
        };
    }
    return true;


}

function check_IOU(){
    if (qualification_mode==true){
        get_IOU();
    }
}

function checkQualification(){
    // console.log(activate_tab);
    // console.log(qualifications["quali"+activate_tab]);
    return qualifications["quali"+activate_tab]
}
function EnableNext(activate_btnid,currenttabID){
    
    enableBtn('#'+activate_btnid+' > .btnNext');
    finishStep123["finishStep123"+activate_tab]=true;
    var j =currenttabID;
    while(finishStep123["finishStep123TAB"+j]==true){
        $('#TAB'+j).parent().removeClass("disabled");
        j++;
    }
    
    enableBtn('#'+activate_btnid+' > .btnsubmit');
}
function DisableNext(activate_btnid,currenttabID){
    disableBtn('#'+activate_btnid+' >.btnNext');

    for (i = currenttabID; i < tabnumber+1; i++) {
        $('#TAB'+i).parent().addClass("disabled");
        
    }

    finishStep123["finishStep123"+activate_tab]=false;
    disableBtn('#'+activate_btnid+' > .btnsubmit');
}

function disableBtn(button) {
    $(button).attr("disabled", true);
    $(button).addClass("noHover");
}

function enableBtn(button) {
    $(button).removeAttr("disabled");
    $(button).removeClass("noHover");
}

