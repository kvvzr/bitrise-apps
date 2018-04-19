import config from '../config';

const findOrCreateSheet = (spreadsheet, name) => {
  const sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    const newSheet = spreadsheet.insertSheet();
    newSheet.setName(name);
    return newSheet;
  }
  return sheet;
};

global.doGet = () => {
  const spreadsheet = SpreadsheetApp.openByUrl(config.SPREADSHEET_URL);
  const appListSheet = findOrCreateSheet(spreadsheet, 'アプリ一覧');
  const items = appListSheet
    .getRange(2, 1, appListSheet.getLastRow() - 1, 5)
    .getValues()
    .sort((a, b) => b[4] - a[4]);

  const template = HtmlService.createTemplateFromFile('index');
  template.data = JSON.stringify(items);

  const output = HtmlService.createHtmlOutput();
  output.append(template.evaluate().getContent());

  return output;
};

global.updateApp = (name, version, iconUrl, installUrl) => {
  const spreadsheet = SpreadsheetApp.openByUrl(config.SPREADSHEET_URL);
  const appListSheet = findOrCreateSheet(spreadsheet, 'アプリ一覧');

  let targetRow = 2;
  if (appListSheet.getLastRow() > 1) {
    const index = appListSheet
      .getRange(2, 1, appListSheet.getLastRow() - 1, 1)
      .getValues()
      .reduce((acc, val) => acc.concat(val), [])
      .indexOf(name);

    targetRow = index + 2;
    if (index === -1) {
      targetRow = appListSheet.getLastRow() + 1;
    }
  }

  appListSheet
    .getRange(targetRow, 1, 1, 5)
    .setValues([[name, iconUrl, installUrl, version, new Date()]]);
};
