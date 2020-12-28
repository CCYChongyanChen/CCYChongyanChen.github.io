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
finishFlags['finishFlagTAB'+i]=false;

for (var i =1; i < tabnumber+1; i++){
    XY_names['xyTAB'+i]=[]; 
    useranswer_names['useranswersTAB'+i]={};
    QA_names['qaTAB'+i]={};
    finishFlags['finishFlagTAB'+i]=false;
    finishStep12['finishStep12TAB'+i]=false;
}


//PLEASE NOTICE THAT: tab is indexed from 1 while QA pais are indexed from 1


loadQApairs=$.ajax({
    type:'get',
    url:"https://raw.githubusercontent.com/CCYChongyanChen/CCYChongyanChen.github.io/master/TraditionalGrounding/static/QA_annotations/"+dataset+"_grouped.json",
    dataType:'json',
    success:function(data){
            for (j=1; j<tabnumber+1;j++){
                QA_names['qaTAB'+j]["Answer"]=data[group_id][j-1]["answers"][0];
                QA_names['qaTAB'+j]["Question"]=data[group_id][j-1]["question"];
                QA_names['qaTAB'+j]["Imgsrc"]="https://ivc.ischool.utexas.edu/VizWiz_visualization_img/"+data[group_id][j-1]["image"];

                }
                

}}
)


$.when(loadQApairs).done(function(){
    DisplayCurrentQApairs();
}

)



// Switch Tabs

function find_activated_tab(clicked_id)
{   
    
    StorePreviousAnswers();
    activate_tab=clicked_id;
    ClearAll();
    draw_canvas();
    DisplayCurrentAnswers();
    DisplayCurrentQApairs();
    ControlStep3();
    // console.log(QA_names);
}


function DisplayCurrentQApairs(){
    document.getElementById("answer").innerHTML="Answer: "+  QA_names['qa'+activate_tab]["Answer"];
    document.getElementById("question").innerHTML="Question: "+QA_names['qa'+activate_tab]["Question"];
    document.getElementById("image").src=QA_names['qa'+activate_tab]["Imgsrc"];
    
}


function StorePreviousAnswers() { 
    for(i = 0; i < ele.length; i++) { 
          
        if(ele[i].type=="radio") { 
          
            if(ele[i].checked) {
                //storing answers
                // Example: 
                // useranswer_names['useranswersTAB1']['MULTI_FOCUS_DETECT']='N'
                useranswer_names['useranswers'+activate_tab][ele[i].name] = ele[i].value;
            }
        }

        if(ele[i].type=="checkbox") { 
            if(ele[i].checked) {
                useranswer_names['useranswers'+activate_tab][ele[i].name] = ele[i].value;
            }
            else{
                useranswer_names['useranswers'+activate_tab][ele[i].name] = 'Draw';
            }
        }
        else if(ele[i].type=="text") { 
            useranswer_names['useranswers'+activate_tab][ele[i].name]  = ele[i].value;
            }

    } 
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
                if(tmpvalue=="Draw"){
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



