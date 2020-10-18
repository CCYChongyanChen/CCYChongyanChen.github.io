
var searchParams = new URLSearchParams(window.location.search);
var img_id = searchParams.get("img1");
var dataset=img_id.split("_")

$.ajax({
    type:'get',
    url:"https://raw.githubusercontent.com/CCYChongyanChen/CCYChongyanChen.github.io/master/VizWizMTurk/static/QA_annotations/"+dataset[1]+"_clean.json",
    dataType:'json',
    success:function(data){
        for (k=0;k<data.length;k++){
            if (data[k]["image"]==img_id){
                var question=data[k]["question"]
                }

        }


        document.getElementById("question").innerHTML=question
    }
})


