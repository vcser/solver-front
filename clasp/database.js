function testDB() {
  const ss = SpreadsheetApp.openById(DB_ID)
  Logger.log("Nombre DB: " + ss.getName())
}


function getDataFundos() {

  const dataFundos = sheetBaseFundos.getDataRange().getDisplayValues();
  dataFundos.shift();

  return dataFundos;

};