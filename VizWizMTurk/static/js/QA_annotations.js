var searchParams = new URLSearchParams(window.location.search);
var img_id = searchParams.get("img1");
var dataset=img_id.split("_")


$.ajax({
    type:'get',
    url:"https://raw.githubusercontent.com/CCYChongyanChen/CCYChongyanChen.github.io/master/VizWizMTurk/static/QA_annotations/"+dataset[1]+".json",
    dataType:'json',
    success:function(data){
        var only_answers="Answers:<br>"
        var question=("Question:"+data[parseInt(dataset[2])]["question"])
        var Answers=(data[parseInt(dataset[2])].answers)
        
        for (k=0;k<10;k++){
            only_answers+=(k+"."+Answers[k].answer+"<br>")}
        document.getElementById("question").innerHTML=question
        document.getElementById("answers").innerHTML=only_answers
    }
})

