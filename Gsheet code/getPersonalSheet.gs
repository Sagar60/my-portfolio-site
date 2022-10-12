function doGet(req) {
  try{
    var sheetName = 'Shared Personal info';
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

    var values = sheet.getDataRange().getValues();

    //Logger.log(values);

    var result= {};

    for(let value of values.slice(1)){
      if(value[1].toString().trim() && value[2].toString().trim()){
        
        let row = {};
        
        row[value[1].toString().trim()] = value[2].toString().trim();
        if(value[3].toString().trim()){
          row['description'] = value[3].toString().trim();
        }

        Logger.log(row);

        //push into result
        if(Object.keys(result).includes(value[0].toString().trim())){
          // adding new value to array
          result[value[0].toString().trim()].push(row);
        }else{
          //initialize new array
          result[value[0].toString().trim()] = [row];
        }
      }
    }
    Logger.log(result);

    return ContentService.createTextOutput(JSON.stringify({ message: "success", data: result})).setMimeType(ContentService.MimeType.JSON);

  }catch(e){
    return ContentService.createTextOutput(JSON.stringify({ message: e.message})).setMimeType(ContentService.MimeType.JSON);
  }
}
