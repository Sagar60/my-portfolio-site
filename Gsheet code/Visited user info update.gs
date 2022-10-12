function doGet(req) {
  var sheetName = 'VisitedUserOnPortal';
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

/*
  const ipAddress	= "103.245.3.19";
  const continentCode	= "AS";
  const continentName	= "Asia";
  const countryCode	= "IN";
  const countryName	= "India";
  const stateProv	= "West Bengal";
  const city = "Kolkata (Kankaria Estates)";
*/
  const ipAddress	= req.parameter.ipAddress;
  const continentCode	=  req.parameter.continentCode;
  const continentName	= req.parameter.continentName;
  const countryCode	=  req.parameter.countryCode;
  const countryName	=  req.parameter.countryName;
  const stateProv	=  req.parameter.stateProv;
  const city =  req.parameter.city;

// append to sheet if ip not present in sheet

  var isIPAddressPresent = true;

  sheet.getDataRange().getValues().slice(1).forEach(function(row){
    Logger.log(row[0])
    if(row[1].toString().trim().includes(ipAddress)){
      isIPAddressPresent = false;
    }
  })

  if(isIPAddressPresent){
    // append to sheet if data not found
    let cDate = new Date().toLocaleString("en-US", {timeZone: 'Asia/Kolkata'});
    sheet.appendRow([cDate, ipAddress, continentCode, continentName,countryCode,countryName, stateProv, city]);

    Logger.log('success');
    // data appened
    return ContentService.createTextOutput(JSON.stringify({ message: "success"})).setMimeType(ContentService.MimeType.JSON);
  }

  Logger.log('failed');
  // if already data present
  return ContentService.createTextOutput(JSON.stringify({ message: "failed"})).setMimeType(ContentService.MimeType.JSON);
}
