function ReportProblem() {
    var x = document.getElementById("ReportProblemDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

function PartialExpertiseChecked() {
    var Expertise = document.getElementById("EK2");
    var Partial = document.getElementById("EK3");
    var task4 = document.getElementById("task4");
    if (Expertise.checked == true || Partial.checked==true){
        task4.style.display = "block";
    } else {
        task4.style.display = "none";
    }
  }

function DisableOther_P(){
    
    if (document.getElementById("Perception").checked==true){
        document.getElementById("EK1").disabled=true;
        document.getElementById("EK2").disabled=true;
        document.getElementById("EK3").disabled=true;
        document.getElementById("NotSure").disabled=true;}
    else{
        
        document.getElementById("EK1").disabled=false;
        document.getElementById("EK2").disabled=false;
        document.getElementById("EK3").disabled=false;
        document.getElementById("NotSure").disabled=false;
    }
}
function DisableOther_NS(){
    if (document.getElementById("NotSure").checked==true){
        document.getElementById("EK1").disabled=true;
        document.getElementById("EK2").disabled=true;
        document.getElementById("EK3").disabled=true;
        document.getElementById("Perception").disabled=true;}
    else{
        
        document.getElementById("EK1").disabled=false;
        document.getElementById("EK2").disabled=false;
        document.getElementById("EK3").disabled=false;
        document.getElementById("Perception").disabled=false;
    }

}