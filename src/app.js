global.doGet = () => {
  const template = HtmlService.createTemplateFromFile('index');
  template.name = 'test';

  const output = HtmlService.createHtmlOutput();
  output.append(template.evaluate().getContent());

  return output;
};

global.doPost = () => {};
