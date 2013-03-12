

var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

  
// This function is called after the Client Library has finished loading
$(document).ready(function () {function handleClientLoad() {
  // 1. Set the API Key
  gapi.client.setApiKey(API_KEY);

  // 2. Call the function that checks if the user is Authenticated. This is defined in the next section
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  // Call the Google Accounts Service to determine the current user's auth status.
  // Pass the response to the handleAuthResult callback function
  gapi.auth.authorize({client_id: CLIENT_ID, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  if (authResult) {
    // The user has authorized access
    // Load the Analytics Client. This function is defined in the next section.
    loadAnalyticsClient();
  } else {
    // User has not Authenticated and Authorized
    handleUnAuthorized();
  }
}


// Authorized user
function handleAuthorized() {
makeApiCall();
}


// Unauthorized user
function handleUnAuthorized() {
alert(You don't have authorized access");

}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}


function loadAnalyticsClient() {
  // Load the Analytics client and set handleAuthorized as the callback function
  gapi.client.load('analytics', 'v3', handleAuthorized);
}
var count; 
var index = 0; 
var newElement = {};

function makeApiCall() {
  queryAccounts();
}

function queryAccounts() {

  // Get a list of all Google Analytics accounts for this user
  gapi.client.analytics.management.accounts.list().execute(handleAccounts);
}


function handleAccounts(results) {
  if (!results.code) {
    if (results && results.items && results.items.length) {

      // Get the first Google Analytics account
	
	count = results.items.length; 
      var firstAccountId = results.items[index].id;

      // Query for Web Properties
      queryWebproperties(firstAccountId);

    } else {
      console.log('No accounts found for this user.')
    }
  } else {
    console.log('There was an error querying accounts: ' + results.message);
  }
}

function queryWebproperties(accountId) {

  // Get a list of all the Web Properties for the account
  gapi.client.analytics.management.webproperties.list({'accountId': accountId}).execute(handleWebproperties);
}

function handleWebproperties(results) {
  if (!results.code) {
    if (results && results.items && results.items.length) {
      // Get the first Google Analytics account
      var firstAccountId = results.items[0].accountId;

      // Get the first Web Property ID
      var firstWebpropertyId = results.items[0].id;

      // Query for Profiles
      queryProfiles(firstAccountId, firstWebpropertyId);

    } else {
      console.log('No webproperties found for this user.');
    }
  } else {
    console.log('There was an error querying webproperties: ' + results.message);
  }
}

function queryProfiles(accountId, webpropertyId) {

  // Get a list of all Profiles for the first Web Property of the first Account
  gapi.client.analytics.management.profiles.list({
      'accountId': accountId,
      'webPropertyId': webpropertyId
  }).execute(handleProfiles);

}

//global array

var data = new Array();


function handleProfiles(results) {
  if (!results.code) {
    if (results && results.items && results.items.length) {

      // Get the first Profile ID
      var firstProfileId = results.items[0].id;

      // Step 3. Query the Core Reporting API
      queryCoreReportingApi(firstProfileId);


    } else {
      console.log('No profiles found for this user.');
    }
  } else {
    console.log('There was an error querying profiles: ' + results.message);
  }
	
		var id = results.items[0].id;
		var name = results.items[0].name;
		var url = results.items[0].websiteUrl;

		console.log(url+ name + url); 
		data.push(id);
		data.push(url);
		data.push(name);
}


function queryCoreReportingApi(profileId) {

  // Use the Analytics Service Object to query the Core Reporting API
  gapi.client.analytics.data.ga.get({
    'ids': 'ga:' + profileId,
    'start-date': '2012-03-03',
    'end-date': '2012-03-03',
    'metrics': 'ga:visits'
  }).execute(handleCoreReportingResults);
}

function handleCoreReportingResults(results) {
  if (results.error) {
    console.log('There was an error querying core reporting API: ' + results.message);
  } else {
	
	index ++;

		if (index == count) {
					console.log(data); 
					console.log(data.length);
					arrayToObject(data); 

				return;
				}

    printResults(results);
  }
}

function printResults(results) {
  if (results.rows && results.rows.length) {
	  queryAccounts();


  } else {
 
	
  }
}


function arrayToObject (data) {

	var length = data.length;
	
	for (var i =0; i<length; i++){
		
		 data.sort()
			console.log(data);
		var id = data[i];
		data.splice(i, 1);
		var url = data[i];
		data.splice(i, 1);
		var name = data[i];
		createJSON(id,url,name);

		length = data.length;
  }
					

}
	


		function createJSON (id,url,name){
		//Creates the item
			var itemval= '<option id='+"selectedId"+' value='+id+'>'+name+'</option>';
				
				//Appends it within your select element
			$("#selectTableID").append(itemval);
				
	
				

    }


});