'use strict';
const {
    client
} = require('nightwatch-cucumber');
const {
    defineSupportCode
} = require('cucumber');

defineSupportCode(({
    Given,
    Then,
    When
}) => {
    Given('I am in Loan Structure', () => {
        let loanPage = client.page.loan();
        loanPage.navigate('http://localhost?stub=FakeLoan');
        return loanPage.waitForPageToLoad;
    });
    When('the Base loan amount loads', () => {
        return client.pause(1000);
    });
    Then('the Base loan amount is displayed', () => {
        let loanPage = client.page.loan();
        let baseLoanModule = loanPage.section.baseLoanInformation;
        baseLoanModule.expect.element('@base_loan_amount').to.be.present;
        return client;
    });
});

defineSupportCode(({
    Given,
    Then,
    When
}) => {
    Given('a Base loan amount in the MVP tool', () => {
        let loanPage = client.page.loan();
        loanPage.navigate('http://mvpstage.mrcooper.io?stub=FakeLoan');
        return loanPage.waitForPageToLoad;
    });
    When('I edit the base loan amount', () => {
        let loanAmt = 99999999999999;
        let baseLoanModule = client.page.loan().section.baseLoanInformation;
        baseLoanModule.expect.element('@base_loan_amount').to.be.present;
        return baseLoanModule.fillInValueAndTabOut('@base_loan_amount', loanAmt);
    });
    Then('the Base Loan Amount field updates', () => {
        let loanAmt = '99999999999999';
        let baseLoanModule = client.page.loan().section.baseLoanInformation;
        baseLoanModule.expect.element('@base_loan_amount').to.contain.text(loanAmt);
        baseLoanModule.expect.element('@base_loan_amount_error').to.be.present;

    });
    Then('the value cannot be zero / blank or more than \\$2,000,000.00', () => {
        let baseLoanModule = client.page.loan().section.baseLoanInformation;
        baseLoanModule.fillInValueAndTabOut('@base_loan_amount', '99999999999999');
        baseLoanModule.expect.element('@base_loan_amount_error').to.contain.text('Loan Amount must be between 0 & 2,000,000.');
        baseLoanModule.fillInValueAndTabOut('@base_loan_amount', 0);
        baseLoanModule.expect.element('@base_loan_amount_error').to.contain.text('Loan Amount must be between 0 & 2,000,000.');
        baseLoanModule.fillInValueAndTabOut('@base_loan_amount', undefined);
        baseLoanModule.expect.element('@base_loan_amount_error').to.contain.text('Loan Amount must be between 0 & 2,000,000.');

    });

});