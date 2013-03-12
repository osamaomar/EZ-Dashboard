$(document).ready(function () {

  var API_KEY = 'AIzaSyBHdmGxfoKdVdKAb9hQJbqNJnlKYZ-Mwms';
  var CLIENT_ID = '678812203795.apps.googleusercontent.com';
  var TABLE_ID = 'ga:1174';

  // Get current Date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var charts  = new Array();

  var yyyy = today.getFullYear();
  if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy+'-'+mm+'-'+dd;

  //Global variables
  var chartLocation = "";
  var editOption = ""; 
  var last_n_days = 20; //Will not be used
  var start_date = gadash.util.lastNdays(30);  // will be overridden by the date picker. Maybe use lastNmonth(1)
  var end_date = gadash.util.lastNdays(0);     // return foramt "YYYY-MM-DD";

$('#lastNFunctionRadio').prop("checked",true); 
$("#from_date").fadeTo(100,.2);
$("#from_date").prop('disabled', true);
$("#toSpan").fadeTo(100,.2);

$("#to_date").fadeTo(100,.2);
$("#to_date").prop('disabled', true);


$('#lastNFunctionRadio').click(function(){
    var _this = $(this);

    if( _this.is(':checked') ){
	
$("#from_date").fadeTo(100,.2);
$("#from_date").prop('disabled', true);
$("#toSpan").fadeTo(100,.2);

$("#to_date").fadeTo(100,.2);
$("#to_date").prop('disabled', true);

$("#LastText").fadeTo(100,1);
$("#LastText").prop('disabled', false);
$("#numberOfX").fadeTo(100,1);

$("#numberOfX").prop('disabled', false);


$("#selectTerm").fadeTo(100,1);
$("#selectTerm").prop('disabled', false);


var date = $("#numberOfX").val(); 
var terms = $("#selectTerm").val();

checkTerm(date,terms); 
		


	}
    
});


$('#datePickerRadio').click(function(){
    var _this = $(this);

    if( _this.is(':checked') ){
	
$("#from_date").fadeTo(100,1);
$("#from_date").prop('disabled', false);
$("#toSpan").fadeTo(100,1);

$("#to_date").fadeTo(100,1);
$("#to_date").prop('disabled', false);

$("#LastText").fadeTo(100,.2);
$("#LastText").prop('disabled', true);
$("#numberOfX").fadeTo(100,.2);

$("#numberOfX").prop('disabled', true);


$("#selectTerm").fadeTo(100,.2);
$("#selectTerm").prop('disabled', true);

first_date = $("#from_date").val();
start_date = first_date; 

last_date = $("#to_date").val();
end_date = last_date; 
forLoop();


	}
    
});

 
   var noCharts = true; //If the dashboard has any charts on it
  $("#from_date").val(start_date); 
  $("#to_date").val(today); 
  var chartIndex; 
  var chartGlobal = new Array();


  chartGlobal[0] = { chartType:"",
                     chartMetric:"",
                     metricCompare:"",
                     chartDimension:"",
                     chartTitle:"Chart #1",
                     filterDimension:"",
                     filterMatching:"",
                     position:""};


  chartGlobal[1] = { chartType:"",
                     chartMetric:"",
                     metricCompare:"",
                     chartDimension:"",
                     chartTitle:"Chart #2",
                     filterDimension:"",
                     filterMatching:"",
                     position:""};

  chartGlobal[2] = { chartType:"",
                     chartMetric:"",
                     metricCompare:"",
                     chartDimension:"",
                     chartTitle:"Chart #3",
                     filterDimension:"",
                     filterMatching:"",
                     position:""};

  chartGlobal[3] = { chartType:"",
                     chartMetric:"",
                     metricCompare:"",
                     chartDimension:"",
                     chartTitle:"Chart #4",
                     filterDimension:"",
                     filterMatching:"",
                     position:""};

  chartGlobal[4] = { chartType:"",
                     chartMetric:"",
                     metricCompare:"",
                     chartDimension:"",
                     chartTitle:"Chart #5",
                     filterDimension:"",
                     filterMatching:"",
                     position:""};

  chartGlobal[5] = { chartType:"",
                     chartMetric:"",
                     metricCompare:"",
                     chartDimension:"",
                     chartTitle:"Chart #6",
                     filterDimension:"",
                     filterMatching:"",
                     position:""};

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
$("#numberOfX").change(function() {
	var number = $("#numberOfX").val();
	var terms = $("#selectTerm").val(); 
	checkTerm(number, terms); 
});

$("#selectTerm").change(function() {
	var number = $("#numberOfX").val();
	var terms = $("#selectTerm").val(); 
	checkTerm(number, terms); 
});


function getCurrentDate() {
var currentDate = new Date();
	var year = currentDate.getFullYear(); 
	var month = currentDate.getMonth() + 1; 
	var day = currentDate.getDate();
if (month <10){
	month = "0" + month;

} 
if (day <10){
	day = "0" + day;

} 
var date = year + "-" + month +"-" + day;

return date;

}


function checkTerm(number,terms)
{
if (terms == "days"){

	start_date = gadash.util.lastNdays(number); 
	
	end_date = getCurrentDate(); 

	forLoop(); 
	return;
}
	if (terms == "weeks"){
	 start_date = gadash.util.lastNweeks(number); 
		end_date = getCurrentDate(); 


	forLoop(); 
		return;

}

if (terms == "months") {	

	 start_date = gadash.util.lastNmonths(number);
	 	end_date = getCurrentDate(); 


	forLoop(); 
		return;

}
else {
$("#from_date").val(gadash.util.lastNdays(20)); 

}
	
}

  $("#finishbutton").click(function (e) {
     if(!noCharts){
        $("#finishbutton").fadeOut(300);
        generate_code();
        ShowGrabcodeDialog();
        e.preventDefault();
     }
     else{
      alert(" You must add at least 1 chart to grab code.");
     }
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

      if (modal) {
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
                    chartArea: {  
                      width: "95%" 
                    }, 
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
                    chartArea: {
                      width: "95%" 
                    }, 
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
                   chartArea: {
                     width: "95%"
                   }, 
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
                   chartArea: {  
                     width: "95%" 
                   }, 
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
                    chartArea: {
                      width: "95%"
                    }, 
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
                   chartArea: {
                     width: "95%" 
                   }, 
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
                   chartArea: {
                     width: "95%"
                   }, 
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
                   chartArea: {
                     width: "95%"
                   }, 
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
     if( widgetTitle == "") {
       widgetTitle = createDefaultTitle(chartLocation);
     }
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
                   'chartArea': {  
                      'width': "95%" 
                    }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
          $("#"+chartLocation).css("border","2px solid #DDD");
          noCharts = false;
        }
        else {
           var chart = new gadash.GaPieChart( div, ids, metrics, dimensions,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                   'chartArea': {  
                      'width': "95%" 
                    }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
          $("#"+chartLocation).css("border","2px solid #DDD");
          noCharts = false;
        }
      }
      else {
        document.getElementById("wrappersPreviewPie").innerHTML = "";
      }
      chartGlobal[chartIndex].chartType = "PieChart";
      chartGlobal[chartIndex].chartMetric = metrics;
      chartGlobal[chartIndex].metricCompare = "none";
      chartGlobal[chartIndex].chartDimension = dimensions;
      if( widgetTitle != "") {
         chartGlobal[chartIndex].chartTitle = widgetTitle;
      }
      chartGlobal[chartIndex].filterDimension = filterDimension;
      chartGlobal[chartIndex].filterMatching = filterMatching;
      chartGlobal[chartIndex].position = chartLocation; 

      HideDialog();
  }; 

  function addBarChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var barMetric = $("#barMetrics").val();
      var barCompare = $("#barCompare").val();
      var metrics = getMetrics( barMetric, barCompare);
      if( widgetTitle == "") {
        widgetTitle = createDefaultTitle(chartLocation);
      }
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
                   'chartArea': {  
                      'width': "95%" 
                    }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
          $("#"+chartLocation).css("border","2px solid #DDD");
          noCharts = false;
        }
        else {
           var chart = new gadash.GaBarChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                   'chartArea': {  
                      'width': "95%" 
                    }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
          $("#"+chartLocation).css("border","2px solid #DDD");
          noCharts = false;
        }
     }
     else {
         document.getElementById("wrappersPreviewBar").innerHTML = "";
     }
     chartGlobal[chartIndex].chartType = "BarChart";
     chartGlobal[chartIndex].chartMetric = metrics;
     chartGlobal[chartIndex].metricCompare = barCompare;
     if( widgetTitle != "") {
         chartGlobal[chartIndex].chartTitle = widgetTitle;
     }
     chartGlobal[chartIndex].filterDimension = filterDimension;
     chartGlobal[chartIndex].filterMatching = filterMatching;
     chartGlobal[chartIndex].position = div; 

     HideDialog();
  }; 

  function addColumnChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var columnMetric = $("#columnMetrics").val();
      var columnCompare = $("#columnCompare").val();
      var metrics = getMetrics( columnMetric, columnCompare);
      if( widgetTitle == "") {
        widgetTitle = createDefaultTitle(chartLocation);
      }
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
                   'chartArea': {  
                      'width': "95%" 
                    }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
          $("#"+chartLocation).css("border","2px solid #DDD");
          noCharts = false;
        }
        else {
           var chart = new gadash.GaColumnChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                   'chartArea': {  
                      'width': "95%" 
                    }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
          $("#"+chartLocation).css("border","2px solid #DDD");
          noCharts = false;
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
     chartGlobal[chartIndex].position = div; 

     HideDialog();
  }; 

  function addAreaChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var areaMetric = $("#areaMetrics").val();
      var areaCompare = $("#areaCompare").val();
      var metrics = getMetrics( areaMetric, areaCompare);
      if( widgetTitle == "") {
        widgetTitle = createDefaultTitle(chartLocation);
      }
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
                   'chartArea': {  
                      'width': "95%" 
                    }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
          $("#"+chartLocation).css("border","2px solid #DDD");
          noCharts = false;
        }
        else {
           var chart = new gadash.GaAreaChart( div, ids, metrics,
             {'query': {
                 'start-date':start_date,
                 'end-date':end_date
               },
               'chartOptions':{
                   'title':widgetTitle,
                   'chartArea': {  
                      'width': "95%" 
                    }, 
                   'height':250,
                   'width':350
                }
              }
          ).render();
          $("#"+chartLocation).css("border","2px solid #DDD");
          noCharts = false;
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
     chartGlobal[chartIndex].position = div;

     HideDialog();
  }; 

  $(".btnDelete").click(function (e) {
      document.getElementById( chartLocation).innerHTML = 
         "<div id='" + changeDivName( chartLocation) + "' class='chartcontainer'>" +
            "<a href='#'' class='plus'>+ </a>" +
              "<BR/><p class='addchart'>ADD CHART</p></a>" +
          "</div>";
      $("#"+chartLocation).css("border","5px dashed #DDD");

      chartGlobal[chartIndex].chartType = "";
      chartGlobal[chartIndex].chartMetric = "";
      chartGlobal[chartIndex].metricCompare = "";
      chartGlobal[chartIndex].chartDimension = "";
      chartGlobal[chartIndex].chartTitle = "";
      chartGlobal[chartIndex].filterDimension = "";
      chartGlobal[chartIndex].filterMatching = "";
      chartGlobal[chartIndex].position = "";
      
      HideDialog();
  });

  $("#resetDashboard").click(function (e) {
      for( var chartNum = 1; chartNum <= 6; chartNum++) {
        document.getElementById( "wrappers" + chartNum).innerHTML = 
           "<div id='chart" + chartNum + "' class='chartcontainer'>" +
              "<a href='#'' class='plus'>+ </a>" +
                "<BR/><p class='addchart'>ADD CHART</p></a>" +
            "</div>";
        $("#wrappers" + chartNum).css("border","5px dashed #DDD");

        chartGlobal[chartNum].chartType = "";
        chartGlobal[chartNum].chartMetric = "";
        chartGlobal[chartNum].metricCompare = "";
        chartGlobal[chartNum].chartDimension = "";
        chartGlobal[chartNum].chartTitle = "Chart #" + chartNum;
        chartGlobal[chartNum].filterDimension = "";
        chartGlobal[chartNum].filterMatching = "";
        chartGlobal[chartNum].position = "";
        
        HideDialog();
      }
  });

  $('#menu').tabs();

  $("#pie_filter_fields").hide();
  $("#bar_filter_fields").hide();
  $("#column_filter_fields").hide();
  $("#area_filter_fields").hide();

  $(function () {
    $('#pieFilter').click(function () {
      $('#pie_filter_fields').slideDown("fast");
    });
    $('#barFilter').click(function () {
      $('#bar_filter_fields').slideDown("fast");
    });
    $('#columnFilter').click(function () {
      $('#column_filter_fields').slideDown("fast");
    });
    $('#areaFilter').click(function () {
      $('#area_filter_fields').slideDown("fast");
    });
  });

  function forLoop (){

  for (chartIndex = 0; chartIndex <=5; chartIndex++){
    
    switch (chartGlobal[chartIndex].chartType) {
      case "PieChart": var ids = TABLE_ID;
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
                                    'chartArea': {  
                                       'width': "95%" 
                                     }, 
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
                                    'chartArea': {  
                                       'width': "95%" 
                                     }, 
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

   case "BarChart": var ids = TABLE_ID;
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
                                   'chartArea': {  
                                      'width': "95%" 
                                    }, 
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
                                   'chartArea': {  
                                      'width': "95%" 
                                    }, 
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
case "ColumnChart": var ids = TABLE_ID;
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
                                  'chartArea': {  
                                     'width': "95%" 
                                   }, 
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
                                   'chartArea': {  
                                     'width': "95%" 
                                   }, 
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
case "AreaChart": var ids = TABLE_ID;
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
                               'chartArea': {  
                                  'width': "95%" 
                               }, 
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
                                 'chartArea': {  
                                    'width': "95%" 
                                  }, 
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
    
    part[0] = "<html>\r\n" +
              "  <head>\r\n" +
              "    <meta http-equiv='content-type' content='text/html; charset=UTF-8'>\r\n\r\n" +  

              "    <style>\r\n" +
              "      html {\r\n" +
              "        width: 100%;\r\n" +
              "      }\r\n" +
              "      table {\r\n" +
              "        vertical-align:center;\r\n" +
              "        margin: 50px auto;\r\n" +
              "      }\r\n" +
              "      #chart1, #chart2, #chart3, #chart4, #chart5, #chart6 {\r\n" +
              "         width:350px;\r\n" +
              "         height:250px;\r\n" +
              "         border:2px solid #DDD;\r\n" +
              "      }\r\n" +
              "    </style>\r\n\r\n" +

              "    <script src='//www.google.com/jsapi'></script>\r\n" +
              "    <script type='text/javascript' src='js/gadash-2.0.js'></script>\r\n" +
              "    <script src='//apis.google.com/js/client.js?onload=gadashInit_'></script>\r\n\r\n" +
              "    <script>\r\n" +
              "      // These parameters needs to be configured before you start.\r\n" +
              "      var API_KEY = '" + API_KEY + "'; //Your API Key Here\r\n" +
              "      var CLIENT_ID = '" + CLIENT_ID + "'; //Your Client ID Here\r\n" +
              "      var TABLE_ID = '" + TABLE_ID + "'; // Your Table ID here\r\n" +
              "      var start_date = '" + start_date + "';\r\n" +
              "      var end_date = '" + end_date + "';\r\n\r\n" +

              "      gadash.init({\r\n" +
              "        'apiKey': API_KEY,\r\n" +
              "        'clientId': CLIENT_ID\r\n" +
              "      });\r\n\r\n";

    var pattern =new RegExp("none");

    // Create all 6 charts (even if empty) and store them in part[1] through part[6]
    for( var cNum = 0; cNum < 6; cNum++) {

      // For Pie Charts
      if( chartGlobal[cNum].chartType == "PieChart") {
          if( !pattern.test(chartGlobal[cNum].chartMetric) && !pattern.test(chartGlobal[cNum].chartDimension)) {
              if( !pattern.test(chartGlobal[cNum].filterDimension) && chartGlobal[cNum].filterMatching != "") {
                  var filter = chartGlobal[cNum].filterDimension + '==' + chartGlobal[cNum].filterMatching;
                  part[cNum + 1] = "      var chart" + (cNum + 1) + " = new gadash.Ga" + chartGlobal[cNum].chartType + 
                              "( '" + changeDivName( chartGlobal[cNum].position) + "', '" +
                                      TABLE_ID + "', '" +
                                      chartGlobal[cNum].chartMetric + "', '" +
                                      chartGlobal[cNum].chartDimension + "',\r\n" +
                                      "        {\r\n" +
                                      "          'query': {\r\n" +
                                      "            'filters':'" + filter + "',\r\n" +
                                      "            'start-date': start_date,\r\n" +
                                      "            'end-date': end_date\r\n" +
                                      "          },\r\n" +
                                      "          'chartOptions':{\r\n" +
                                      "            'title':'" + chartGlobal[cNum].chartTitle + "',\r\n" +
                                      "            'chartArea': {\r\n" +
                                      "              'width': '95%'\r\n" + 
                                      "             },\r\n" +
                                      "            'height':250,\r\n" +
                                      "            'width':350\r\n" +
                                      "          }\r\n" +   
                                      "        }\r\n" +
                                      "      ).render();\r\n\r\n";
              }
              else {
                  part[cNum + 1] = "      var chart" + (cNum + 1) + " = new gadash.Ga" + chartGlobal[cNum].chartType + 
                              "( '" + changeDivName( chartGlobal[cNum].position) + "', '" +
                                      TABLE_ID + "', '" +
                                      chartGlobal[cNum].chartMetric + "', '" +
                                      chartGlobal[cNum].chartDimension + "',\r\n" +
                                      "        {\r\n" +
                                      "          'query': {\r\n" +
                                      "            'start-date': start_date,\r\n" +
                                      "            'end-date': end_date\r\n" +
                                      "          },\r\n" +
                                      "          'chartOptions':{\r\n" +
                                      "            'title':'" + chartGlobal[cNum].chartTitle + "',\r\n" +
                                      "            'chartArea': {\r\n" +
                                      "              'width': '95%'\r\n" + 
                                      "             },\r\n" +
                                      "            'height':250,\r\n" +
                                      "            'width':350\r\n" +
                                      "          }\r\n" +   
                                      "        }\r\n" +
                                      "      ).render();\r\n\r\n";
              }
          }
      }
      //For TimeLine, Bar, and Column charts
      else if( chartGlobal[cNum].chartType == "BarChart" ||
               chartGlobal[cNum].chartType == "ColumnChart" ||
               chartGlobal[cNum].chartType == "AreaChart"){
          if( !pattern.test(chartGlobal[cNum].chartMetric)) {
              if( !pattern.test(chartGlobal[cNum].filterDimension) && chartGlobal[cNum].filterMatching != ""){
                var filter = chartGlobal[cNum].filterDimension + '==' + chartGlobal[cNum].filterMatching;
                part[cNum + 1] = "      var chart" + (cNum + 1) + " = new gadash.Ga" + chartGlobal[cNum].chartType + 
                            "( '" + changeDivName( chartGlobal[cNum].position) + "', '" +
                                    TABLE_ID + "', '"  +
                                    chartGlobal[cNum].chartMetric + "',\r\n" +
                                      "        {\r\n" +
                                      "          'query': {\r\n" +
                                      "            'filters':'" + filter + "',\r\n" +
                                      "            'start-date': start_date,\r\n" +
                                      "            'end-date': end_date\r\n" +
                                      "          },\r\n" +
                                      "          'chartOptions':{\r\n" +
                                      "            'title':'" + chartGlobal[cNum].chartTitle + "',\r\n" +
                                      "            'chartArea': {\r\n" +
                                      "              'width': '95%'\r\n" + 
                                      "             },\r\n" +
                                      "            'height':250,\r\n" +
                                      "            'width':350\r\n" +
                                      "          }\r\n" +   
                                      "        }\r\n" +
                                      "      ).render();\r\n\r\n";
              }
              else {
                part[cNum + 1] = "      var chart" + (cNum + 1) + " = new gadash.Ga" + chartGlobal[cNum].chartType + 
                            "( '" + changeDivName( chartGlobal[cNum].position)+ "', '" +
                                    TABLE_ID + "', '" +
                                    chartGlobal[cNum].chartMetric + "',\r\n" +
                                      "        {\r\n" +
                                      "          'query': {\r\n" +
                                      "            'start-date': start_date,\r\n" +
                                      "            'end-date': end_date\r\n" +
                                      "          },\r\n" +
                                      "          'chartOptions':{\r\n" +
                                      "            'title':'" + chartGlobal[cNum].chartTitle + "',\r\n" +
                                      "            'chartArea': {\r\n" +
                                      "              'width': '95%'\r\n" + 
                                      "             },\r\n" +
                                      "            'height':250,\r\n" +
                                      "            'width':350\r\n" +
                                      "          }\r\n" +   
                                      "        }\r\n" +
                                      "      ).render();\r\n\r\n";
              }
          }
       }
       else {
           part[cNum + 1] = "      document.getElementById('chart" + (cNum + 1) + "').innerHTML = '';\r\n\r\n";
       }
    }

    part[7] = "    </script>\r\n" +
      "  </head>\r\n\r\n" +
      
      "  <body>\r\n" +
      "    <div id='gadash-auth'>\r\n" +
      "      <!-- Add Google Analytics authorization button -->\r\n" +
      "    </div>\r\n" +
      "    <table>\r\n" +
      "      <tr>\r\n" +
      "        <td>\r\n" +
      "          <div id='chart1'>\r\n" +
      "          </div>\r\n" +
      "        </td>\r\n" +
      "        <td>\r\n" +
      "          <div id='chart2'>\r\n" +
      "          </div>\r\n" +
      "        </td>\r\n" +
      "        <td>\r\n" +
      "          <div id='chart3'>\r\n" +
      "          </div>\r\n" +
      "        </td>\r\n" +
      "      </tr>\r\n" +
      "      <tr>\r\n" +
      "        <td>\r\n" +
      "          <div id='chart4'>\r\n" +
      "          </div>\r\n" +
      "        </td>\r\n" +
      "        <td>\r\n" +
      "          <div id='chart5'>\r\n" +
      "          </div>\r\n" +
      "        </td>\r\n" +
      "        <td>\r\n" +
      "          <div id='chart6'>\r\n" +
      "          </div>\r\n" +
      "        </td>\r\n" +
      "      </tr>\r\n" +
      "    </table>\r\n" +
      "  </body>\r\n" +
      "</html>\r\n";

    html_page.value = part[0] + part[1] + part[2] + part[3] + part[4] + part[5] + part[6] + part[7]; 
  };

  function changeDivName( divName) {
    return divName.replace("wrappers","chart");
  };

  function createDefaultTitle( divLocation) {
    return divLocation.replace("wrappers","Chart #");
  };

  $("#copybutton").click(function (e) {
    ZeroClipboard.setDefaults({ moviePath: "js/ZeroClipboard.swf" });
    var codeFromTextarea = document.getElementById('grabcode_txtarea').value;
    document.getElementById("copycode").setAttribute("data-clipboard-text", codeFromTextarea);
    var clip = new ZeroClipboard( document.getElementById("copycode"));
  
    // For user feedback
    document.getElementById('grabcode_txtarea').focus();
    document.getElementById('grabcode_txtarea').select();
  });

$("#account").hover(function()
{
var X=$(this).attr('id');
if(X==1)
{
$("#submenu").hide();
$(this).attr('id', '0'); 
}
else
{
$("#submenu").toggle();
$(this).attr('id', '1');
}

});

//Mouse click on sub menu
$("#submenu").hover(function()
{
$("#submenu").toggle();});

//Mouse click on my account link
$("#account").hover(function()
{
return false
});




//Document Click
$(document).click(function()
{
$("#submenu").hide();
$("#account").attr('id', '');
});



$("#tableAccount").hover(function()
{
var X=$(this).attr('id');
if(X==1)
{
$("#tableSubmenu").hide();
$(this).attr('id', '0'); 
}
else
{
$("#tableSubmenu").toggle();
$(this).attr('id', '1');
}

});

//Mouse click on sub menu
$("#tableSubmenu").hover(function()
{
$("#tableSubmenu").toggle();});

//Mouse click on my account link
$("#tableAccount").hover(function()
{
return false
});




//Document Click
$(document).click(function()
{
$("#tableSubmenu").hide();
$("#tableAccount").attr('id', '');
});
});





