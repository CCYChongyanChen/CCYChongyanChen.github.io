


function get_IOU(){     
    var list1=XY_names['xy'+activate_tab];
    var list2=gt_XY_names['xy'+activate_tab];
    var Data = JSON.stringify({gt:list1, ev:list2});
    postIOU=$.ajax({
        type:'POST',
        url:"http://ivc.ischool.utexas.edu:8898/getIOU",
        data:Data,
        async: false,
        contentType:"application/json; charset=utf-8",
        dataType:'json',
        success:function(response){
            var IOUscore=parseFloat(response).toFixed(2);
            // document.getElementsByClassName("testeva").innerHTML=IOUscore;
            qualifications["quali"+activate_tab]=IOUscore>0.6;
    }}
    )
}

