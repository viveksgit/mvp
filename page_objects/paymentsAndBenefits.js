var util = require('util');

var paymentsAndBenefitsCommands = {

};

module.exports = {
  sections: {
    paymentsAndBenefitsSection: {
      selector: '#paymentsAndBenefits',
      commands: [paymentsAndBenefitsCommands],
      elements: {
        total_loan_amount: '#paymentsAndBenefits_table_row_total_loan_amount',
        interest_rate: '#paymentsAndBenefits_table_row_rate',
        monthly_savings: '#paymentsAndBenefits_table_row_monthlySavings',
        new_monthly_payment: '#paymentsAndBenefits_table_row_piti',
        debts_paid: '#paymentsAndBenefits_table_row_debtsPaid',
        cash_in_hand: '#paymentsAndBenefits_table_row_cashInHand'
      }
    }
  }
};