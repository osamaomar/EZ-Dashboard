/***************
* for testing
*/



/* 
 * parameters: element: on which we apply the event
 * 			   type: the type of event to apply on the element
 * 			   callback: the function or the reference to the function
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
 * 			   type: the type of event to apply on the element
 * 			   callback: the function or the reference to the function
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


/****************
 * for testing
 */
function addLineChart(){
    var ids = TABLE_ID;
    var div='wrappers1';
    var metrics='ga:visitors';
    var CLine = new gadash.GaLineChart( div, ids, metrics,
                                            {'last-n-days': 5,
											 'chartOptions':{
												'title':'Visits in USA'
											  }
											}
                                        ).render();
};


function addPieChart(){
	var ids = TABLE_ID;
	var div='wrappers2';
    var metrics='ga:visitBounceRate';
	var dimensions='ga:source';
    var cPie = new gadash.GaPieChart( div, ids, metrics, dimensions,
                                     {'last-n-days': 5,
                                      'query':{
                                         'filters':'ga:city==Irvine',
                                         'sort': '-ga:visitBounceRate'
                                       },
                                      'chartOptions':{
                                         'title':'Bounces Rate per source'
                                       }
                                     }
                                 ).render(); 
};


function addAreaChart(){
     var ids = TABLE_ID;
     var div = 'wrappers3';
	 var metrics='ga:visitors';
     var cArea = new gadash.GaAreaChart( div, ids, metrics,
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
};


function addBarChart(){
	var ids = TABLE_ID;
	var div='wrappers4';
    var metrics='ga:avgTimeOnSite';    
    var cBar = new gadash.GaBarChart( div, ids, metrics,
                                     {'last-n-days': 6,
                                      'query':{
                                         'filters':'ga:country==United States'
                                       },
                                      'chartOptions':{
                                         'title':'Average Visit Duration in the United States'
                                       }
                                     }
                                 ).render(); 
};


function addColumnChart(){
    var ids = TABLE_ID;
    var div = 'wrappers5';
    var metrics='ga:avgTimeOnSite'; 
    var cColumn = new gadash.GaColumnChart( div, ids, metrics,
                                     {'last-n-days': 6,
                                      'query':{
                                         'filters':'ga:country==United States'
                                       },
                                      'chartOptions':{
                                         'title':'Average Visit Duration in the United States'
                                       }
                                     }
                                 ).render();
};


// function setMenu(){
// 	id_$('#menu').tabs();
// };


/*
 * Enable to launch or create several events
 */
function initialisation(){
	var API_KEY = 'AIzaSyBHdmGxfoKdVdKAb9hQJbqNJnlKYZ-Mwms';
	var CLIENT_ID = '678812203795.apps.googleusercontent.com';
	var TABLE_ID = 'ga:1174';

	gadash.configKeys({
	    'apiKey': API_KEY,
	    'clientId': CLIENT_ID
	});

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
