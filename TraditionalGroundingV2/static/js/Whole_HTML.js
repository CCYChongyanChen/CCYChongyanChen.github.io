
$(document).ready(function() {
 $('.btnNext').click(function(){

    $('.controlImg> .active').next('li').find('a').trigger('click');
  });
  
    $('.btnPrevious').click(function(){
    $('.controlImg > .active').prev('li').find('a').trigger('click');
  });



  $('.ExamplebtnNext').click(function(){
    $('.Examplenav-tabs > .active').next('li').find('a').trigger('click');
  });
  
  $('.ExamplebtnPrevious').click(function(){
    $('.Examplenav-tabs > .active').prev('li').find('a').trigger('click');
  });

  
  $('#hideDtl').click(function()
  {
      $('#dtlPane').collapse('hide');
  });

  // set cookie when details pane is hidden
  $('#dtlPane').on('hidden.bs.collapse', function ()
  {
      // as user has hidden details, set cookie to keep it hidden
      // so it never comes back within 30 mins
      var date = new Date(); var delay_mins = 60;
      date.setTime(date.getTime() + (delay_mins * 60 * 1000));
      document.cookie = "DtlHide=true; expires=" + date.toGMTString() + "; path=/";
  });


  // delete cookie when user clicks show details
  $('#showDtl').click(function()
  {
      $('#dtlPane').collapse('hide');
      // as user has shown details, delete cookie to keep it shown
      document.cookie = "DtlHide=true; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
  });


//   $("#example-basic").steps({
//     headerTag: "h3",
//     bodyTag: "section",
//     transitionEffect: "slideLeft",
//     autoFocus: true
// });


});





$('#submitbtn').click(function()
{
    ('#hiddenXY').val(XY_names);
    ("#hiddenAnswer").val(useranswer_names);

});