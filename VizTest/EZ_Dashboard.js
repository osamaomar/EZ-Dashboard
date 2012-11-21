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
 
 

	var ids = TABLE_ID;

    var div='Title1';
    var metrics='ga:visitors';    
    var chartVisitDuration = new gadash.GaColumnChart( div, ids, metrics,
                                            {'last-n-days': 5,
											 'chartOptions':{
												'title':''											  }
											}
                                        ).render();

    var div='Title2';
    var metrics='ga:visitors';    
    var chartVisitDuration = new gadash.GaLineChart( div, ids, metrics,
                                            {'last-n-days': 5,
											 'chartOptions':{
												'title':'This title contains 706 characters: 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
											  }
											}
                                        ).render();

 
    var div='Title3';
    var metrics='ga:visitors';    
    var chartVisitDuration = new gadash.GaBarChart( div, ids, metrics,
                                            {'last-n-days': 5,
											 'chartOptions':{
												'title':'This title contains 2056 characters: 123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
											  }
											}
                                        ).render(); 
										


     var div = 'Color1';
	 var metrics='ga:Visits';
     var chartVisitDurationArea = new gadash.GaAreaChart( div, ids, metrics,
                                      {'last-n-days': 9,
                                       'query':{
                                          'dimensions':'ga:date',
                                          'filters':'ga:country==United States',
                                          'sort': '-ga:date'
                                        },
                                       'chartOptions':{
                                          'title':'the color is red',
										   'colors': ['red']
                                        }
                                      }
                                  ).render();
		
		
	 var div = 'Color2';
	 var metrics='ga:Visits';
     var chartVisitDurationArea = new gadash.GaAreaChart( div, ids, metrics,
                                      {'last-n-days': 9,
                                       'query':{
                                          'dimensions':'ga:date',
                                          'filters':'ga:country==United States',
                                          'sort': '-ga:date'
                                        },
                                       'chartOptions':{
                                          'title':'the color is Red',
										   'colors': ['Red']
                                        }
                                      }
                                  ).render();
								  
								  
	 var div = 'Color3';
	 var metrics='ga:Visits';
     var chartVisitDurationArea = new gadash.GaAreaChart( div, ids, metrics,
                                      {'last-n-days': 9,
                                       'query':{
                                          'dimensions':'ga:date',
                                          'filters':'ga:country==United States',
                                          'sort': '-ga:date'
                                        },
                                       'chartOptions':{
                                          'title':'the color is Reed',
										   'colors': ['Reed']
                                        }
                                      }
                                  ).render();
								  
								  
     var div = 'metrics1';
	 var metrics='';
     var chartVisitDurationArea = new gadash.GaAreaChart( div, ids, metrics,
                                      {'last-n-days': 9,
                                       'query':{
                                          'dimensions':'ga:date',
                                          'filters':'ga:country==United States',
                                          'sort': '-ga:date'
                                        },
                                       'chartOptions':{
                                          'title':'With no metrics'                                        }
                                      }
                                  ).render();
		
		
	 var div = 'metrics2';
	 var metrics='ga:exits,ga:newVisits,ga:visitors,ga:percentNewVisits,ga:visits,ga:bounces,ga:entranceBounceRate,ga:visitBounceRate,ga:avgTimeOnSite,ga:organicSearches';
     var chartVisitDurationArea = new gadash.GaAreaChart( div, ids, metrics,
                                      {'last-n-days': 9,
                                       'query':{
                                          'dimensions':'ga:date',
                                          'filters':'ga:country==United States',
                                          'sort': '-ga:date'
                                        },
                                       'chartOptions':{
                                          'title':'With 10 metrics'                                        }
                                      }
                                  ).render();
								  
								  
	 var div = 'metrics3';
	 var metrics='ga:pageLoadTime,ga:avgPageLoadTime,ga:newVisits,ga:visitors,ga:percentNewVisits,ga:visits,ga:bounces,ga:entranceBounceRate,ga:visitBounceRate,ga:avgTimeOnSite,ga:organicSearches';
     var chartVisitDurationArea = new gadash.GaAreaChart( div, ids, metrics,
                                      {'last-n-days': 9,
                                       'query':{
                                          'dimensions':'ga:date',
                                          'filters':'ga:country==United States',
                                          'sort': '-ga:date'
                                        },
                                       'chartOptions':{
                                          'title':'With 11 metrics'
                                        }
                                      }
                                  ).render();

								  

    var div='metrics4';
	var metrics='ga:exits,ga:newVisits,ga:visitors,ga:percentNewVisits,ga:visits,ga:bounces,ga:entranceBounceRate,ga:visitBounceRate,ga:avgTimeOnSite,ga:organicSearches';
	var dimensions='ga:source';
	
    var chartBounceRateSource = new gadash.GaPieChart( div, ids, metrics, dimensions,
                                     {'last-n-days': 5,
                                      'query':{
                                         'filters':'ga:city==Irvine',
                                         'sort': '-ga:visitBounceRate'
                                       },
                                      'chartOptions':{
                                         'title':'With 10 metrics'
										 }
                                     }
                                 ).render();  

    var div='metrics5';
	var metrics='ga:pageLoadTime,ga:avgPageLoadTime,ga:newVisits,ga:visitors,ga:percentNewVisits,ga:visits,ga:bounces,ga:entranceBounceRate,ga:visitBounceRate,ga:avgTimeOnSite,ga:organicSearches';
	var dimensions='ga:source';
	
    var chartBounceRateSource = new gadash.GaPieChart( div, ids, metrics, dimensions,
                                     {'last-n-days': 5,
                                      'query':{
                                         'filters':'ga:city==Irvine',
                                         'sort': '-ga:visitBounceRate'
                                       },
                                      'chartOptions':{
                                         'title':'With 11 metrics'
										 }
                                     }
                                 ).render(); 

    var div='metrics6';
    var metrics='ga:visitBounceRate';
	var dimensions='ga:source';
	
    var chartBounceRateSource = new gadash.GaPieChart( div, ids, metrics, dimensions,
                                     {'last-n-days': 5,
                                      'query':{
                                         'filters':'ga:city==Irvine',
                                         'sort': '-ga:visitBounceRate'
                                       },
                                      'chartOptions':{
                                         'title':'With 1 metric'
										 }
                                     }
                                 ).render(); 




                            