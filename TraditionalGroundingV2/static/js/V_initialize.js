// var init_time;
var activate_tab = "TAB1";
// var hitID = '';
// var assignmentID = '';
// var workerID = '';
var tabnumber=5;

var useranswer_names = {};
var XY_names = {};
var QA_names={};
var ele = document.getElementsByTagName('input'); 
var Step3Flag=false;
var searchParams = new URLSearchParams(window.location.search);
var input = searchParams.get("groupindex");
var dataset=input.split("_")[0]
var group_id=input.split("_")[1]
var finishFlags={};
var finishStep12={};
var finishStep123={};
finishFlags['finishFlagTAB'+i]=false;

for (var i =1; i < tabnumber+1; i++){
    XY_names['xyTAB'+i]=[]; 
    useranswer_names['useranswersTAB'+i]={};
    QA_names['qaTAB'+i]={};
    finishFlags['finishFlagTAB'+i]=true;
    finishStep12['finishStep12TAB'+i]=true;
    finishStep123['finishStep123TAB'+i]=true;
}


$(document).ready(function() {


    $('.btnNext').click(function(){
   
       $('.controlImg> .active').next('li').find('a').trigger('click');
     });
     
       $('.btnPrevious').click(function(){
       $('.controlImg > .active').prev('li').find('a').trigger('click');
     });

   
});
     
   
//PLEASE NOTICE THAT: tab is indexed from 1 while QA pais are indexed from 1


loadQApairs=$.ajax({
    type:'get',
    url:"https://raw.githubusercontent.com/CCYChongyanChen/CCYChongyanChen.github.io/master/TraditionalGroundingV2/static/QA_annotations/"+dataset+"_grouped.json",
    dataType:'json',
    success:function(data){
            for (j=1; j<tabnumber+1;j++){
                QA_names['qaTAB'+j]["Answer"]=data[group_id][j-1]["answers"][0];
                QA_names['qaTAB'+j]["Question"]=data[group_id][j-1]["question"];
                QA_names['qaTAB'+j]["Imgsrc"]="https://ivc.ischool.utexas.edu/VizWiz_visualization_img/"+data[group_id][j-1]["image"];

                }
                

}}
)
loadResults=$.ajax({
    type:'get',
    url:"https://raw.githubusercontent.com/CCYChongyanChen/CCYChongyanChen.github.io/master/TraditionalGroundingV2/results.json",
    dataType:'json',
    success:function(data){
        if (data[input]["Ready"]=="Yes"){  

                document.getElementById("usetime").innerHTML="HIT-ID: "+data[input]["UseTime"] ;
                document.getElementById("hitid").innerHTML="Consumed Time: "+data[input]["Hit_id"] ;
                document.getElementById("comment").innerHTML="Comment: "+data[input]["comments"] ;
                for (j=1; j<tabnumber+1;j++){  
                    useranswer_names['useranswersTAB'+j]=data[input]['useranswersTAB'+j];
                    XY_names['xyTAB'+j]=data[input]['xyTAB'+j];
                
                }

            }
                

}}
)

$.when(loadQApairs).done(function(){
    DisplayCurrentQApairs();
}

)

$.when(loadResults).done(function(){
    if (useranswer_names['useranswers'+activate_tab]["NoDraw"]=="Draw"){
        draw_canvas();
    }
    DisplayCurrentAnswers();
}

)



// Switch Tabs

function find_activated_tab(clicked_id)
{   
    
    activate_tab=clicked_id;
    ClearAll();
    DisplayCurrentAnswers();
    DisplayCurrentQApairs();
    
    if (useranswer_names['useranswers'+activate_tab]["NoDraw"]=="Draw"){
        draw_canvas();
    }
}


function DisplayCurrentQApairs(){
    document.getElementById("answer").innerHTML="Answer: "+  QA_names['qa'+activate_tab]["Answer"];
    document.getElementById("question").innerHTML="Question: "+QA_names['qa'+activate_tab]["Question"];
    document.getElementById("image").src=QA_names['qa'+activate_tab]["Imgsrc"];
    
}


function ClearAll() { 
    for(i = 0; i < ele.length; i++) { 
          
        if(ele[i].type=="radio" || ele[i].type=="checkbox") { 
            ele[i].checked=false;
        }
        

        else if(ele[i].type=="text") { 
            ele[i].value="";
            }

    } 
    clearCanvas();
}

function DisplayCurrentAnswers(){
    for(i = 0; i < ele.length; i++) { 

        if (useranswer_names['useranswers'+activate_tab][ele[i].name])
        {
            tmpvalue=useranswer_names['useranswers'+activate_tab][ele[i].name];
            if(ele[i].type=="radio") 
            { 
                if(tmpvalue=="Y" && ele[i].value=="Y"){
                    ele[i].checked=true;
                }
                
                else if(tmpvalue=="N" && ele[i].value=="N"){
                    ele[i].checked=true;
                }
            }
            else if (ele[i].type=="checkbox"){
                if(tmpvalue=="Draw" ||tmpvalue=="Not activated"){
                    ele[i].checked=false;
                }
                else{ele[i].checked=true;}
                
            }

            else if(ele[i].type=="text") { 
                ele[i].value=useranswer_names['useranswers'+activate_tab][ele[i].name] ;
                }

        }
    }

}


function next_href(){
    location.href='./visualization.html?groupindex='+ dataset+"_"+(parseInt(group_id)+1);
}
