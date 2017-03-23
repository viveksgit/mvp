var util = require('util');

var pricerProductXpath = '//span[text()="%s"]';
var expectedTimeForPricingToLoad = 45000;
var timeForPageToRespond = 200;

var pricingCommands = {
  runPricing: function () {
    this.waitForElementPresent('@pricing_button', expectedTimeForPricingToLoad);
    this.click('@pricing_button');
    return this.waitForElementPresent('@pricing_contents', expectedTimeForPricingToLoad);

  },
  clickAndWait: function (element) {
    this.click(element);
    return this.api.pause('1000');

  },
  clickPricingModule: function (element) {
    return this.click(element);
  },
  selectRate: function () {
    return this
      .waitForElementVisible('@pricing_conforming_card', expectedTimeForPricingToLoad, false)
      .clickPricingModule('@pricing_conformingNoCost_card')
      .clickPricingModule('@pricing_30YearFixedRefiPlus105APR_card')
      .waitForElementVisible('@pricing_table_data_fifth_button', expectedTimeForPricingToLoad, false)
      .clickPricingModule('@pricing_table_data_fifth_button');

  }
};

module.exports = {
  sections: {
    pricing: {
      selector: '#pricing_contents',
      elements: {
        pricing_table_data: '.rate_table_data > div:nth-child(2)'
      }
    }
  },
  commands: [pricingCommands],
  elements: {
    pricing_button: '.pricing_button>button',
    pricing_header: '#pricing_header',
    pricing_view: '#pricing_header + div',
    pricing_load: 'svg circle',
    pricing_table: '.rate_table',
    pricing_table_header: '.rate_table_header',
    pricing_table_data: '.rate_table_data',
    pricing_table_data_first_row: '.rate_table_data >tr:nth-child(1)',
    pricing_table_data_fifth_row: '.rate_table_data >tr:nth-child(5)',
    pricing_table_data_first_button: '.rate_table_data > tr:nth-child(1) button',
    pricing_table_data_third_button: '.rate_table_data > tr:nth-child(3) button',
    pricing_table_data_fifth_button: '.rate_table_data > tr:nth-child(5) button',
    pricing_table_data_seventh_button: '.rate_table_data > tr:nth-child(7) button',
    error_message: '.errorMessage',
    pricing_no_products_message: '#pricing_header + div .requiredField',
    pricing_contents: '#pricing_contents',

    pricing_conforming_card: {
      selector: util.format(pricerProductXpath, 'CONFORMING'),
      locateStrategy: 'xpath'
    },

    fha_card: {
      selector: util.format(pricerProductXpath, 'FHA'),
      locateStrategy: 'xpath'
    },

    pricing_conformingNoCost_card: {
      selector: util.format(pricerProductXpath, 'CONFORMING NO COST'),
      locateStrategy: 'xpath'
    },
    pricing_conformingFreddieRelief_card: {
      selector: util.format(pricerProductXpath, 'FREDDIE RELIEF'),
      locateStrategy: 'xpath'
    },
    pricing_conformingFreddieReliefNoCost_card: {
      selector: util.format(pricerProductXpath, 'FREDDIE RELIEF NO COST'),
      locateStrategy: 'xpath'
    },

    pricing_30YearFixedRefiPlus105APR_card: {
      selector: util.format(pricerProductXpath, '30 Year Fixed Refi Plus <= 105 w/Appr'),
      locateStrategy: 'xpath'
    },
    pricing_30YearFixed105_card: {
      selector: util.format(pricerProductXpath, '30 Year Fixed <= 105'),
      locateStrategy: 'xpath'
    },
    pricing_30YearFixed_card: {
      selector: util.format(pricerProductXpath, '30 Year Fixed'),
      locateStrategy: 'xpath'
    },
    pricing_25YearFixed_card: {
      selector: util.format(pricerProductXpath, '25 Year Fixed'),
      locateStrategy: 'xpath'
    },
    pricing_5_1_Libor_ARM105_card: {
      selector: util.format(pricerProductXpath, '5/1 Libor ARM Refi Plus HB <= 105 w/Appr'),
      locateStrategy: 'xpath'
    }

  }
};