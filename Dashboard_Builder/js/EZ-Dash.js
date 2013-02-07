$(document).ready(function () {

  var API_KEY = 'AIzaSyBHdmGxfoKdVdKAb9hQJbqNJnlKYZ-Mwms';
  var CLIENT_ID = '678812203795.apps.googleusercontent.com';
  var TABLE_ID = 'ga:1174';

   // Get curretn Date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var charts  = new Array();



var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy+'-'+mm+'-'+dd;
//alert(today);


  //Global variables
  var chartLocation = "";
  var editOption = ""; 
  var widgetTitleGlobal = ""; 
  var last_n_days = 20; //Will not be used
  var start_date = gadash.util.lastNdays(30);  // will be overridden by the date picker. Maybe use lastNmonth(1)
  var end_date = gadash.util.lastNdays(0);     // return foramt "YYYY-MM-DD";
  var selectedStartDate; // selected start date from user
  var selectedEndDat; // selected end date from user

    $("#from_date").val(start_date); 
    $("#to_date").val(today); 
var chartIndex; 
var chartGlobal = new Array();

chartGlobal[0] = { chartType:"", chartMetric:"",
                   metricCompare:"",
                   chartDimension:"",
                   chartTitle:"",
                   filterDimension:"",
                   filterMatching:"",
                   position:""};


chartGlobal[1] = { chartType:"", chartMetric:"",
                   metricCompare:"",
                   chartDimension:"",
                   chartTitle:"",
                   filterDimension:"",
                   filterMatching:"",
                   position:""};

chartGlobal[2] = { chartType:"", chartMetric:"",
                   metricCompare:"",
                   chartDimension:"",
                   chartTitle:"",
                   filterDimension:"",
                   filterMatching:"",
                   position:""};

chartGlobal[3] = { chartType:"", chartMetric:"",
                   metricCompare:"",
                   chartDimension:"",
                   chartTitle:"",
                   filterDimension:"",
                   filterMatching:"",
                   position:""};

chartGlobal[4] = { chartType:"", chartMetric:"",
                   metricCompare:"",
                   chartDimension:"",
                   chartTitle:"",
                   filterDimension:"",
                   filterMatching:"",
                   position:""};

chartGlobal[5] = { chartType:"", chartMetric:"",
                   metricCompare:"",
                   chartDimension:"",
                   chartTitle:"",
                   filterDimension:"",
                   filterMatching:"",
                   position:""};

  // gadash.configKeys({
  //     'apiKey': API_KEY,
  //     'clientId': CLIENT_ID
  // });

  gadash.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID
  });

  function tag_$(un_tag){
     return document.getElementsByTagName(un_tag);
  };

  function id_$(un_id){
     return document.getElementById(un_id);
  };



        
  

  $("#wrappers1").click(function (e) {
     chartLocation = "wrappers1";
  chartIndex = 0; 
     ShowDialog(false);
     e.preventDefault();
  }); 

  $("#wrappers2").click(function (e) {
     chartLocation = "wrappers2";
  chartIndex = 1; 


     ShowDialog(false);
     e.preventDefault();
  }); 

  $("#wrappers3").click(function (e) {
     chartLocation = "wrappers3";
  chartIndex = 2; 


     ShowDialog(false);
     e.preventDefault();
  });

  $("#wrappers4").click(function (e) {
     chartLocation = "wrappers4";
     editOption ="wrapperheader4";
  chartIndex = 3; 


     ShowDialog(false);
     e.preventDefault();
  });

  $("#wrappers5").click(function (e) {
     chartLocation = "wrappers5";
     editOption ="wrapperheader5";
  chartIndex = 4; 


     ShowDialog(false);
     e.preventDefault();
  });

  $("#wrappers6").click(function (e) {
     chartLocation = "wrappers6";
     editOption ="wrapperheader6";
  chartIndex = 5; 


     ShowDialog(false);
     e.preventDefault();
  });

  $("#finishbutton").click(function (e) {
    $("#finishbutton").fadeOut(300);
     generate_code();
     ShowGrabcodeDialog();
     e.preventDefault();
  });
 
 
 $(function() {
    $( "#from_date" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      dateFormat: 'yy-mm-dd',
      numberOfMonths: 2,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
        start_date = selectedDate; 
  forLoop();
      }
    });
    
    $( "#to_date" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      dateFormat: 'yy-mm-dd',
      numberOfMonths: 2,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
    end_date = selectedDate;
  forLoop(); 
      }
    });
  });


   function ShowDialog(modal) {
      $("#overlay").show();
      $("#dialog").fadeIn(300);

      if (modal)
      {
         $("#overlay").unbind("click");
      }
      
   }

   function ShowGrabcodeDialog() {
      $("#overlay").show();
      $("#gcdialog").fadeIn(300);
   }

   function HideDialog() {
      $("#overlay").hide();
      $("#dialog").fadeOut(300);
   } 

   function HideGrabcodeDialog() {
      $("#overlay").hide();
      $("#gcdialog").fadeOut(300);
      $("#finishbutton").fadeIn(300);
   } 
    
  $("#btnClose").click(function (e) {
     HideDialog();
  });
  $("#btnGC_Close").click(function (e) {
     HideGrabcodeDialog();
  });

  function getMetrics( primeMetric, optMetric) {
      if( !optMetric.match(/none/) ) {
          return primeMetric + ',' + optMetric;
      }
      else {
          return primeMetric;
      }
  };
$("#from_date").change(function(e) {
forLoop(); 
     

});

$("#to_date").change(function(e) {

forLoop(); 
     

});

  $(".line_change").change(function (e) {
      var ids = TABLE_ID;
      var lineMetric = $("#lineMetrics").val();
      var lineCompare = $("#lineCompare").val();
      var metrics = getMetrics( lineMetric, lineCompare);
      var widgetTitle = $("#widgetTitleLine").val();
      var filterDimension = $("#line_filter_dimension").val();
      var filterMatching = $("#line_filter_matching").val();
      var pattern =new RegExp("none");

      if( !pattern.test(lineMetric))  {
        var div = "wrappersPreviewLine";
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaLineChart( div, ids, metrics,
              {'query': {
                 'filters':filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
        else {
           var chart = new gadash.GaLineChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
     }
     else {
         document.getElementById("wrappersPreviewLine").innerHTML = "";
     }
  }); 

  $(".pie_change").change(function (e) {
      var ids = TABLE_ID;
      var pieMetric = $("#pieMetrics").val();
      var pieDimension = $("#pieGroupBy").val();
      var widgetTitle = $("#widgetTitlePie").val();
      var filterDimension = $("#pie_filter_dimension").val();
      var filterMatching = $("#pie_filter_matching").val();

      var pattern =new RegExp("none");

      if( !pattern.test(pieMetric) && !pattern.test(pieDimension))  {
        var div = "wrappersPreviewPie";
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaPieChart( div, ids, pieMetric, pieDimension,
              {'query': {
                 'filters':filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
        else {
           var chart = new gadash.GaPieChart( div, ids, pieMetric, pieDimension,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
     }
     else {
         document.getElementById("wrappersPreviewPie").innerHTML = "";
     }
  }); 

  $(".bar_change").change(function (e) {
      var ids = TABLE_ID;
      var barMetric = $("#barMetrics").val();
      var barCompare = $("#barCompare").val();
      var metrics = getMetrics( barMetric, barCompare);
      var widgetTitle = $("#widgetTitleBar").val();
      var filterDimension = $("#bar_filter_dimension").val();
      var filterMatching = $("#bar_filter_matching").val();
      var pattern =new RegExp("none");

      if( !pattern.test(barMetric))  {
        var div = "wrappersPreviewBar";
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaBarChart( div, ids, metrics,
              {'query': {
                 'filters':filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
        else {
           var chart = new gadash.GaBarChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
     }
     else {
         document.getElementById("wrappersPreviewBar").innerHTML = "";
     }
  }); 

  $(".column_change").change(function (e) {
      var ids = TABLE_ID;
      var columnMetric = $("#columnMetrics").val();
      var columnCompare = $("#columnCompare").val();
      var metrics = getMetrics( columnMetric, columnCompare);
      var widgetTitle = $("#widgetTitleColumn").val();
      var filterDimension = $("#column_filter_dimension").val();
      var filterMatching = $("#column_filter_matching").val();
      var pattern =new RegExp("none");

      if( !pattern.test(columnMetric))  {
        var div = "wrappersPreviewColumn";
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaColumnChart( div, ids, metrics,
              {'query': {
                 'filters':filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
        else {
           var chart = new gadash.GaColumnChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
     }
     else {
         document.getElementById("wrappersPreviewColumn").innerHTML = "";
     }
  }); 

  $(".area_change").change(function (e) {
      var ids = TABLE_ID;
      var areaMetric = $("#areaMetrics").val();
      var areaCompare = $("#areaCompare").val();
      var metrics = getMetrics( areaMetric, areaCompare);
      var widgetTitle = $("#widgetTitleArea").val();
      var filterDimension = $("#area_filter_dimension").val();
      var filterMatching = $("#area_filter_matching").val();
      var pattern =new RegExp("none");

      if( !pattern.test(areaMetric))  {
        var div = "wrappersPreviewArea";
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaAreaChart( div, ids, metrics,
              {'query': {
                 'filters':filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
        else {
           var chart = new gadash.GaAreaChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
     }
     else {
         document.getElementById("wrappersPreviewArea").innerHTML = "";
     }
  }); 

  $("#btnAddLine").click(function (e) {
      var lineMetric = $("#lineMetrics").val();
      var lineCompare = $("#lineCompare").val();
      var widgetTitleLine = $("#widgetTitleLine").val();    
      var metrics = getMetrics( lineMetric, lineCompare);

      addLineChart(metrics, widgetTitleLine); 
  });

  $("#btnAddPie").click(function (e) {
     var pieMetric = $("#pieMetrics").val();
     var pieDimension = $("#pieGroupBy").val();
     var widgetTitlePie = $("#widgetTitlePie").val();

     addPieChart( pieMetric, pieDimension, widgetTitlePie); 
  });

  $("#btnAddBar").click(function (e) {
      var barMetric = $("#barMetrics").val();
      var barCompare = $("#barCompare").val();
      var widgetTitleBar = $("#widgetTitleBar").val();
      var metrics = getMetrics( barMetric, barCompare);

      addBarChart( metrics, widgetTitleBar); 
  });

  $("#btnAddColumn").click(function (e) {
      var columnMetric = $("#columnMetrics").val();
      var columnCompare = $("#columnCompare").val();
      var widgetTitleColumn = $("#widgetTitleColumn").val();
      var metrics = getMetrics( columnMetric, columnCompare);
      
      addColumnChart( metrics, widgetTitleColumn); 
  });

  $("#btnAddArea").click(function (e) {
     var areaMetric = $("#areaMetrics").val();
     var areaCompare = $("#areaCompare").val();
     var widgetTitleArea = $("#widgetTitleArea").val();
     var metrics = getMetrics( areaMetric, areaCompare);

     addAreaChart( metrics, widgetTitleArea); 
  });


  function addPieChart( metrics, dimensions, widgetTitle){
     var ids = TABLE_ID;
     var filterDimension = $("#pie_filter_dimension").val();
     var filterMatching = $("#pie_filter_matching").val();
     var pattern =new RegExp("none");

     if( !pattern.test(metrics) && !pattern.test(dimensions))  {
        var div = chartLocation;
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaPieChart( div, ids, metrics, dimensions,
              {'query': {
                 'filters':filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
                $("#"+chartLocation).css("border","2px solid #DDD");

        }
        else {
           var chart = new gadash.GaPieChart( div, ids, metrics, dimensions,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
                 $("#"+chartLocation).css("border","2px solid #DDD");

        }
      }
      else {
        document.getElementById("wrappersPreviewPie").innerHTML = "";
      }
 chartGlobal[chartIndex].chartType = "PieChart";
 chartGlobal[chartIndex].chartMetric = metrics;
 chartGlobal[chartIndex].metricCompare = "none";
 chartGlobal[chartIndex].chartDimension = dimensions;
 chartGlobal[chartIndex].chartTitle = widgetTitle;
 chartGlobal[chartIndex].filterDimension = filterDimension;
 chartGlobal[chartIndex].filterMatching = filterMatching;
 chartGlobal[chartIndex]. position = chartLocation; 

      changeChartBorder(chartLocation);
      HideDialog();
  }; 

  function addBarChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var barMetric = $("#barMetrics").val();
      var barCompare = $("#barCompare").val();
      var metrics = getMetrics( barMetric, barCompare);
      var widgetTitle = $("#widgetTitleBar").val();
      var filterDimension = $("#bar_filter_dimension").val();
      var filterMatching = $("#bar_filter_matching").val();
      var pattern =new RegExp("none");

      if( !pattern.test(barMetric))  {
        var div = chartLocation;
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaBarChart( div, ids, metrics,
              {'query': {
                 'filters':filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                     chartArea: {  width: "95%" }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
                $("#"+chartLocation).css("border","2px solid #DDD");

        }
        else {
           var chart = new gadash.GaBarChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                     chartArea: {  width: "95%" }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
                 $("#"+chartLocation).css("border","2px solid #DDD");

        }
     }
     else {
         document.getElementById("wrappersPreviewBar").innerHTML = "";
     }
      chartGlobal[chartIndex].chartType = "BarChart";
 chartGlobal[chartIndex].chartMetric = metrics;
 chartGlobal[chartIndex].metricCompare = barCompare;
 chartGlobal[chartIndex].chartTitle = widgetTitle;
 chartGlobal[chartIndex].filterDimension = filterDimension;
 chartGlobal[chartIndex].filterMatching = filterMatching;
 chartGlobal[chartIndex]. position = div; 
     changeChartBorder(chartLocation); 
     HideDialog();
  }; 

  function addColumnChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var columnMetric = $("#columnMetrics").val();
      var columnCompare = $("#columnCompare").val();
      var metrics = getMetrics( columnMetric, columnCompare);
      var widgetTitle = $("#widgetTitleColumn").val();
      var filterDimension = $("#column_filter_dimension").val();
      var filterMatching = $("#column_filter_matching").val();
      var pattern =new RegExp("none");

      if( !pattern.test(columnMetric))  {
        var div = chartLocation;
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaColumnChart( div, ids, metrics,
              {'query': {
                 'filters':filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
                $("#"+chartLocation).css("border","2px solid #DDD");

        }
        else {
           var chart = new gadash.GaColumnChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
                 $("#"+chartLocation).css("border","2px solid #DDD");

        }
     }
     else {
         document.getElementById("wrappersPreviewColumn").innerHTML = "";
     }
      chartGlobal[chartIndex].chartType = "ColumnChart";
 chartGlobal[chartIndex].chartMetric = metrics;
 chartGlobal[chartIndex].metricCompare = columnCompare;
 chartGlobal[chartIndex].chartTitle = widgetTitle;
 chartGlobal[chartIndex].filterDimension = filterDimension;
 chartGlobal[chartIndex].filterMatching = filterMatching;
 chartGlobal[chartIndex]. position = div; 

     changeChartBorder(chartLocation);
     HideDialog();
  }; 

  function addAreaChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var areaMetric = $("#areaMetrics").val();
      var areaCompare = $("#areaCompare").val();
      var metrics = getMetrics( areaMetric, areaCompare);
      var widgetTitle = $("#widgetTitleArea").val();
      var filterDimension = $("#area_filter_dimension").val();
      var filterMatching = $("#area_filter_matching").val();
      var pattern =new RegExp("none");

      if( !pattern.test(areaMetric))  {
        var div = chartLocation;
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaAreaChart( div, ids, metrics,
              {'query': {
                 'filters':filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
                $("#"+chartLocation).css("border","2px solid #DDD");

        }
        else {
           var chart = new gadash.GaAreaChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                              chartArea: {  width: "95%" }, 

                   'height':250,
                   'width':350
                }
              }
          ).render();
                 $("#"+chartLocation).css("border","2px solid #DDD");

        }
     }
     else {
         document.getElementById("wrappersPreviewColumn").innerHTML = "";
     }
       chartGlobal[chartIndex].chartType = "AreaChart";
 chartGlobal[chartIndex].chartMetric = metrics;
 chartGlobal[chartIndex].metricCompare = columnCompare;
 chartGlobal[chartIndex].chartTitle = widgetTitle;
 chartGlobal[chartIndex].filterDimension = filterDimension;
 chartGlobal[chartIndex].filterMatching = filterMatching;
 chartGlobal[chartIndex]. position = div;
     changeChartBorder(chartLocation);
     HideDialog();
  }; 

  function changeChartBorder(chartLoc){
    var chartNum;
    switch (chartLoc){
      case 'chart1': 
        chartNum = 1;
        break;
      case 'chart2':
        chartNum = 2;
        break;
      case 'chart3':
        chartNum = 3;
        break;
      case 'chart4':
        chartNum = 4;
        break;
      case 'chart5':
        chartNum = 5;
        break;
      case 'chart6':
        chartNum = 6;
        break;
    }

    $("#wrappers" + chartNum).css("border", "5px solid #DDD");
  }

  $('#menu').tabs();

  $("#line_filter_fields").hide();
  $("#pie_filter_fields").hide();
  $("#bar_filter_fields").hide();
  $("#column_filter_fields").hide();
  $("#area_filter_fields").hide();

  $(function () {
    $('#lineFilter').click(function () {
      $('#line_filter_fields').toggle();
    });
    $('#pieFilter').click(function () {
      $('#pie_filter_fields').toggle();
    });
    $('#barFilter').click(function () {
      $('#bar_filter_fields').toggle();
    });
    $('#columnFilter').click(function () {
      $('#column_filter_fields').toggle();
    });
    $('#areaFilter').click(function () {
      $('#area_filter_fields').toggle();
    });
  });

   function forLoop (){

  for (chartIndex = 0; chartIndex <=5; chartIndex++){
    

  switch (chartGlobal[chartIndex].chartType)
{
case "PieChart":
     var ids = TABLE_ID;
  var metrics =  chartGlobal[chartIndex].chartMetric; 
     var dimensions = chartGlobal[chartIndex].chartDimension;
  var widgetTitle =  chartGlobal[chartIndex].chartTitle;
     var filterDimension = chartGlobal[chartIndex].filterDimension;
     var filterMatching =  chartGlobal[chartIndex].filterMatching;
     var pattern =new RegExp("none");
     if( !pattern.test(metrics) && !pattern.test(dimensions))  {
        var div = chartGlobal[chartIndex].position; 
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaPieChart( div, ids, metrics, dimensions,
              {'query': {
                 'filters':filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                     'title':widgetTitle,
           chartArea: {  width: "95%" }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
      $("#"+chartLocation).css("border","2px solid #DDD");

        }
        else {
           var chart = new gadash.GaPieChart( div, ids, metrics, dimensions,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
           chartArea: {  width: "95%" }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
      $("#"+chartLocation).css("border","2px solid #DDD");

        }
      }
      else {
        document.getElementById("wrappersPreviewPie").innerHTML = "";
      }

  break;

   case "BarChart":

       var ids = TABLE_ID;
  var metrics =  chartGlobal[chartIndex].chartMetric; 
  var widgetTitle =  chartGlobal[chartIndex].chartTitle;
  var div  = chartGlobal[chartIndex].position; 
      var pattern =new RegExp("none");
      var filterDimension = chartGlobal[chartIndex].filterDimension; 
      var filterMatching = chartGlobal[chartIndex].filterMatching; 

 if( !pattern.test(metrics))  {
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaBarChart( div, ids, metrics,
             {'query': {
       'filters': filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
           chartArea: {  width: "95%" }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();

        }
        else {
           var chart = new gadash.GaBarChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
    chartArea: {  width: "95%" }, 
                   'title':widgetTitle,
                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
     }
     else {
         document.getElementById("wrappersPreviewBar").innerHTML = "";
     }
  break;
case "ColumnChart":
       var ids = TABLE_ID;
  var metrics =  chartGlobal[chartIndex].chartMetric; 
  var widgetTitle =  chartGlobal[chartIndex].chartTitle;
  var div  = chartGlobal[chartIndex].position; 
      var pattern =new RegExp("none");
      var filterDimension = chartGlobal[chartIndex].filterDimension; 
      var filterMatching = chartGlobal[chartIndex].filterMatching; 

 if( !pattern.test(metrics))  {
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaBarChart( div, ids, metrics,
             {'query': {
       'filters': filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
           chartArea: {  width: "95%" }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();

        }
        else {
           var chart = new gadash.GaColumnChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
    chartArea: {  width: "95%" }, 
                   'title':widgetTitle,
                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
     }
     else {
         document.getElementById("wrappersPreviewBar").innerHTML = "";
     }
  break;
case "AreaChart":
var ids = TABLE_ID;
  var metrics =  chartGlobal[chartIndex].chartMetric; 
  var widgetTitle =  chartGlobal[chartIndex].chartTitle;
  var div  = chartGlobal[chartIndex].position; 
      var pattern =new RegExp("none");
      var filterDimension = chartGlobal[chartIndex].filterDimension; 
      var filterMatching = chartGlobal[chartIndex].filterMatching; 

 if( !pattern.test(metrics))  {
        if( !pattern.test(filterDimension) && filterMatching != ""){
          var filter = filterDimension + '==' + filterMatching;
          var chart = new gadash.GaBarChart( div, ids, metrics,
             {'query': {
       'filters': filter,
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
           chartArea: {  width: "95%" }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();

        }
        else {
           var chart = new gadash.GaAreaChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
    chartArea: {  width: "95%" }, 
                   'title':widgetTitle,
                   'height':250,
                   'width':350
                }
              }
          ).render();
        }
     }
     else {
         document.getElementById("wrappersPreviewBar").innerHTML = "";
     }
  break;

} 
}
};

function generate_code() {
    var html_page = document.getElementById("grabcode_txtarea");
    var part = new Array();
    
    part[0] = "<html>" +
                  "<head>" +
                    "<meta http-equiv='content-type' content='text/html; charset=UTF-8'>" +      
                    
                    "<script src='//www.google.com/jsapi'></script>" +
                    "<script type='text/javascript' src='js/gadash-2.0.js'></script>" +
                    "<script src='//apis.google.com/js/client.js?onload=gadashInit_'></script>" +

                    "<style>" +
                      "#chart1, #chart2, #chart3, #chart4, #chart5, #chart6 {" +
                        "width:350px,"+
                        "height:250px" +
                      "}" +
                    "</style>" +
                    "<script>" +
                       "var API_KEY = " + API_KEY + ";"
                       "var CLIENT_ID = " + CLIENT_ID + ";"
                       "var TABLE_ID = " + TABLE_ID + ";"

                        "gadash.init({" +
                          "'apiKey': API_KEY," +
                          "'clientId': CLIENT_ID" +
                        "});";

    var pattern =new RegExp("none");

    // Create all 6 charts (even if empty) and store them in part[1] through part[6]
    for( var cNum = 0; cNum < 6; cNum++) {

      // For Pie Charts
      if( chartGlobal[cNum].chartType == "PieChart") {
          if( !pattern.test(chartGlobal[cNum].chartMetric) && !pattern.test(chartGlobal[cNum].chartDimension)) {
              if( !pattern.test(chartGlobal[cNum].filterDimension) && chartGlobal[cNum].filterMatching != "") {
                  var filter = chartGlobal[cNum].filterDimension + '==' + chartGlobal[cNum].filterMatching;
                  part[cNum + 1] = "var chart" + (cNum + 1) + " = new gadash.Ga" + chartGlobal[cNum].chartType + 
                              "( " + chartGlobal[cNum].position + ", " +
                                   "TABLE_ID, " +
                                 + chartGlobal[cNum].chartMetric + ", " +
                                 + chartGlobal[cNum].chartDimension + ", " +

                                   + "{'query': {" +
                                            "'filters':" + filter + "," +
                                            "'start-date':" + start_date + "," +
                                            "'end-date':" + end_date +
                                          "}," +
                                          "'chartOptions':{" +
                                            "'title':" + chartGlobal[cNum].chartTitle + "," +
                                            "'height':250," +
                                            "'width':350" +
                                          "}" +
                                        "}" +
                                      ").render();";
              }
              else {
                  part[cNum + 1] = "var chart" + (cNum + 1) + " = new gadash.Ga" + chartGlobal[cNum].chartType + 
                              "( " + chartGlobal[cNum].position + ", " 
                                   + "TABLE_ID, "  
                                   + chartGlobal[cNum].chartMetric + ", " +
                                   + chartGlobal[cNum].chartDimension + ", " +

                                   + "{'query': {" +
                                            "'start-date':" + start_date + "," +
                                            "'end-date':" + end_date + 
                                          "}," +
                                          "'chartOptions':{" +
                                            "'title':" + chartGlobal[cNum].chartTitle + "," +
                                            "'height':250," +
                                            "'width':350" +
                                          "}" +
                                        "}" +
                                    ").render();";
              }
          }
          else {
              part[cNum + 1] = "document.getElementById('" + chartGlobal[cNum].position  + "').innerHTML = '';";
          }
      }
      //For TimeLine, Bar, and Column charts
      else {
          if( !pattern.test(chartGlobal[cNum].chartMetric)) {
              if( !pattern.test(chartGlobal[cNum].filterDimension) && chartGlobal[cNum].filterMatching != ""){
                var filter = chartGlobal[cNum].filterDimension + '==' + chartGlobal[cNum].filterMatching;
                part[cNum + 1] = "var chart" + (cNum + 1) + " = new gadash.Ga" + chartGlobal[cNum].chartType + 
                            "( " + chartGlobal[cNum].position + ", "
                                 + "TABLE_ID,"  
                                 + chartGlobal[cNum].chartMetric + ", "
                                 + "{'query': {" +
                                          "'filters':" + filter + "," +
                                          "'start-date':" + start_date + "," +
                                          "'end-date':" + end_date +
                                        "}," +
                                        "'chartOptions':{" +
                                          "'title':" + chartGlobal[cNum].chartTitle + "," +
                                          "'height':250," +
                                          "'width':350" +
                                        "}" +
                                      "}" +
                                    ").render();";
              }
              else {
                part[cNum + 1] = "var chart" + (cNum + 1) + " = new gadash.Ga" + chartGlobal[cNum].chartType + 
                            "( " + chartGlobal[cNum].position + ", "
                                 + "TABLE_ID, "  
                                 + chartGlobal[cNum].chartMetric + ", "

                                 + "{'query': {" +
                                          "'start-date':" + start_date + "," +
                                          "'end-date':" + end_date + 
                                        "}," +
                                        "'chartOptions':{" +
                                          "'title':" + chartGlobal[cNum].chartTitle + "," +
                                          "'height':250," +
                                          "'width':350" +
                                        "}" +
                                      "}" +
                                  ").render();";
              }
          }
          else {
              part[cNum + 1] = "document.getElementById('" + chartGlobal[cNum].position  + "').innerHTML = '';";
          }
       }
    }

    part[7] = "</script>" +
      "</head>" +
      
      "<body>" +
        "<table>" +
          "<tr>" +
            "<td>" +
              "<div id='chart1'>" +
              "</div>" +
            "</td>" +
            "<td>" +
              "<div id='chart2'>" +
              "</div>" +
            "</td>" +
            "<td>" +
              "<div id='chart3'>" +
              "</div>" +
            "</td>" +
          "</tr>" +
          "<tr>" +
            "<td>" +
              "<div id='chart4'>" +
              "</div>" +
            "</td>" +
            "<td>" +
              "<div id='chart5'>" +
              "</div>" +
            "</td>" +
            "<td>" +
              "<div id='chart6'>" +
              "</div>" +
            "</td>" +
          "</tr>" +
        "</table>" +
      "</body>" +
    "<html>";


    html_page.value += part[0] + part[1] + part[2] + part[3] + part[4] + part[5] + part[6] + part[7]; 
  };

});





