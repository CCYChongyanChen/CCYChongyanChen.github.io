var searchParams = new URLSearchParams(window.location.search);
var img_id = searchParams.get("img1");
var dataset=img_id.split("_")
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
    url:"https://raw.githubusercontent.com/CCYChongyanChen/CCYChongyanChen.github.io/master/VizWizMTurk/static/QA_annotations/"+dataset[1]+".json",
    dataType:'json',
    success:function(data){
        var only_answers=""
        var question=(data[parseInt(dataset[2])]["question"])
        var Answers=(data[parseInt(dataset[2])].answers)
        var temp_answers=[]
        for (k=0;k<10;k++){
            temp_answers.push(Answers[k].answer)}
        var UniqAnswer=getUnique(temp_answers)
        for (i=0;i<UniqAnswer.length;i++){
            only_answers+=(i+"."+UniqAnswer[i]+"<br>")}
        document.getElementById("question").innerHTML=question
        document.getElementById("answers").innerHTML=only_answers
    }
})


