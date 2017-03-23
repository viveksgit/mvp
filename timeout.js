const {
  defineSupportCode
} = require('cucumber');
var reporter = require('cucumber-html-reporter');

defineSupportCode(({
  setDefaultTimeout,
  registerHandler
}) => {
  setDefaultTimeout(30 * 1000);
  registerHandler('AfterFeatures', function () {

    var options = {
      theme: 'bootstrap',
      jsonFile: 'reports/cucumber.json',
      output: 'reports/cucumber.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
      storeScreenShots: true,
    };

    return reporter.generate(options);
  });

})