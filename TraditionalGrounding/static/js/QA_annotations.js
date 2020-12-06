
var searchParams = new URLSearchParams(window.location.search);
var input = searchParams.get("groupindex");
var dataset=input.split("_")[0]
var group_id=input.split("_")[1]
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
    url:"https://raw.githubusercontent.com/CCYChongyanChen/CCYChongyanChen.github.io/master/TraditionalGrounding/static/QA_annotations/"+dataset+"_grouped.json",
    dataType:'json',
    success:function(data){

        // for (k=0;k<data.length;k++){
            // if (data[k]["image"]==img_id){
                // var Answers=data[k]["answers"]
                // var question=data[k]["question"]
                // }
            var Answers=[]
            var questions=[]
            for (j=0; j<5;j++){
                Answers.push(data[group_id][j]["answers"][0]);
                questions.push(data[group_id][j]["question"]);
            }

        document.getElementById("answer1").innerHTML="Answer: "+Answers[0]
        document.getElementById("question1").innerHTML="Question: "+questions[0]
        // document.getElementById("answer2").innerHTML="Answer: "+Answers[1]
        // document.getElementById("question2").innerHTML="Question: "+questions[1]
        // document.getElementById("answer3").innerHTML="Answer: "+Answers[2]
        // document.getElementById("question3").innerHTML="Question: "+questions[2]
        // document.getElementById("answer4").innerHTML="Answer: "+Answers[3]
        // document.getElementById("question4").innerHTML="Question: "+questions[3]
        // document.getElementById("answer5").innerHTML="Answer: "+Answers[4]
        // document.getElementById("question5").innerHTML="Question: "+questions[4]
    }
})


