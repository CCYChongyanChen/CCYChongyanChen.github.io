$( function() {
    $("#left_arrow").click( function() {
        var imageid=parseInt(document.getElementById("imageId").value);
        imageid--;
        changeid(imageid);
       });

    $("#right_arrow").click( function() {
        var imageid=parseInt(document.getElementById("imageId").value);
        imageid++;
        changeid(imageid);
        return true;
    });
    function changeid(imageid){
        var imageid_string=padding(imageid.toString(),8);
        document.getElementById("imageId").value=imageid_string;
    }
    function padding(num, length) {
        for(var len = (num + "").length; len < length; len = num.length) {
            num = "0" + num;            
        }
        return num;
    }


});