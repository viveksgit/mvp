Feature: abc

    Scenario: FHA Loan to be present when loan includes Escrow and is currently escrowed and has borrower paid MI

        Given I am on MVP Page and Loan Details are Loaded
        And Escrow is present and is included
        And Borrower Paid MI is present
        When I run pricing
        Then FHA Loan should be present