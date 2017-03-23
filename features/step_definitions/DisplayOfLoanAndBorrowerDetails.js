'use strict';
const {
    client
} = require('nightwatch-cucumber');
const {
    defineSupportCode
} = require('cucumber');

defineSupportCode(({
    Given,
    When,
    Then
}) => {
    Given('I am in MVP tool home page', () => {
        let mvpHomePage = client.page.loan();
        mvpHomePage.navigate('http://localhost?stub=FakeLoan');
        return mvpHomePage.waitForPageToLoad;
    });
    When('the page load finishes', () => {
        return client.pause('1500');
    });
    Then('basic loan details and other borrower details are shown', () => {
        let mvpHomePage = client.page.loan();
        client.expect.element('body').to.be.present;
        mvpHomePage.expect.element('@appHeader').to.contain.text('MORTGAGE VALUE PLANNER');
        mvpHomePage.expect.element('@appHeader').to.contain.text('Hello Jimmy');
        mvpHomePage.expect.element('@loanHeaderNumber').to.contain.text('0900000999');
        mvpHomePage.expect.element('@loanHeader').to.contain.text('Nick Calvin');
        mvpHomePage.expect.element('@loanHeader').to.contain.text('4000 Horizon Way');
        return mvpHomePage.expect.element('@loanHeader').to.contain.text('IrvinG, TX 75063');
    });

});