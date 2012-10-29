  /**
   * This javascript file allow this given user to connect to Google
   * Analytics and visualize Google store analytics data in five
   * different charts using three new wrappers functions that has
   * been added to gadash-1.0.js
   */
    
	
   /**
    * @author
    * Laurent Jacquot, laurent1jacquot@gmail.com
    */
    
    
   /**
    * Configure  parameters
    */
    var API_KEY = 'AIzaSyBHdmGxfoKdVdKAb9hQJbqNJnlKYZ-Mwms';
    var CLIENT_ID = '678812203795.apps.googleusercontent.com';
    var TABLE_ID = 'ga:1174';

    gadash.configKeys({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID
    });
 
 
   /**
    * Visits over the last 30 days in the United States
    * Uses the line chart wrapper: GaLineChart
    */
	var ids = TABLE_ID;
    var div='Line_now';
    var metrics='ga:visitors';    
    var chartVisitDuration = new gadash.GaLineChart( div, ids, metrics,
                                            {'last-n-days': 5,
											 'chartOptions':{
												'title':'Visits over the last 30 days in the United States'
											  }
											}
                                        ).render();

    
	/**
     *Average Visit Duration over the last 15 days in the United States
     *Uses the Area chart wrapper: GaAreaChart
     */
     var div = 'Area_now';
	 var metrics='ga:avgTimeOnSite';
     var chartVisitDurationArea = new gadash.GaAreaChart( div, ids, metrics,
                                      {'last-n-days': 9,
                                       'query':{
                                          'dimensions':'ga:date',
                                          'filters':'ga:country==United States',
                                          'sort': '-ga:date'
                                        },
                                       'chartOptions':{
                                          'title':'Average Visit Duration in the United States'
                                        }
                                      }
                                  ).render();
		
		
   /**
    *Bounce Rate per source in Descending order in Irvine
    *Uses the pie chart wrapper: GaPieChart
    */
    var div='Pie_now';
    var metrics='ga:visitBounceRate';  
    var chartBounceRateSource = new gadash.GaPieChart( div, ids, metrics,
                                     {'last-n-days': 5,
                                      'query':{
                                         'dimensions':'ga:source',
                                         'filters':'ga:city==Irvine',
                                         'sort': '-ga:visitBounceRate'
                                       },
                                      'chartOptions':{
                                         'title':'Bounces Rate per source'
                                       }
                                     }
                                 ).render(); 

    
   /**
    *Average Visit Duration in the United States
    *Uses the bar chart wrapper: GaBarChart
    */
    var div='Bar_now';
    var metrics='ga:avgTimeOnSite';    
    var chartVisitDuration = new gadash.GaBarChart( div, ids, metrics,
                                     {'last-n-days': 6,
                                      'query':{
                                         'filters':'ga:country==United States',
                                         'sort': '-ga:date'
                                       },
                                      'chartOptions':{
                                         'title':'Average Visit Duration in the United States'
                                       }
                                     }
                                 ).render(); 
    
	
	/**
    * Insert a column chart wrapper
    * Uses column chart wrapper: GaColumnChart
    */ 
    var div = 'Column_now';
    var chartVisitDurationColumn = new gadash.GaColumnChart( div, ids, metrics,
                                     {'last-n-days': 6,
                                      'query':{
                                         'dimensions':'ga:date',
                                         'filters':'ga:country==United States',
                                         'sort': '-ga:date'
                                       },
                                      'chartOptions':{
                                         'title':'Average Visit Duration in the United States'
                                       }
                                     }
                                 ).render();


                            