$(document).ready(function () {

  var API_KEY = 'AIzaSyBHdmGxfoKdVdKAb9hQJbqNJnlKYZ-Mwms';
  var CLIENT_ID = '678812203795.apps.googleusercontent.com';
  var TABLE_ID = 'ga:1174';

  //Global variables
  var chartLocation = "";
  var last_n_days = 20; //Will not be used
  var start_date = gadash.util.lastNdays(30);  // will be overridden by the date picker. Maybe use lastNmonth(1)
  var end_date = gadash.util.lastNdays(0);     // return foramt "YYYY-MM-DD";

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
  
  $("#wrappers1").click(function (e) {
     chartLocation = "wrappers1";
     ShowDialog(false);
     e.preventDefault();
  }); 

  $("#wrappers2").click(function (e) {
     chartLocation = "wrappers2";
     ShowDialog(false);
     e.preventDefault();
  }); 

  $("#wrappers3").click(function (e) {
     chartLocation = "wrappers3";
     ShowDialog(false);
     e.preventDefault();
  });

  $("#wrappers4").click(function (e) {
     chartLocation = "wrappers4";
     ShowDialog(false);
     e.preventDefault();
  });

  $("#wrappers5").click(function (e) {
     chartLocation = "wrappers5";
     ShowDialog(false);
     e.preventDefault();
  });

  $("#wrappers6").click(function (e) {
     chartLocation = "wrappers6";
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

      
 $("#btnAddLine").click(function (e) {
      var lineMetric = $("#lineMetrics").val();
      var lineCompare = $("#lineCompare").val();
      var lineFilter = $("#lineFilter").val();
      var widgetTitleLine = $("#widgetTitleLine").val();
    
      var metrics = getMetrics( lineMetric, lineCompare);
      addLineChart(metrics, widgetTitleLine); 
 });


 $("#btnAddArea").click(function (e) {
     var areaMetric = $("#areaMetrics").val();
     var areaCompare = $("#areaCompare").val();
     var areaFilter = $("#areaFilter").val();
     var widgetTitleArea = $("#widgetTitleArea").val();

     var metrics = getMetrics( areaMetric, areaCompare);
     addAreaChart( metrics, widgetTitleArea); 
 });


 $("#btnAddPie").click(function (e) {
     var pieMetric = $("#pieMetrics").val();
     var pieDimension = $("#pieGroupBy").val();
     var pieFilter = $("#pieFilter").val();
     var widgetTitlePie = $("#widgetTitlePie").val();

     addPieChart( pieMetric, pieDimension, widgetTitlePie); 
  });


 $("#btnAddBar").click(function (e) {
      var barMetric = $("#barMetrics").val();
      var barCompare = $("#barCompare").val();
      var barFilter = $("#barFilter").val();
      var widgetTitleBar = $("#widgetTitleBar").val();

     addBarChart( barMetric, widgetTitleBar); 
  });


 $("#btnAddColumn").click(function (e) {
      var columnMetric = $("#columnMetrics").val();
      var columnCompare = $("#columnCompare").val();
      var columnFilter = $("#columnFilter").val();
      var widgetTitleColumn = $("#widgetTitleColumn").val();

     addColumnChart( columnMetric, widgetTitleColumn); 
  });


  function getMetrics( primeMetric, optMetric) {
      if( !optMetric.match(/none/) ) {
          return primeMetric + ',' + optMetric;
      }
      else {
          return primeMetric;
      }
  };


  function addLineChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var div = chartLocation;
      var chart = new gadash.GaLineChart( div, ids, metrics,
          {'query': {
             'start-date':start_date,
             'end-date':end_date
           },
           'chartOptions':{
               'title':widgetTitle
            }
          }
      ).render();
      HideDialog();
  };


  function addAreaChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var div = chartLocation;
      var chart = new gadash.GaAreaChart( div, ids, metrics,
          {'query': {
             'start-date':start_date,
             'end-date':end_date
           },
           'chartOptions':{
               'title':widgetTitle
          }
      }).render();
      HideDialog();
  };


  function addPieChart( metrics, dimensions, widgetTitle){
      var ids = TABLE_ID;
      var div = chartLocation;
      var chart = new gadash.GaPieChart( div, ids, metrics, dimensions,
          {'query': {
             'start-date':start_date,
             'end-date':end_date
           },
           'chartOptions':{
               'title':widgetTitle
          }
      }).render();
      HideDialog();
  };


  function addBarChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var div = chartLocation;
      var chart = new gadash.GaBarChart( div, ids, metrics,
          {'query': {
             'start-date':start_date,
             'end-date':end_date
           },
           'chartOptions':{
               'title':widgetTitle
          }
      }).render();
      HideDialog();
  };


  function addColumnChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var div = chartLocation;
      var chart = new gadash.GaColumnChart( div, ids, metrics,
          {'query': {
             'start-date':start_date,
             'end-date':end_date
           },
           'chartOptions':{
               'title':widgetTitle
          }
      }).render();
      HideDialog();
  };


  $('#menu').tabs();



  /*
   * Enable to launch or create several events
   */
  function initialisation(){
     addEvent( id_$('btnAddLine'), 'click', addLineChart);
     addEvent( id_$('btnAddPie'), 'click', addPieChart);
     addEvent( id_$('btnAddArea'), 'click', addAreaChart);
     addEvent( id_$('btnAddBar'), 'click', addBarChart);
     addEvent( id_$('btnAddColumn'), 'click', addColumnChart);
  };


  /*
   * Create an event that launch the function initialisation when the window is loaded
   */
  addEvent(window, 'load', initialisation);
});
