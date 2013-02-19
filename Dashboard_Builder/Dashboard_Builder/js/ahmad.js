function queryAccounts() {
  console.log('Querying Accounts.');

  // Get a list of all Google Analytics accounts for this user
  gapi.client.analytics.management.accounts.list().execute(handleAccounts);
}
var i=0; 
var array =""; 

function handleAccounts(results) {
  if (!results.code) {
    if (results && results.items && results.items.length) {
	//console.log(results); 
      // Get the first Google Analytics account
      var firstAccountId = results.items[0].id;
	for (var i=0; i<results.items.length;i++){
	console.log(results); 
}
 


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
  console.log('Querying Webproperties.');

  // Get a list of all the Web Properties for the account
  gapi.client.analytics.management.webproperties.list({'accountId': accountId}).execute(handleWebproperties);
}

function handleWebproperties(results) {
console.log(results); 
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
  console.log('Querying Profiles.');

  // Get a list of all Profiles for the first Web Property of the first Account
  gapi.client.analytics.management.profiles.list({
      'accountId': accountId,
      'webPropertyId': webpropertyId
  }).execute(handleProfiles);
}

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
}
function queryCoreReportingApi(profileId) {
  console.log('Querying Core Reporting API.');

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
    printResults(results);
  }
}

function printResults(results) {
  if (results.rows && results.rows.length) {
    console.log('Profile Name: ', results.profileInfo.profileName);
	console.log(results.query.ids); 
	console.log(i);
	//queryAccounts(); 

  } else {
    console.log('No results found');
  }
}