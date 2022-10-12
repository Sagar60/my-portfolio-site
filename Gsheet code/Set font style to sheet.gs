function doGet(req) {
  try{
    var sheetName = req.parameter.sheetName;
  //'02_10_2022' ;
  // req.paramater.sheetname

  // make a object of sheet
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  // activate require sheet
  var sheet = doc.getSheetByName(sheetName)
  // get collection of row
  var values = sheet.getDataRange().getValues();

  Logger.log(values.length);

  // for each row in sheet
  for (let i = 0; i < values.length; i++){
    var rangeValue = "A"+String(i+1)+":B"+String(i+1);
    //Logger.log(rangeValue);
    var range = sheet.getRange(rangeValue);

    // header row
    if(i == 0){
      //Logger.log('first');
      // make range header yellow
      range.setBackground('yellow');
      range.setHorizontalAlignment('center');
    }
  // other row
    // bold the range
    range.setFontWeight(700);

    // make border 
    let cellA = sheet.getRange("A"+String(i+1))
    let cellB = sheet.getRange("B"+String(i+1))
    cellA.setBorder(true,true,true,true, false, false,'black', SpreadsheetApp.BorderStyle.SOLID);
    cellB.setBorder(true,true,true,true, false, false,'black', SpreadsheetApp.BorderStyle.SOLID);
  }

  // auto resize 
  sheet.autoResizeColumns(1,2);
    return ContentService.createTextOutput(JSON.stringify({ message: "success"})).setMimeType(ContentService.MimeType.JSON);
  }catch(e){
    return ContentService.createTextOutput(JSON.stringify({message: e.message})).setMimeType(ContentService.MimeType.JSON);
  }
  


}
