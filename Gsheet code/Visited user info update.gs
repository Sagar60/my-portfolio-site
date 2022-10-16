function doGet(req) {
  var sheetName = 'VisitedUserOnPortal';
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

/*
  const ipAddress	= "test"+Math.random();
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
    //Logger.log(row[0])
    if(row[1].toString().trim().includes(ipAddress)){
      isIPAddressPresent = false;
    }
  })

  if(isIPAddressPresent){
    // append to sheet if data not found
    let cDate = new Date().toLocaleString("en-US", {timeZone: 'Asia/Kolkata'});

    // add value to row
    sheet.appendRow([cDate, ipAddress, continentCode, continentName,countryCode,countryName, stateProv, city]);

    let lastRowIndex = sheet.getDataRange().getValues().length;
    let columnCount = sheet.getDataRange().getValues()[0].length;
    Logger.log( lastRowIndex);
    Logger.log( columnCount);
    for(let i=0; i<columnCount ; i++){
      let cellRangeAddress  = String.fromCharCode(65+i)+(lastRowIndex).toString();
      let cell = sheet.getRange(cellRangeAddress);

      // make border line for the range
      cell.setBorder(true,true,true,true, false, false,'black', SpreadsheetApp.BorderStyle.SOLID);

    }

    Logger.log('success');
    // data appened
    return ContentService.createTextOutput(JSON.stringify({ message: "success"})).setMimeType(ContentService.MimeType.JSON);
  }

  Logger.log('failed');
  // if already data present
  return ContentService.createTextOutput(JSON.stringify({ message: "failed"})).setMimeType(ContentService.MimeType.JSON);
}
