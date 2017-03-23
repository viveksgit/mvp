Feature: xyz

    Scenario: FHA Loan to be present when loan has Escrow and Borrower paid MI
        Given I am on MVP Page and Loan Details are Loaded
        And Escrow is present
        And Borrower Paid MI is present
        When I run pricing
        Then FHA Loan should be present