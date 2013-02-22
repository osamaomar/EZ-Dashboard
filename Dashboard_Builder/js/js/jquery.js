 $(document).ready(function ()
   {

var API_KEY = 'AIzaSyBHdmGxfoKdVdKAb9hQJbqNJnlKYZ-Mwms';
var CLIENT_ID = '678812203795.apps.googleusercontent.com';
var TABLE_ID = 'ga:1174';

gadash.configKeys({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID
});


/* 
 * parameters: element: on which we apply the event
 *             type: the type of event to apply on the element
 *             callback: the function or the reference to the function
 *                       that is called once the event is completed
 */
var addEvent = function(element, type, callback){
   //for EI. "onclick", "onload", "onresize"
   if (element.attachEvent) {
        element.attachEvent("on" + type, callback);
      addEvent = function(element, type, callback){
         element.attachEvent("on" + type, callback);
      }
    }
    //for other browsers: juste "click", "load", "resize"
    else {
        element.addEventListener(type, callback, false);
      addEvent = function(element, type, callback){
         element.addEventListener(type, callback, false);
      }
    }
};


/* 
 * inverse function to remove an event
 * parameters: element: on which we apply the event
 *             type: the type of event to apply on the element
 *             callback: the function or the reference to the function
 *                       that is called once the event is completed
 */
 var removeEvent = function(element, type, callback){
   if (element.detachEvent) {
        element.detachEvent("on" + type, callback);
      removeEvent = function(element, type, callback){
         element.detachEvent("on" + type, callback);
      }
    }
    else {
        element.removeEventListener(type, callback, false);
      removeEvent = function(element, type, callback){
         element.removeEventListener(type, callback, false);
      }
    }
};



/* utility function
 * alias
 */
function tag_$(un_tag){
   return document.getElementsByTagName(un_tag);
};


/* utility function
 * alias
 */
function id_$(un_id){
   return document.getElementById(un_id);
};




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



     
 $("#btnClose").click(function (e)
      {
     HideDialog();
      });





      
 $("#btnAddLine").click(function (e)
      {
      var lineMetric = $("#lineMetrics").val();
      var lineCompare = $("#lineCompare").val();
      var lineFilter = $("#lineFilter").val();
      var widgetTitleLine = $("#widgetTitleLine").val();
      var linkURLline = $("#linkURLline").val(); 

         addLineChart(); 

         alert("works");
      });


 $("#add_area").click(function (e)
      {
      var lineMetric = $("#lineMetrics").val();
      var lineCompare = $("#lineCompare").val();
      var lineFilter = $("#lineFilter").val();
      var widgetTitleLine = $("#widgetTitleLine").val();
      var linkURLline = $("#linkURLline").val(); 

         addLineChart(); 
      });


 $("#add_bar").click(function (e)
      {
      var lineMetric = $("#lineMetrics").val();
      var lineCompare = $("#lineCompare").val();
      var lineFilter = $("#lineFilter").val();
      var widgetTitleLine = $("#widgetTitleLine").val();
      var linkURLline = $("#linkURLline").val(); 

         addLineChart(); 
      });


 $("#add_graph").click(function (e)
      {
      var lineMetric = $("#lineMetrics").val();
      var lineCompare = $("#lineCompare").val();
      var lineFilter = $("#lineFilter").val();
      var widgetTitleLine = $("#widgetTitleLine").val();
      var linkURLline = $("#linkURLline").val(); 

         addLineChart(); 
      });


 $("#add_pie").click(function (e)
      {
      var lineMetric = $("#lineMetrics").val();
      var lineCompare = $("#lineCompare").val();
      var lineFilter = $("#lineFilter").val();
      var widgetTitleLine = $("#widgetTitleLine").val();
      var linkURLline = $("#linkURLline").val(); 

         addLineChart(); 
      });

 /****************
 * for testing
 */
function addLineChart(){
    var ids = TABLE_ID;
    var div='wrappers1';
    var metrics='ga:visitors';
    var chart = new gadash.GaLineChart( div, ids, metrics,
                                            {'last-n-days': 5,
                                  'chartOptions':{
                                    'title':'Visits in USA'
                                   }
                                 }
                                        ).render();
};

 
// function addPieChart(){

// };


// function addAreaChart(){

// };


// function addBarChart(){

// };


// function addColumnChart(){

// };


// function setMenu(){
//    id_$('#menu').tabs();
// };


/*
 * Enable to launch or create several events
 */
function initialisation(){
   addEvent( id_$('btnAddLine'), 'click', addLineChart);
   // addEvent( id_$('btnAddPie'), 'click', addPieChart);
   // addEvent( id_$('btnAddArea'), 'click', addAreaChart);
   // addEvent( id_$('btnAddBar'), 'click', addBarChart);
   // addEvent( id_$('btnAddColumn'), 'click', addColumnChart);

};


/*
 * Create an event that launch the function initialisation when the window is loaded
 */
addEvent(window, 'load', initialisation);


});
