   /**
    *This javascript file allow this given user to connect to Google
    *Analytics and visualize Google store analytics data in five
    *different charts using three new wrappers functions that has
    *been added to gadash-1.0.js
    */
    
    /**
     * @author
     * Laurent Jacquot, laurent1jacquot@gmail.com
     */
    
    
   /**
    *Configure  parameters
    */
    var API_KEY = 'AIzaSyBHdmGxfoKdVdKAb9hQJbqNJnlKYZ-Mwms';
    var CLIENT_ID = '678812203795.apps.googleusercontent.com';
    var TABLE_ID = 'ga:1174';

    gadash.configKeys({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID
    });
    
   /**
    *Visits over the last 30 days in the United States
    *Uses the line chart wrapper: GaLineChart
    */
    var div='visitsVolume';
    var ids = TABLE_ID;
    var metrics='ga:visitors';
    
    var chartVisitDuration = new gadash.GaLineChart( div, ids, metrics,
                                            {'last-n-days': 5}
                                        ).render();


   /**
    *Visits per source in Descending order in the United States
    *Uses the pie chart wrapper: GaPieChart
    */
    var div='visitsPerSource';
    var metrics='ga:visits';
    
    var chartVisitsSource = new gadash.GaPieChart( div, ids, metrics,
                                     {'last-n-days': 5,
                                      'query':{
                                         'filters':'ga:country==United States',
                                         'sort': '-ga:visits'
                                       },
                                      'chartOptions':{
                                         'title':'Visits per source in the United States'
                                       }
                                     }
                                 ).render();
    

   /**
    *Bounces per source in Descending order in Irvine, CA
    *Uses the pie chart wrapper: GaPieChart
    */
    var div='bouncesPerSource';
    var metrics='ga:bounces';
    
    var chartBouncesSource = new gadash.GaPieChart( div, ids, metrics,
                                     {'last-n-days': 5,
                                      'query':{
                                         'filters':'ga:city==Irvine',
                                         'sort': '-ga:bounces'
                                       },
                                      'chartOptions':{
                                         'title':'Bounces per source in Irvine'
                                       }
                                     }
                                 ).render();    
 

   /**
    *Bounce Rate per source in Descending order in Irvine
    *Uses the pie chart wrapper: GaPieChart
    */
    var div='bounceRatePerSource';
    var metrics='ga:visitBounceRate';
    
    var chartBounceRateSource = new gadash.GaPieChart( div, ids, metrics,
                                     {'last-n-days': 5,
                                      'query':{
                                         'dimensions':'ga:source',
                                         'filters':'ga:city==Irvine',
                                         'sort': '-ga:visitBounceRate'
                                       },
                                      'chartOptions':{
                                         'title':'Bounces Rate per source in Irvine'
                                       }
                                     }
                                 ).render(); 

    
   /**
    *Average Visit Duration in the United States
    *Uses the bar chart wrapper: GaBarChart
    */
    var div='avgVisitDuration';
    var metrics='ga:avgTimeOnSite';
    
    var chartVisitDuration = new gadash.GaBarChart( div, ids, metrics,
                                     {'last-n-days': 15,
                                      'query':{
                                         'dimensions':'ga:date',
                                         'filters':'ga:country==United States',
                                         'sort': '-ga:date'
                                       },
                                      'chartOptions':{
                                         'height': 600,
                                         'title':'Average Visit Duration in the United States'
                                       }
                                     }
                                 ).render(); 
    /**
    * Insert a column chart wrapper
    * Uses chart wrapper: GaColumnChart
    */ 
    var div = 'column';
    var chartVisitDurationColumn = new gadash.GaColumnChart( div, ids, metrics,
                                     {'last-n-days': 15,
                                      'query':{
                                         'dimensions':'ga:date',
                                         'filters':'ga:country==United States',
                                         'sort': '-ga:date'
                                       },
                                      'chartOptions':{
                                         'height': 420,
                                         'title':'Average Visit Duration in the United States'
                                       }
                                     }
                                 ).render();

     var div = 'areachart';
     var chartVisitDurationArea = new gadash.GaAreaChart( div, ids, metrics,
                                      {'last-n-days': 15,
                                       'query':{
                                          'dimensions':'ga:date',
                                          'filters':'ga:country==United States',
                                          'sort': '-ga:date'
                                        },
                                       'chartOptions':{
                                          'height': 150,
                                          'title':'Average Visit Duration in the United States'
                                        }
                                      }
                                  ).render();

    /*
    * Putting in a geochart
    * options static
    */ 

    google.load('visualization', '1', {'packages': ['geochart']});
     google.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Country', 'METRIC'],
          ['Germany', 200],
          ['United States', 300],
          ['Brazil', 400],
          ['Canada', 500],
          ['France', 600],
          ['RU', 700]
        ]);

        var options = {
          height: 460,
          width: 675,
          colorAxis: {minValue:0, colors: ['#aabbff', '0033aa']}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('geomap'));
        chart.draw(data, options);
    };
                            