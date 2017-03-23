
Feature: FHA Applicability based on Escrow, MI and Loan To Value(LTV)

    Scenario: FHA Loan to appear when loan has escrow and LTV below 80% and no Mortgage Insurance(MI)
        Given  I am on MVP Page and Loan Details are Loaded
        And Escrow is present
        And Escrow amount is Included
        And Mortgage Insurance Not present
        And Loan To Value is below 80%
        When I run pricing
        Then FHA Loan should be present