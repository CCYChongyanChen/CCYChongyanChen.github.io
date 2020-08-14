
var searchParams = new URLSearchParams(window.location.search);
var img_id = searchParams.get("img1");
var dataset=img_id.split("_")
var answer_element=document.getElementById("Answers")
var task1forsubmit3=document.getElementById("task1forsubmit3")
function getUnique(array){
    var uniqueArray = [];
    // Loop through array values
    for(var value of array){
        if(uniqueArray.indexOf(value) === -1){
            uniqueArray.push(value);
        }
    }
    return uniqueArray;
}

$.ajax({
    type:'get',
    url:"https://raw.githubusercontent.com/CCYChongyanChen/CCYChongyanChen.github.io/master/VizWizMTurk/static/QA_annotations/"+dataset[1]+"_clean.json",
    dataType:'json',
    success:function(data){

        for (k=0;k<data.length;k++){
            if (data[k]["image"]==img_id){
                var Answers=data[k]["answers"]
                var question=data[k]["question"]
                for (j=0;j<Answers.length;j++){
                    if (j==0){
                        answer_element.insertAdjacentHTML('beforeend','<button class="btn active" type="button" id=answer'+j.toString()+'>'+Answers[j]+'</button>')
                    }
                    else{
                    answer_element.insertAdjacentHTML('beforeend','<button class="btn" type="button" id=answer'+j.toString()+'>'+Answers[j]+'</button>')
                    }
                    task1forsubmit3.insertAdjacentHTML('beforeend','<p id=xycoor'+j.toString()+'></p>')


                }
                }

        }

        var answers=document.getElementById("Answers")
        var btns =answers.getElementsByTagName("button")
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            var whichbutton=this.id.slice(0,6);
            if (whichbutton=="answer"){
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
                document.getElementById("answerID").innerHTML=this.id.slice(6,7);
                
            }
            
            });
        }


        document.getElementById("question").innerHTML=question
    }
})


