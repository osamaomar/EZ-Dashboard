$(document).ready(function () {

  var API_KEY = 'AIzaSyBHdmGxfoKdVdKAb9hQJbqNJnlKYZ-Mwms';
  var CLIENT_ID = '678812203795.apps.googleusercontent.com';
  var TABLE_ID = 'ga:1174';

  //Global variables
  var chartLocation = "";
  var editOption = ""; 
  var widgetTitleGlobal = ""; 
  var last_n_days = 20; //Will not be used
  var start_date = gadash.util.lastNdays(30);  // will be overridden by the date picker. Maybe use lastNmonth(1)
  var end_date = gadash.util.lastNdays(0);     // return foramt "YYYY-MM-DD";
  var selectedStartDate; // selected start date from user
  var selectedEndDat; // selected end date from user

  gadash.configKeys({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID
  });


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
     chartLocation = "chart1";
     editOption ="wrapperheader1";
     ShowDialog(false);
     e.preventDefault();
  }); 

  $("#wrappers2").click(function (e) {
     chartLocation = "chart2";
     editOption ="wrapperheader2";
     ShowDialog(false);
     e.preventDefault();
  }); 

  $("#wrappers3").click(function (e) {
     chartLocation = "chart3";
     editOption ="wrapperheader3";
     ShowDialog(false);
     e.preventDefault();
  });

  $("#wrappers4").click(function (e) {
     chartLocation = "chart4";
     editOption ="wrapperheader4";
     ShowDialog(false);
     e.preventDefault();
  });

  $("#wrappers5").click(function (e) {
     chartLocation = "chart5";
     editOption ="wrapperheader5";
     ShowDialog(false);
     e.preventDefault();
  });

  $("#wrappers6").click(function (e) {
     chartLocation = "chart6";
     editOption ="wrapperheader6";
     ShowDialog(false);
     e.preventDefault();
  });
 
 $(function() {
    $( "#from" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      dateFormat: 'yy-mm-dd',
      numberOfMonths: 2,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
        selectedStartDate = selectedDate; 
         alert(selectedStartDate);
      }
    });
    
    $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      dateFormat: 'yy-mm-dd',
      numberOfMonths: 2,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
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


   $("#pieMetrics").change(function (e) {
      var ids = TABLE_ID;
      var pieMetric = $("#pieMetrics").val();
      var pieGroupBy = $("#pieGroupBy").val();
      var widgetTitle = $("#widgetTitlePie").val();
  
      var pattern =new RegExp("none");

      if( !pattern.test(pieMetric) && !pattern.test(pieGroupBy))  {
        var div = "wrappersPreviewPie";
        var chart = new gadash.GaPieChart( div, ids, pieMetric,pieGroupBy,
            {'query': {
               'start-date':start_date,
               'end-date':end_date
             },
             'chartOptions':{
                 'title':widgetTitle,
                 'height':250,
                 'width':350
              }
            }
        ).render();
     }
     else {
         document.getElementById("wrappersPreviewPie").innerHTML = "";
     }
  }); 


   $("#pieGroupBy").change(function (e) {
      var ids = TABLE_ID;
      var pieMetric = $("#pieMetrics").val();
      var pieGroupBy = $("#pieGroupBy").val();
      var widgetTitle = $("#widgetTitlePie").val();
  
      var pattern =new RegExp("none");

      if( !pattern.test(pieMetric) && !pattern.test(pieGroupBy))  {

        var div = "wrappersPreviewPie";
        var chart = new gadash.GaPieChart( div, ids, pieMetric, pieGroupBy,
            {'query': {
               'start-date':start_date,
               'end-date':end_date
             },
             'chartOptions':{
                 'title':widgetTitle,
                 'height':250,
                 'width':350
              }
            }
        ).render();
     }
     else {
         document.getElementById("wrappersPreviewPie").innerHTML = "";
     }
  }); 


  $("#areaMetrics").change(function (e) {
      var ids = TABLE_ID;
      var areaMetric = $("#areaMetrics").val();
      var areaCompare = $("#areaCompare").val();
      var metrics = getMetrics( areaMetric, areaCompare);
      var widgetTitle = $("#widgetTitleArea").val();

      var pattern =new RegExp("none");

      if( !pattern.test(areaMetric))  {
        var div = "wrappersPreviewArea";
        var chart = new gadash.GaAreaChart( div, ids, metrics,
            {'query': {
               'start-date':start_date,
               'end-date':end_date
             },
             'chartOptions':{
                 'title':widgetTitle,
                 'height':250,
                 'width':350
              }
            }
        ).render();
     }
     else {
         document.getElementById("wrappersPreviewArea").innerHTML = "";
     }
  }); 

  $("#areaCompare").change(function (e) {
      var ids = TABLE_ID;
      var areaMetric = $("#areaMetrics").val();
      var areaCompare = $("#areaCompare").val();
      var metrics = getMetrics( areaMetric, areaCompare);
      var widgetTitle = $("#widgetTitleArea").val();

      var pattern =new RegExp("none");

      if( !pattern.test(areaMetric))  {
        var div = "wrappersPreviewArea";
        var chart = new gadash.GaAreaChart( div, ids, metrics,
            {'query': {
               'start-date':start_date,
               'end-date':end_date
             },
             'chartOptions':{
                 'title':widgetTitle,
                 'height':250,
                 'width':350
              }
            }
        ).render();
      }
     else {
         document.getElementById("wrappersPreviewArea").innerHTML = "";
     }
  }); 

  $("#columnMetrics").change(function (e) {
      var ids = TABLE_ID;
      var columnMetric = $("#columnMetrics").val();
      var columnCompare = $("#columnCompare").val();
      var metrics = getMetrics( columnMetric, columnCompare);
      var widgetTitle = $("#widgetTitleColumn").val();

      var pattern =new RegExp("none");

      if( !pattern.test(columnMetric))  {
        var div = "wrappersPreviewColumn";
        var chart = new gadash.GaColumnChart( div, ids, metrics,
            {'query': {
               'start-date':start_date,
               'end-date':end_date
             },
             'chartOptions':{
                 'title':widgetTitle,
                 'height':250,
                 'width':350
              }
            }
        ).render();
  $("#" + editOption ).show(); 

     }
     else {
         document.getElementById("wrappersPreviewColumn").innerHTML = "";
     }
  }); 

  $("#columnCompare").change(function (e) {
      var ids = TABLE_ID;
      var columnMetric = $("#columnMetrics").val();
      var columnCompare = $("#columnCompare").val();
      var metrics = getMetrics( columnMetric, columnCompare);
      var widgetTitle = $("#widgetTitleColumn").val();

      var pattern =new RegExp("none");

      if( !pattern.test(columnMetric))  {
        var div = "wrappersPreviewColumn";
        var chart = new gadash.GaColumnChart( div, ids, metrics,
            {'query': {
               'start-date':start_date,
               'end-date':end_date
             },
             'chartOptions':{
                 'title':widgetTitle,
                 'height':250,
                 'width':350
              }
            }
        ).render();
      }
     else {
         document.getElementById("wrappersPreviewColumn").innerHTML = "";
     }
  }); 


   $("#barMetrics").change(function (e) {
      var ids = TABLE_ID;
      var barMetric = $("#barMetrics").val();
      var barCompare = $("#barCompare").val();
      var metrics = getMetrics( barMetric, barCompare);
      var widgetTitle = $("#widgetTitleBar").val();

      var pattern =new RegExp("none");

      if( !pattern.test(barMetric))  {
        var div = "wrappersPreviewBar";
        var chart = new gadash.GaBarChart( div, ids, metrics,
            {'query': {
               'start-date':start_date,
               'end-date':end_date
             },
             'chartOptions':{
                 'title':widgetTitle,
                 'height':250,
                 'width':350
              }
            }
        ).render();
     }
     else {
         document.getElementById("wrappersPreviewBar").innerHTML = "";
     }
  }); 

  $("#barCompare").change(function (e) {
      var ids = TABLE_ID;
      var barMetric = $("#barMetrics").val();
      var barCompare = $("#barCompare").val();
      var metrics = getMetrics( barMetric, barCompare);
      var widgetTitle = $("#widgetTitleBar").val();

      var pattern =new RegExp("none");

      if( !pattern.test(barMetric))  {
        var div = "wrappersPreviewBar";
        var chart = new gadash.GaBarChart( div, ids, metrics,
            {'query': {
               'start-date':start_date,
               'end-date':end_date
             },
             'chartOptions':{
                 'title':widgetTitle,
                 'height':250,
                 'width':350
              }
            }
        ).render();
      }
     else {
         document.getElementById("wrappersPreviewBar").innerHTML = "";
     }
  }); 

    $("#columnMetrics").change(function (e) {
      var ids = TABLE_ID;
      var columnMetric = $("#columnMetrics").val();
      var columnCompare = $("#columnCompare").val();
      var metrics = getMetrics( columnMetric, columnCompare);
      var widgetTitle = $("#widgetTitleColumn").val();

      var pattern =new RegExp("none");

      if( !pattern.test(columnMetric))  {
        var div = "wrappersPreviewColumn";
        var chart = new gadash.GaColumnChart( div, ids, metrics,
            {'query': {
               'start-date':start_date,
               'end-date':end_date
             },
             'chartOptions':{
                 'title':widgetTitle,
                 'height':250,
                 'width':350
              }
            }
        ).render();
     }
     else {
         document.getElementById("wrappersPreviewColumn").innerHTML = "";
     }
  }); 

  $("#columnCompare").change(function (e) {
      var ids = TABLE_ID;
      var columnMetric = $("#columnMetrics").val();
      var columnCompare = $("#columnCompare").val();
      var metrics = getMetrics( columnMetric, columnCompare);
      var widgetTitle = $("#widgetTitleColumn").val();

      var pattern =new RegExp("none");

      if( !pattern.test(columnMetric))  {
        var div = "wrappersPreviewColumn";
        var chart = new gadash.GaColumnChart( div, ids, metrics,
            {'query': {
               'start-date':start_date,
               'end-date':end_date
             },
             'chartOptions':{
                 'title':widgetTitle,
                 'height':250,
                 'width':350
              }
            }
        ).render();
      }
     else {
         document.getElementById("wrappersPreviewColumn").innerHTML = "";
     }
  }); 


  function addLineChart( metrics, widgetTitle){
      var ids = TABLE_ID;
      var div = chartLocation;
      var lineMetric = $("#lineMetrics").val();
      var filterDimension = $("#line_filter_dimension").val();
      var filterMatching = $("#line_filter_matching").val();
      var pattern =new RegExp("none");

      if( !pattern.test(lineMetric))  {
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
               'title':widgetTitle,
               'height':250,
               'width':350
          }
      }).render();
      HideDialog();
      $("#" + editOption ).show(); 
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
               'title':widgetTitle,
               'height':250,
               'width':350
          }
      }).render();
      $("#" + editOption ).show(); 
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
               'title':widgetTitle,
               'height':250,
               'width':350
          }
      }).render();
      $("#" + editOption ).show(); 
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
               'title':widgetTitle,
               'height':250,
               'width':350
          }
      }).render();
      $("#" + editOption ).show(); 
      HideDialog();
  };


  $('#menu').tabs();

  $("#line_filter_fields").hide();

  $(function () {
    $('#lineFilter').click(function () {
      $('#line_filter_fields').toggle();
    });
  })
});

