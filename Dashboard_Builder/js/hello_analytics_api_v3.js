var count; 
var index = 0; 
var newElement = {};
var allDup = 0;

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
	index++; 
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

    if(allDup > 0 && name == 'All Web Site Data'){
      return;
    }
    else{
		data.push(id);
		data.push(url);
		data.push(name);
    }

    if(name == 'All Web Site Data')
      allDup++;
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

		if (index == count) {
					arrayToObject(data); 

				return "";
		}
    else {

    	  queryAccounts();
    }
  
}


function arrayToObject (data) {

	var length = data.length;
	
	for (var i =0; i<length; i++){
		
		
		var id = data[i];
		data.splice(i, 1);
		var url = data[i];
		data.splice(i, 1);
		var name = data[i];
		createJSON(id,url,name);

		length = data.length;
  }
		sortList();
	TABLE_ID  = $("#selectTableID").val();
 	 	
       TABLE_ID = 'ga:'+TABLE_ID;
}
	


		function createJSON (id,url,name){
			
		//Creates the item
			var itemval= '<option id='+"selectedId"+' value='+id+'>'+name+'</option>';
			
				//Appends it within your select element
			$("#selectTableID").append(itemval);	
    }

function sortList() 
{ 
var lb = document.getElementById('selectTableID'); 
arrTexts = new Array(); 
arrValues = new Array(); 
arrOldTexts = new Array(); 

for(i=0; i<lb.length; i++) 
{ 
arrTexts[i] = lb.options[i].text; 
arrValues[i] = lb.options[i].value; 

arrOldTexts[i] = lb.options[i].text; 
} 

arrTexts.sort(); 

for(i=0; i<lb.length; i++) 
{ 
lb.options[i].text = arrTexts[i]; 
for(j=0; j<lb.length; j++) 
{ 
if (arrTexts[i] == arrOldTexts[j]) 
{ 
lb.options[i].value = arrValues[j]; 
j = lb.length; 
   } 
} 
} 
}
		
