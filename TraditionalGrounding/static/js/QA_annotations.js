
var searchParams = new URLSearchParams(window.location.search);
var input = searchParams.get("groupindex");
var dataset=input.split("_")[0]
var group_id=input.split("_")[1]
var answer_element=document.getElementById("Answers")
var task1forsubmit3=document.getElementById("task1forsubmit3")

$.ajax({
    type:'get',
    url:"https://raw.githubusercontent.com/CCYChongyanChen/CCYChongyanChen.github.io/master/TraditionalGrounding/static/QA_annotations/"+dataset+"_grouped.json",
    dataType:'json',
    success:function(data){
            for (j=0; j<5;j++){
                document.getElementById("answer"+(j+1)).innerHTML="Answer: "+data[group_id][j]["answers"][0];
                document.getElementById("question"+(j+1)).innerHTML="Question: "+data[group_id][j]["question"];

                }
}}
)


