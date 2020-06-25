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
    var task3 = document.getElementById("task3");
    if (Expertise.checked == true || Partial.checked==true){
        task3.style.display = "block";
    } else {
        task3.style.display = "none";
    }
  }