 $(document).ready(function ()
   {
$(".wrapperheader").hide();
      
$("#edit_chart1").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      });

 $("#edit_chart2").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      }); 


$("#edit_chart3").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      }); 

$("#edit_chart4").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      }); 

$("#edit_chart4").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      });

 $("#edit_chart5").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      });

 $("#edit_chart6").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      });
$("#wrappers1").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      }); 
$("#wrappers2").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      }); 
$("#wrappers3").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      }); 
$("#wrappers4").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      }); 
$("#wrappers5").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      }); 
$("#wrappers6").click(function (e)
      {
         ShowDialog(false);
         e.preventDefault();
      }); 


      
 $("#btnClose").click(function (e)
      {
         HideDialog();
         e.preventDefault();
      });
    

   });


   function ShowDialog(modal)
   {
      $("#overlay").show();
      $("#dialog").fadeIn(300);

      if (modal)
      {
         $("#overlay").unbind("click");
      }
      
   }

   function HideDialog()
   {
      $("#overlay").hide();
      $("#dialog").fadeOut(300);
   } 