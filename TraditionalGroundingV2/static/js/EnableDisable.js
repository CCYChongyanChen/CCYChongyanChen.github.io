

function checkStep3(){
    Step3Flag=$('input[value=N]:checked').length>1;
    return ($('input[value=N]:checked').length>1);
}



$(EnableStep3());
$ ('input[type=radio]').click(function(){EnableStep3();});


function EnableStep3() {
if (checkStep3()==true) {
    $("input.Step3").removeAttr("disabled");
} else {
    $("input.Step3").attr("disabled", true);
}
}