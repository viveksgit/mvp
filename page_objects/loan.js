var waitForEventChange = 250;

var loanCommands = {
  waitForPageToLoad: function () {
    this.waitForElementVisible('body', 3000);
    return this;
  },
  clickAndWait: function (element) {
    this.click(element);
    this.api.pause(1500);
    return this;
  },
  fillInValue: function (element, value) {
    this.clearValue(element);
    this.setValue(element, value);
    return this;

  },
  fillInValueAndTabOut: function (element, value) {
    this.clearValue(element);
    this.setValue(element, [value, this.api.Keys.TAB]);
    return this;


  },
  clickToTriggerJSEvent: function (element) {
    this.click(element);
    this.api.pause(waitForEventChange);
    return this;
  }
};

var baseLoanInformationCommands = {
  setALoanAndPropertyValueWithanLTVof60: function () {
    this.fillInValue('@base_loan_amount', 120000);
    this.fillInValue('@current_property_value', 200000);
    this.clickToTriggerJSEvent('@base_loan_amount');
    return this;
  }
};

var cemaCommands = {
  setCemaNo: function () {
    this.clickAndWait('@cema_dropdown');
    this.clickAndWait('@cema_no_option');
    this.waitForText("@cema_dropdown", function (text) {
      return text === "No";
    });
  },
  setCemaYes: function () {
    this.clickAndWait('@cema_dropdown');
    this.clickAndWait('@cema_yes_option');
    this.waitForText("@cema_dropdown", function (text) {
      return text === "Yes";
    });
  },
  setCemaUnspecified: function () {
    this.clickAndWait('@cema_dropdown');
    this.clickAndWait('@cema_unspecified_option');
    this.waitForText("@cema_dropdown", function (text) {
      return text === "Unspecified";
    });
  }
};

var loanStructureCommands = {
  includeEscrow: function () {
    this.clickAndWait('@include_escrow_dropdown');
    this.clickAndWait('@include_escrow_yes_dropdown');
    this.expect.element("@include_escrow_dropdown").text.to.contain("Yes").before(5000);
    return this;
  },
  enableIncludeEscrow: function () {
    this.waitForElementPresent('@has_MI_checkbox', 4000);
    this.clickAndWait('@currently_escrowed_dropdown');
    this.clickAndWait('@currently_escrowed_no_dropdown');
    this.expect.element("@currently_escrowed_dropdown").text.to.contain("No").before(5000);
    this.clickAndWait('@include_escrow_dropdown');
    this.clickAndWait('@include_escrow_yes_dropdown');
    this.expect.element("@include_escrow_dropdown").text.to.contain("Yes").before(5000);
    return this;
  },
  disableIncludeEscrowandDisableCurrentlyEscrowed: function () {
    this.waitForElementPresent('@has_MI_checkbox', 4000);

    this.clickAndWait('@currently_escrowed_dropdown');
    this.clickAndWait('@currently_escrowed_no_dropdown');
    this.expect.element("@currently_escrowed_dropdown").text.to.contain("No").before(5000);

    this.clickAndWait('@include_escrow_dropdown');
    this.clickAndWait('@include_escrow_no_dropdown');
    this.expect.element("@include_escrow_dropdown").text.to.contain("No").before(5000);
    return this;
  },
  enableIncludeEscrowAndCurrentlyEscrowed: function () {
    this.waitForElementPresent('@has_MI_checkbox', 4000);
    this.clickAndWait('@include_escrow_dropdown');
    this.clickAndWait('@include_escrow_yes_dropdown');
    this.expect.element("@include_escrow_dropdown").text.to.contain("Yes").before(5000);
    this.expect.element('@currently_escrowed_dropdown').text.to.equal("Unspecified");
    this.clickAndWait('@currently_escrowed_dropdown');
    this.clickAndWait('@currently_escrowed_yes_dropdown');
    this.expect.element("@currently_escrowed_dropdown").text.to.contain("Yes").before(5000);
    return this;
  },
  enableBPMI: function () {
    this.clickAndWait('@has_MI_checkbox');
    return this;
  },
  enableLPMI: function () {
    this.clickAndWait('@has_MI_checkbox');
    this.expect.element("@mi_dropdown").text.to.contain("Borrower Paid MI").before(5000);
    this.clickAndWait('@mi_dropdown');
    this.clickAndWait('@lpmi_dropdown');
    this.expect.element("@mi_dropdown").text.to.contain("Lender Paid MI").before(5000);
    return this;
  }
};

module.exports = {
  commands: [loanCommands, baseLoanInformationCommands, cemaCommands],
  elements: {
    appHeader: '.app-header',
    loanHeader: '.loan-header',
    loanHeaderNumber: '.loan-number',
    collateral_snackbar: '#confirm_dialog',
    collateral_send_button: '#email_button'
  },
  sections: {
    cema: {
      selector: '[id=cema_component]',
      commands: [loanCommands, loanStructureCommands, cemaCommands],
      elements: {
        cema_dropdown: '.inputField div',
        cema_error: '#selectCemaValue + div + div',
        cema_unspecified_option: '#cema_unspecified_option',
        cema_yes_option: '#cema_yes_option',
        cema_no_option: '#cema_no_option'
      }
    },
    changeList: {
      selector: '[id=change_list]',
      commands: [loanCommands, baseLoanInformationCommands],
      elements: {
        button: '.changelist_button',
        list: '[name=changeList]'
      }
    },
    baseLoanInformation: {
      selector: '[id=base_loan_information]',
      commands: [loanCommands, baseLoanInformationCommands],
      elements: {
        base_loan_amount: 'input[id=loanAmount]',
        base_loan_amount_error: 'input[id=loanAmount] + div + div',
        current_property_value: 'input[id=estimatedPropertyValue]',
        current_property_value_error: 'input[id=estimatedPropertyValue] + div + div',
        ltv: 'input[id=LTVValue]',
        ltv_error: 'input[id=LTVValue] + div'
      }
    },
    loanStructure: {
      selector: 'html',
      commands: [loanCommands, loanStructureCommands, baseLoanInformationCommands],
      elements: {
        currently_escrowed_dropdown: '[name=selectCurrentlyEscrowedStatus]',
        include_escrow_dropdown: '[name=selectEscrowStatus]',
        has_MI_checkbox: '[name="hasMI"]',
        mi_dropdown: '[name="MIType"]',
        bpmi_dropdown: '.BPMI_dropdown',
        lpmi_dropdown: '.LPMI_dropdown',

        currently_escrowed_unspecified_dropdown: '.Currently_Escrowed_Unspecified',
        currently_escrowed_yes_dropdown: '.Currently_Escrowed_Yes',
        currently_escrowed_no_dropdown: '.Currently_Escrowed_No',

        unspecified_dropdown: '.Include_Escrow_Unspecified',
        include_escrow_yes_dropdown: '.Include_Escrow_Yes',
        include_escrow_no_dropdown: '.Include_Escrow_No'
      }
    }
  }
};