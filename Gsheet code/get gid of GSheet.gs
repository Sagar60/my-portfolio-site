function doGet(req){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
 // var sheet = ss.getSheets()[0];
  //var sheetId =sheet.getSheetId()
  //Logger.log(sheetId);

  // extracting query parameter
  var sheetName = req.parameter.sheetName;

  // intialize the sheetId
  var sheetId = null;

  // if sheetname given in query
  if(sheetName != null){
    var sheet = ss.getSheetByName(sheetName);
    sheetId=sheet.getSheetId();
  }

  //return response in json
  if(sheetId!=null){
   return ContentService.createTextOutput(JSON.stringify({sheetId: sheetId,  message: "success"})).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({sheetId: sheetId, message: "Invalid sheet name"})).setMimeType(ContentService.MimeType.JSON);

}