
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
    url:"https://raw.githubusercontent.com/CCYChongyanChen/CCYChongyanChen.github.io/master/VizWizMTurk/static/QA_annotations/"+dataset[1]+"_randomized.json",
    dataType:'json',
    success:function(data){

        for (k=0;k<data.length;k++){
            if (data[k]["image"]==img_id){
                var Answers=data[k]["answers"]
                var question=data[k]["question"]
                }
        }


        document.getElementById("answer").innerHTML="Answer: "+Answers[0]
        document.getElementById("question").innerHTML="Question: "+question
    }
})


