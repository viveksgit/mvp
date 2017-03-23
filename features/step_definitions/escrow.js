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

    Given('I am on MVP Page and Loan Details are Loaded', () => {
        let loanPage = client.page.loan();
        loanPage.navigate('http://localhost?stub=FakeLoan');
        return loanPage.waitForPageToLoad;
    });
    Given('Escrow is present', () => {
        let loanStructureModule = client.page.loan().section.loanStructure;
        return loanStructureModule.enableIncludeEscrow();
    });
    Given('Escrow amount is Included', () => {
        let loanStructureModule = client.page.loan().section.loanStructure;
        loanStructureModule.clickAndWait('@include_escrow_dropdown');
        return loanStructureModule.clickAndWait('@include_escrow_yes_dropdown');
    });
    Given('Mortgage Insurance Not present', () => {
        let loanPage = client.page.loan();
        let loanStructureModule = loanPage.section.loanStructure;
        return loanStructureModule.waitForElementPresent('@has_MI_checkbox', 4000);
    });
    Given('Loan To Value is below 80\\%', () => {
        let baseLoanInformation = client.page.loan().section.baseLoanInformation;
        return baseLoanInformation.setALoanAndPropertyValueWithanLTVof60();
    });
    Given('Borrower Paid MI is present', () => {
        let loanPage = client.page.loan();
        let loanStructureModule = loanPage.section.loanStructure;
        return loanStructureModule.enableBPMI();
    });
    Given('Escrow is present and is included', () => {
        let loanPage = client.page.loan();
        let loanStructureModule = loanPage.section.loanStructure;
        return loanStructureModule.enableIncludeEscrowAndCurrentlyEscrowed();
    });
    When('I run pricing', () => {
        let pricingModule = client.page.pricing();
        return pricingModule.runPricing();
    });
    Then('FHA Loan should be present', () => {
        const expectedTableValue = '3.125 0.000 $5,342.80 $675.60 $1,078.12 4.416 0.000';
        const expectedProductLoanAmount = 'Total Loan Amount $122,100.00';
        const expectedInterestRate = 'Interest Rate 3.125';
        const expectedProductPITI = 'New Monthly Mortgage Payment $901.83';
        const expectedDebtsPaid = 'Debts Paid $11,263.00';
        const expectedMonthlySavings = 'Monthly Savings $897.67';
        const expectedCashInHand = 'Cash in Hand $90,451.26';
        let pricingModule = client.page.pricing();
        let pricingSection = client.page.pricing()
            .section.pricing;
        pricingModule.clickPricingModule('@fha_card');
        pricingModule.clickPricingModule('@pricing_30YearFixed_card');
        pricingSection.expect.element('@pricing_table_data').to.contain.text(expectedTableValue);
        pricingModule.clickPricingModule('@pricing_table_data_first_button');
        //let paymentsAndBenefitsModule = client.page.paymentsAndBenefits().section.paymentsAndBenefitsSection;
        //client.pause(1000);
        client.expect.element('#paymentsAndBenefits').to.be.present;
        // paymentsAndBenefitsModule.expect.element('@monthly_savings').to.contain.text(expectedMonthlySavings);
        // paymentsAndBenefitsModule.expect.element('@total_loan_amount').to.contain.text(expectedProductLoanAmount);
        // paymentsAndBenefitsModule.expect.element('@interest_rate').to.contain.text(expectedInterestRate);
        // paymentsAndBenefitsModule.expect.element('@new_monthly_payment').to.contain.text(expectedProductPITI);
        // paymentsAndBenefitsModule.expect.element('@debts_paid').to.contain.text(expectedDebtsPaid);
        // paymentsAndBenefitsModule.expect.element('@cash_in_hand').to.contain.text(expectedCashInHand);
        return client;
    });

});