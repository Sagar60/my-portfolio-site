function doGet(req) {
  try{
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Contact messages');

    var name = req.parameter.name;
    var email = req.parameter.email;
    var messages = req.parameter.message;
    var deviceDetail = req.parameter.deviceDetail;
    var time = req.parameter.time;

    // append row into sheet
    if(name != null && email != null && messages != null){
      sheet.appendRow([name,email,messages,deviceDetail,time]);
      return ContentService.createTextOutput(JSON.stringify({ message: "suceess"})).setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({ message: "Invalid details"})).setMimeType(ContentService.MimeType.JSON);
  }catch(e){
    return ContentService.createTextOutput(JSON.stringify({ message: e.message})).setMimeType(ContentService.MimeType.JSON);
  }
}
