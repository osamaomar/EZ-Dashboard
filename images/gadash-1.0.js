// Copyright 2012 Google Inc. All Rights Reserved.

/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @author
 * Shan Aminzadeh, shan.aminzadeh@gmail.com
 * Arya Bondarian, aryabond@gmail.com
 * Albert Gau, agau@uci.edu
 * Travis Lai, travisrlai@gmail.com
 * Daniel Nguyen, danielnuwin@gmail.com
 * Nick Mihailovski, api.nickm@gmail.com
 * Laurent Jacquot, laurent1jacquot@gmail.com
 * Osama Ahmad, ooahmad@gmail.com
 *
 * @fileoverview
 * This library is designed to create an easier way to build a custom
 * Google Analytics Dashboard by visualizing data from Google Analytics
 * API with the Google Chart Tools.
 */


/**
 * Loads the core chart and table from the Google Visualization.
 */
 google.load('visualization', '1', {'packages': ['corechart', 'table']});


/**
 * Create namespace for this library if not already created.
 */
 var gadash = gadash || {};


/**
 * Namespace for util object. Contains lots of library utilities.
 */
 gadash.util = gadash.util || {};

 
 /**
 * Namespace for gviz object. Contains objects on the way charts are
 * displayed.
 */
 gadash.gviz = gadash.gviz || {};

 
/**
 * Boolean that checks to see if gapi client is loaded.
 */
gadash.isLoaded = false;


/**
 * Refers to the Google Analytics API scope that the user will need
 * authentication for.
 * @const {String}
 */
gadash.SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';


/**
 * List of functions that are queued for execution. This is only used
 * until all the libraries have fully loaded.
 * @type {Array}
 */
gadash.commandQueue = [];


/**
 * Hold the DataTable for the creation of charts
 * @type {DataTable}
 */
gadash.dTable = {};


/**
 * Callback executed once the Google APIs Javascript client library has loaded.
 * The function name is specified in the onload query parameter of URL to load
 * this library. After 1 millisecond, checkAuth is called.
 */
window.gadashInit = function() {
  gapi.client.setApiKey(gadash.apiKey);
  window.setTimeout(gadash.checkAuth, 1);
};


/**
 * Sets the API key and Client ID passed by the user.
 * This information can be found in your Google API Console.
 * @param {Object} settings - Contains the API Key and Client ID variables.
 */
gadash.configKeys = function(settings) {
  gadash.apiKey = settings.apiKey;
  gadash.clientId = settings.clientId;
};


/**
 * Uses the OAuth2.0 clientId to query the Google Accounts service
 * to see if the user has authorized. Once complete, handleAuthResults is
 * called.
 */
gadash.checkAuth = function() {
  gapi.auth.authorize({
    client_id: gadash.clientId,
    scope: gadash.SCOPE,
    immediate: true}, gadash.handleAuthResult);
};


/**
 * Handler that is called once the script has checked to see if the user has
 * authorized access to their Google Analytics data. If the user has authorized
 * access, the analytics api library is loaded and the handleAuthorized
 * function is executed. If the user has not authorized access to their data,
 * the handleUnauthorized function is executed.
 * @param {Object} authResult The result object returned form the authorization
 *     service that determine whether the user has currently authorized access
 *     to their data. If it exists, the user has authorized access.
 */
gadash.handleAuthResult = function(authResult) {
  if (authResult) {
    gapi.client.setApiVersions({'analytics': 'v3'});
    gapi.client.load('analytics', 'v3', gadash.handleAuthorized);
  } else {
    gadash.handleUnAuthorized();
  }
};


/**
 * Updates the UI once the user has authorized this script to access their
 * data by hiding the authorize button. Also, runs executeCommandQueue
 * function to render all charts in the commandQueue. The execution of the
 * command queue only happens once.
 */
gadash.handleAuthorized = function() {
  var authorizeButton = document.getElementById('authorize-button');
  authorizeButton.style.visibility = 'hidden';

  gadash.isLoaded = true;
  gadash.executeCommandQueue();
};


/**
 * Updates the UI if a user has not yet authorized this script to access
 * their Google Analytics data. This function changes the visibility of
 * some elements on the screen. It also adds the handleAuthClick
 * click handler to the authorize-button.
 */
gadash.handleUnAuthorized = function() {
  var authorizeButton = document.getElementById('authorize-button');
  authorizeButton.style.visibility = '';
  authorizeButton.onclick = gadash.handleAuthClick;
};


/**
 * Checks to see if user is authenticated, calls handleAuthResult
 * @return {boolean} false.
 * @param {Object} event - event when button is clicked.
 */
gadash.handleAuthClick = function(event) {
  gapi.auth.authorize({
    client_id: gadash.clientId,
    scope: gadash.SCOPE,
    immediate: false}, gadash.handleAuthResult);
  return false;
};


/**
 * Iterates through all commands on the commandQueue and executes them.
 */
gadash.executeCommandQueue = function() {
  for (var i = 0, command; command = gadash.commandQueue[i]; ++i) {
    command();
  }
};


/**
 * A Chart object is the primary object in this library.
 * A Chart accepts an optional configuration object that contains all the
 * parameters of the chart. Also changes start and end date of
 * the query, if last-n-days is set in the opt_config.
 * @param {?Object} opt_config - Contains all configuration variables
 *     of a Chart object. This parameter is passed by value, and a deep
 *     copy is made. Once set, the original object can be modified and
 *     it will not affect this object.
 * @return {Object} this Returns a reference to the newly instantiated
 *     Chart instance. Useful for chaining methods together.
 * @constructor
 */
gadash.Chart = function(opt_config) {
  /**
   * The main configuration object.
   * @type {Object}
   */
  this.config = {};

  if (opt_config) {
    gadash.util.extend(opt_config, this.config);
  }

  return this;
};


/**
 * Extends the values in the chart's config object with the keys in
 * the config parameters. If a key in config already exists in the chart,
 * and the value is not an object, the new value overwrites the old.
 * @param {Object} config The config object to set inside this object.
 * @return {Object} The current instance of the Chart object. Useful
 *     for chaining methods.
 */
gadash.Chart.prototype.set = function(config) {
  gadash.util.extend(config, this.config);
  return this;
};


/**
 * First checks to see if the GA library is loaded. If it is then the
 * chart can be rendered right away. Otherwise, other operations are queued,
 * so the render command is pushed to the command queue to be executed in
 * the same order as originally called.
 * @this Points to the current chart instance.
 * @return {Object} The current instance of this chart object. Useful for
 *     chaining methods.
 */
gadash.Chart.prototype.render = function() {

  // If the client library has loaded.
  if (gadash.isLoaded) {
    this.renderFunction();
  } else {
    var renderFunction = gadash.util.bindMethod(this, this.renderFunction);
    gadash.commandQueue.push(renderFunction);
  }

  return this;
};


/**
 * Makes a request to the Google Analytics API.
 * Updates the start and end date if last-n-days
 * has been set. The function also creates and executes a Google Analytics
 * API request using the Chart objects callback method. The callback
 * is bound to the Chart instance so a reference back to this chart is
 * maintained within the callback.
 */
gadash.Chart.prototype.renderFunction = function() {

  //Update the start and end dates based on last n days.
  if (this.config['last-n-days']) {
    this.config.query['end-date'] = gadash.util.lastNdays(0);
    this.config.query['start-date'] =
        gadash.util.lastNdays(this.config['last-n-days']);
  }

  var request = gapi.client.analytics.data.ga.get(this.config.query);
  request.execute(gadash.util.bindMethod(this, this.callback));
};



/**
 * Callback function that is called after a GA query is executed.
 * First, the function checks to see if there are any errors on the
 * response. Then check to see if a onSuccess function was declared
 * in the config. If present, call onSuccess by first binding it to
 * this (ie this chart object instance). If not defined, just use
 * the default callback. The entire JSON response from the API
 * is passed to either defined or default callback.
 * @param {Object} response - Google Analytics API JSON response.
 */
gadash.Chart.prototype.callback = function(response) {
  if (response.error) {
    this.defaultOnError(response.error.code + ' ' + response.error.message);
  } else {

    if (this.config.onSuccess) {
      gadash.util.bindMethod(this, this.config.onSuccess)(response);
    } else {
      this.defaultOnSuccess(response);
    }
  }
};


/**
 * Checks to see if onError parameter is set in config. If it is,
 * use the user defined error function else check to see if an error
 * div is created. If not, create an error div. Print error message
 * to the error div.
 * @param {String} message - error message to print.
 */
gadash.Chart.prototype.defaultOnError = function(message) {

  // If onError param exists, use that as error handling function.
  if (this.config.onError) {
    this.config.onError(message);
  } else {

    var errorDiv = document.getElementById('errors');

    // Create error div if not already made.
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.style.color = 'red';
      errorDiv.setAttribute('id', 'errors');
      errorDiv.innerHTML = 'ERRORS:' + '<br />';
      document.body.appendChild(errorDiv);
    }

    // Prints chart divContainer and message to error div.
    errorDiv.innerHTML += this.config.divContainer + ' error: ' +
        message + '<br />';
  }
};


/**
 * Default callback for creating Google Charts with a response. First, the
 * response is put into a DataTable object Second, the corresponding chart
 * is returned. The two are then combined to draw a chart that is populated
 * with the GA data.
 * @param {Object} resp - A Google Analytics API JSON response.
 */
gadash.Chart.prototype.defaultOnSuccess = function(resp) {
  var dataTable = gadash.util.getDataTable(resp, this.config.type);
  gadash.dTable = dataTable;
  var isStrDate = new String(gadash.dTable.getValue(0, 0));
  var datePattern = /^(20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;
  if (isStrDate.search(datePattern) == 0) {
      gadash.util.convertToMMMd();
  }
  var chart = gadash.util.getChart(this.config.divContainer, this.config.type);
  var dateFormatter = new google.visualization.DateFormat({ pattern: 'MMM d' });
  dateFormatter.format(dataTable, 0);
  gadash.util.draw(chart, dataTable, this.config.chartOptions);
};


/**
 * Takes the first column of the dataTable and change its values to dates
 * in a String format composed of 3 letters representing the month followed
 * by a space and 1 or 2 digits representing the day of the month
 */
gadash.util.convertToMMMd = function() {
   var numberOfRows = gadash.dTable.getNumberOfRows();
   for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      gadash.dTable.setValue(
         rowIndex, 0, gadash.util.stringDateToString(
            gadash.dTable.getValue(rowIndex, 0)
         )
      );
   }
};


/**
 * Converts a String composed of 8 digits representing a date into a String
 * composed of 3 letters representing the month followed by a space and
 * 1 or 2 digits representing the day of the month
 * @param {String} date - 8 digits in the following format: YYYYMMDD.
 * @return {String} date - in the format: MMM D.
 */
gadash.util.stringDateToString = function(date) {
  var datePattern = /^(20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;
  if (date.search(datePattern) == 0) {
     var month = date.substring(4, 6);
     switch (month) {
        case '01': month = 'Jan';
                   break;
        case '02': month = 'Feb';
                   break;
        case '03': month = 'Mar';
                   break;
        case '04': month = 'Apr';
                   break;
        case '05': month = 'May';
                   break;
        case '06': month = 'Jun';
                   break;
        case '07': month = 'Jul';
                   break;
        case '08': month = 'Aug';
                   break;
        case '09': month = 'Sep';
                   break;
        case '10': month = 'Oct';
                   break;
        case '11': month = 'Nov';
                   break;
        case '12': month = 'Dec';
                   break;
     }
     var day = date.substring(6, 8);
     if (day < 10) {
        day = day.substring(1, 2);
     }
     date = month + ' ' + day;
  }
  return date;
};


/**
 * Creates a DataTable object using a GA response.
 * @param {Object} resp - A Google Analytics response.
 * @param {?String} opt_chartType - The chart type. Provides a hint on
 *     how to parse the API results into a data table.
 * @return {Object} data - A Google DataTable object populated
 * with the GA response data.
 * @constructor
 */
gadash.util.getDataTable = function(resp, opt_chartType) {

  var chartType = opt_chartType || false;

  var data = new google.visualization.DataTable();
  var numOfColumns = resp.columnHeaders.length;
  var numOfRows;

  // Throw an error if there are no rows returned.
  if (resp.rows && resp.rows.length) {
    numOfRows = resp.rows.length;
  } else {
    this.defaultOnError('No rows returned for that query.');
  }

  /*
   * Looks at the resp column headers to set names and types for each column.
   * Since bar and column chart don't support date object, set type as string
   * rather than a Date.
   */
  for (var i = 0; i < numOfColumns; i++) {
    var dataType = resp.columnHeaders[i].dataType;
    var name = resp.columnHeaders[i].name;

    if (name == 'ga:date' &&
        !(chartType == 'ColumnChart' || chartType == 'BarChart')) {

      dataType = 'date';
    } else if (dataType == 'STRING') {
      dataType = 'string';
    } else {
      dataType = 'number';
    }
    data.addColumn(dataType, gadash.util.formatGAString(name));
  }

  /*
   * Populates the rows by using the resp.rows array. If the type
   * is an int then parse the INT. If it is a percent, then round
   * to last two decimal places and store as INT.
   */
  for (var i = 0; i < numOfRows; i++) {
    var arrayMetrics = [];
    for (var j = 0; j < numOfColumns; j++) {
      var name = resp.columnHeaders[j].name;
      var dataType = resp.columnHeaders[j].dataType;

      if (name == 'ga:date' &&
          !(chartType == 'ColumnChart' || chartType == 'BarChart')) {

        arrayMetrics.push(gadash.util.stringToDate(resp.rows[i][j]));
      } else if (dataType == 'INTEGER') {
        arrayMetrics.push(parseInt(resp.rows[i][j]));
      } else if (dataType == 'CURRENCY') {
        arrayMetrics.push(parseFloat(resp.rows[i][j]));
      } else if (dataType == 'PERCENT' || dataType == 'TIME' ||
          dataType == 'FLOAT') {
        arrayMetrics.push(Math.round((resp.rows[i][j]) * 100) / 100);
      } else {
        arrayMetrics.push(resp.rows[i][j]);
      }
    }
    data.addRow(arrayMetrics);
  }

  /*
   * Iterates through each column in the data table and formats
   * any column that has a CURRENCY datatype to two decimal places
   * and a '$' before the amount.
   */
  for (var i = 0; i < numOfColumns; i++) {
    var dataType = resp.columnHeaders[i].dataType;
    if (dataType == 'CURRENCY') {
      var formatter = new google.visualization.NumberFormat(
          {fractionDigits: 2});
      formatter.format(data, i);
    }
  }

  return data;
};


/**
 * Checks to see if the type of chart in the config is valid.
 * If it is, get its chart instance, else return a Table instance.
 * @param {String} id The ID of the HTML element in which to render
 *     the chart.
 * @param {String} chartType The type of the Chart to render.
 * @return {Object} visualization - returns the Chart instance.
 */
gadash.util.getChart = function(id, chartType) {
  var elem = document.getElementById(id);

  if (google.visualization[chartType]) {
    return new google.visualization[chartType](elem);
  }

  return new google.visualization.Table(elem);
};


/**
 * Draws a chart to its declared div using a DataTable.
 * @param {Object} chart - The Chart instance you wish to draw the data into.
 * @param {Object} dataTable - The Google DataTable object holding
 *     the response data.
 * @param {Object} chartOptions - The optional configuration parameters to pass
 *     into the chart.
 */
gadash.util.draw = function(chart, dataTable, chartOptions) {
  chart.draw(dataTable, chartOptions);
};


/**
 * Binds a method to its object.
 * @param {Object} object The main object to bind to.
 * @param {Object} method The method to bind to the object.
 * @return {function} the function passed in boound to the object parameter.
 */
gadash.util.bindMethod = function(object, method) {
  return function() {
    return method.apply(object, arguments);
  };
};


/**
 * Utility method to return the lastNdays from today in the format yyyy-MM-dd.
 * @param {Number} n The number of days in the past from tpday that we should
 *     return a date. Value of 0 returns today.
 * @return {String} date - The adjusted date value represented as a String.
 */
gadash.util.lastNdays = function(n) {
  var today = new Date();
  var before = new Date();
  before.setDate(today.getDate() - n);

  var year = before.getFullYear();

  var month = before.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  var day = before.getDate();
  if (day < 10) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
};


/**
 * Utility method to return Date from a String in the format yyyy-MM-dd.
 * This function is used for a Chart that has a Time Series.
 * @param {String} date - The String representation of the date.
 * @return {Date} date - Corresponding JS Date object.
 */
gadash.util.stringToDate = function(date) {
  var year = date.substring(0, 4);
  var month = date.substring(4, 6);
  var day = date.substring(6, 8);

  if (month < 10) {
    month = month.substring(1, 2);
  }

  month = month - 1;

  if (day < 10) {
    day = day.substring(1, 2);
  }

  var dateObj = new Date(year, month, day);
  return dateObj;
};


/**
 * Formats the Google Metrics and Dimensions into readable strings
 * Strips away the 'ga' and capitalizes first letter. Also puts a space
 * between any lowercase and capital letters.
 * ie: "ga:percentNewVisits" ---> "Percent New Visits"
 * @param {String} gaString - the String name of Metric/Dimension from GA.
 * @return {String} newString - Metric/Dimension formatted nicely.
 */
gadash.util.formatGAString = function(gaString) {
  var newString = gaString.substring(3);
  newString = newString.charAt(0).toUpperCase() + newString.slice(1);

  // Check for a capital letter in the string. If found,
  // put a space between that char and the char before it.
  for (var i = 1; i < newString.length; i++) {
    if (newString.charAt(i) == newString.charAt(i).toUpperCase()) {
      var left = newString.substring(0, i);
      var right = newString.substring(i, newString.length);
      newString = [left, right].join(' ');
      i++;
    }
  }

  return newString;
};


/**
 * Recursively copies the values in the from object into the to object.
 * If a key in from object already exists, and has child values,
 * the child values are copied over. So:
 *     extend({'a': {'b': 2}}, {'a': {'c': 1}}) will result in:
 *     {'a': {'b': 2, 'c': 1}}
 * Once run, modifying the from object will not impact the to object.
 * NOTE: Arrays will write over each other.
 * NOTE: This is unsafe in that circular references are not checked. Calling
 * this method with a circular reference could cause an infinite loop.
 * @param {Object} from The object to copy values from.
 * @param {Object} to The object to copy values into.
 */
gadash.util.extend = function(from, to) {
  for (var key in from) {
    var type = gadash.util.getType(from[key]);
    if (type == 'object') {
      to[key] = to[key] || {};
      gadash.util.extend(from[key], to[key]);
    } else {
      to[key] = from[key];
    }
  }
};


/**
 * Returns the native type (class property) of this object.
 * General idea grabbed from here:
 * http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
 * Per ECMA-262:
 *
 *     15.2.4.2 Object.prototype.toString ( )
 *     When the toString method is called, the following steps are taken:
 *     1. Get the [[Class]] property of this object.
 *     2. Compute a string value by concatenating the three
 *        strings "[object ", | Result(1), and "]".
 *     3. Return Result(2).
 *
 * @param {Object} value Any type.
 * @return {String} The lower class property of the object. Undefined if value
 *     is undefined or null.
 */
gadash.util.getType = function(value) {
  var classStringName = Object.prototype.toString.call(value);
  return ({
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regex',
    '[object Object]' : 'object'
  })[classStringName];
};


/**
 * Checks the date of a wrapper.
 * if opt_config has no end-date, no start-date, and no last-n-days
 * the default value for date is set to the last 30 days
 * @param {Object} chart - contains an instance of a chart object.
 */
gadash.util.checkDate = function(chart) {
   if (!chart.config.query['end-date'] &&
       !chart.config.query['start-date'] &&
       !chart.config['last-n-days']) {
          chart.set({'last-n-days': 30});
    }
};


/**
 * Object containing default value for the chartOptions object.
 * This object is used by all five chart wrappers.
 */
gadash.gviz.defaultChartOptions = {
          'chartOptions': {
             height: 300,
             width: 450,
             fontSize: 12,
             title: 'Demo',
             curveType: 'function',
			 titleTextStyle: {fontName: 'Arial', fontSize: 15, bold: false}
          }
       };


/////////////////////////////////////////////////////////////////////////////
gadash.gviz.lineChart = {
         'type': 'LineChart',
         'chartOptions': {
             pointSize: 6,
             lineWidth: 4,
             areaOpacity: 0.1,
             legend: {position: 'top', alignment: 'start'},
             colors: ['#058dc7'],
             hAxis: {format: 'MMM d', gridlines: {color: 'transparent'},
                    baselineColor: 'transparent'},
             vAxis: {gridlines: {color: '#efefef', logScale: 'true', count: 3},
                    textPosition: 'in'}
          }
       };


/////////////////////////////////////////////////////////////////////////////
gadash.gviz.areaChart = {
         'type': 'AreaChart',
         'chartOptions': {
             pointSize: 6,
             lineWidth: 4,
             areaOpacity: 0.1,
             legend: {position: 'top', alignment: 'start'},
             colors: ['#058dc7'],
             hAxis: {format: 'MMM d', gridlines: {count: 3,
                     color: 'transparent'}, baselineColor: 'transparent'},
             vAxis: {gridlines: {color: '#efefef', logScale: 'true', count: 3},
                     textPosition: 'in'}
          }
       };


/////////////////////////////////////////////////////////////////////////////
gadash.gviz.pieChart = {
         'type': 'PieChart',
         'chartOptions': {
             legend: {position: 'right',
                      textStyle: {bold: 'true', fontSize: 13},
                      alignment: 'center',
                      pieSliceText: 'none'
             }
          }
       };


/////////////////////////////////////////////////////////////////////////////
gadash.gviz.barChart = {
         'type': 'BarChart',
          'chartOptions': {
             legend: {position: 'top', alignment: 'start'},
             colors: ['#058dc7'],
             hAxis: {gridlines: {color: '#efefef', count: 3},
                     minValue: 0, baselineColor: 'transparent'},
             vAxis: {gridlines: {color: 'transparent'}, count: 3,
                     textPosition: 'in'}
          }
       };


/////////////////////////////////////////////////////////////////////////////
gadash.gviz.columnChart = {
         'type': 'ColumnChart',
         'chartOptions': {
             legend: {position: 'top', alignment: 'start'},
             colors: ['#058dc7'],
             hAxis: {gridlines: {count: 3, color: 'transparent'},
                     baselineColor: 'transparent'},
             vAxis: {gridlines: {color: '#efefef', count: 3},
                     minValue: 0, textPosition: 'in'}
          }
       };


/**
 * Line Chart Wrapper
 * gadash.GaLineChart is a subclass of gadash.Chart.
 * GaLineChart declares a configuration object as its super class Chart and
 * attributes default setting specific to line charts.
 * A optional configuration object is passed as a paramter and can override
 * or supplement properties of the configuration object.
 * Following default values are used for this object:
 *     for the dimensions: 'ga:date',
 *     for the start time / date range: 'last-n-days': 30.
 * @param {String} div - contains the <div> tag id value to indicate where
 *     the chart should appear on a webpage.
 * @param {String} ids - contains the TABLE_ID to access analytics data.
 * @param {String} metrics - contains the type of metrics to be used in chart.
 * @param {?Object} opt_config - Contains all configuration variables
 *     of a Chart object. This parameter is passed by value, and a deep
 *     copy is made. Once set, the original object can be modified and
 *     it will not affect this object.
 * @constructor
 */
gadash.GaLineChart = function(div, ids, metrics, opt_config) {

   this.config = {};
   this.set({
         'divContainer': div,
         'query': {
             'ids': ids,
             'metrics': metrics,
             'dimensions': 'ga:date'
          }
       })
       .set(gadash.gviz.defaultChartOptions)
	   .set(gadash.gviz.lineChart)
       .set(opt_config);
   gadash.util.checkDate(this);
};


/**
 * Make GaLineChart a subclass of Chart class using chaining inheritance.
 */
gadash.GaLineChart.prototype = new gadash.Chart();


/**
 * Area Chart Wrapper
 * gadash.GaAreaChart is a subclass of gadash.Chart
 * GaAreaChart declares a configuration object as its super class Chart and
 * attributes default setting specific to line charts.
 * A optional configuration object is passed as a paramter and can override
 * or supplement properties of the configuration object.
 * Following default values are used for this object:
 *     for the dimensions: 'ga:date',
 *     for the start time / date range: 'last-n-days': 30 if opt_config does
 *         not specify the entries.
 * @param {String} div - contains the <div> tag id value to indicate where
 *     the chart should appear on a webpage.
 * @param {String} ids - contains the TABLE_ID to access analytics data.
 * @param {String} metrics - contains the type of metrics to be used in chart.
 * @param {?Object} opt_config - Contains all configuration variables
 *     of a Chart object. This parameter is passed by value, and a deep
 *     copy is made. Once set, the original object can be modified and
 *     it will not affect this object.
 * @constructor
 */
gadash.GaAreaChart = function(div, ids, metrics, opt_config) {

   this.config = {};
   this.set({
         'divContainer': div,
         'query': {
             'ids': ids,
             'metrics': metrics,
             'dimensions': 'ga:date'
          }
       })
       .set(gadash.gviz.defaultChartOptions)
	   .set(gadash.gviz.areaChart)
       .set(opt_config);
   gadash.util.checkDate(this);
};


/**
 * Make GaAreaChart a subclass of Chart class using chaining inheritance.
 */
gadash.GaAreaChart.prototype = new gadash.Chart();


/**
 * Pie Chart Wrapper
 * gadash.GaPieChart is a subclass of gadash.Chart
 * GaPieChart declares a configuration object as its super class Chart and
 * attributes default setting specific to pie charts.
 * A optional configuration object is passed as a paramter and can override
 * or supplement properties of the configuration object.
 * Following default values are used for this object:
 *     for the start time / date range: 'last-n-days': 30.
 * @param {String} div - contains the <div> tag id value to indicate where
 *     the chart should appear on a webpage.
 * @param {String} ids - contains the TABLE_ID to access analytics data.
 * @param {String} metrics - contains the type of metrics to be used in chart.
 * @param {String} dimensions - contains the dimensions to be used in chart.
 * @param {?Object} opt_config - Contains all configuration variables
 *     of a Chart object. This parameter is passed by value, and a deep
 *     copy is made. Once set, the original object can be modified and
 *     it will not affect this object.
 * @constructor
 */
gadash.GaPieChart = function(div, ids, metrics, dimensions, opt_config) {

   this.config = {};
   this.set({
         'divContainer': div,
         'query': {
             'ids': ids,
             'metrics': metrics,
             'dimensions': dimensions
          }
       })
       .set(gadash.gviz.defaultChartOptions)
       .set(gadash.gviz.pieChart)
       .set(opt_config);
   gadash.util.checkDate(this);
};


/**
 * Make GaPieChart a subclass of Chart class using chaining inheritance.
 */
gadash.GaPieChart.prototype = new gadash.Chart();


/**
 * Bar Chart Wrapper
 * gadash.GaBarChart is a subclass of gadash.Chart.
 * GaBarChart declares a configuration object as its super class Chart and
 * attributes default setting specific to line charts.
 * A optional configuration object is passed as a paramter and can override
 * or supplement properties of the configuration object.
 * Following default values are used for this object:
 *     for the dimensions: 'ga:date',
 *     for the start time / date range: 'last-n-days': 30.
 * @param {String} div - contains the <div> tag id value to indicate where
 *     the chart should appear on a webpage.
 * @param {String} ids - contains the TABLE_ID to access analytics data.
 * @param {String} metrics - contains the type of metrics to be used in chart.
 * @param {?Object} opt_config - Contains all configuration variables
 *     of a Chart object. This parameter is passed by value, and a deep
 *     copy is made. Once set, the original object can be modified and
 *     it will not affect this object.
 * @constructor
 */
gadash.GaBarChart = function(div, ids, metrics, opt_config) {
   this.config = {};
   this.set({
         'divContainer': div,
         'query': {
             'ids': ids,
             'metrics': metrics,
             'dimensions': 'ga:date'
          }
       })
       .set(gadash.gviz.defaultChartOptions)
	   .set(gadash.gviz.barChart)
       .set(opt_config);
   gadash.util.checkDate(this);
};


/**
 * Make GaBarChart a subclass of Chart class using chaining inheritance.
 */
gadash.GaBarChart.prototype = new gadash.Chart();


/**
 * Bar Column Wrapper
 * gadash.GaColumnChart is a subclass of gadash.Chart.
 * GaColumnChart declares a configuration object as its super class Chart and
 * attributes default setting specific to line charts.
 * A optional configuration object is passed as a paramter and can override
 * or supplement properties of the configuration object.
 * Following default values are used for this object:
 *     for the dimensions: 'ga:date',
 *     for the start time / date range: 'last-n-days': 30.
 * @param {String} div - contains the <div> tag id value to indicate where
 *     the chart should appear on a webpage.
 * @param {String} ids - contains the TABLE_ID to access analytics data.
 * @param {String} metrics - contains the type of metrics to be used in chart.
 * @param {?Object} opt_config - Contains all configuration variables
 *     of a Chart object. This parameter is passed by value, and a deep
 *     copy is made. Once set, the original object can be modified and
 *     it will not affect this object.
 * @constructor
 */
gadash.GaColumnChart = function(div, ids, metrics, opt_config) {

   this.config = {};
   this.set({
         'divContainer': div,
         'query': {
             'ids': ids,
             'metrics': metrics,
             'dimensions': 'ga:date'
          }
       })
       .set(gadash.gviz.defaultChartOptions)
       .set(gadash.gviz.columnChart)
       .set(opt_config);
   gadash.util.checkDate(this);
};


/**
 * Make GaColumnChart a subclass of Chart class using chaining inheritance.
 */
gadash.GaColumnChart.prototype = new gadash.Chart();
