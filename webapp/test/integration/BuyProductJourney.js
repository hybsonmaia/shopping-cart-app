sap.ui.define(
  [
    'sap/ui/core/Configuration',
    'sap/ui/test/opaQunit',
    './pages/Home',
    './pages/Category',
    './pages/Product',
    './pages/Cart',
    './pages/Checkout',
    './pages/OrderCompleted',
    './pages/Welcome'
  ],
  function (e, t) {
    'use strict'
    var o = e.getLanguage()
    QUnit.module('Buy Product Journey', {
      before: function () {
        e.setLanguage('en-US')
      },
      after: function () {
        e.setLanguage(o)
      }
    })
    t('Should see the category list', function (e, t, o) {
      e.iStartMyApp()
      o.onHome
        .iShouldSeeTheCategoryList()
        .and.iShouldSeeSomeEntriesInTheCategoryList()
    })
    t('Should see the product list', function (e, t, o) {
      t.onHome.iPressOnTheFlatScreensCategory()
      o.onTheCategory
        .iShouldBeTakenToTheFlatScreensCategory()
        .and.iShouldSeeTheProductList()
        .and.iShouldSeeSomeEntriesInTheProductList()
    })
    t('Should see an avatar button on the product page', function (e, t, o) {
      t.onTheCategory.iPressOnTheFirstProduct()
      o.onTheProduct.iShouldSeeAnAvatarButton()
    })
    t('Should add a product to the cart', function (e, t, o) {
      t.onTheProduct.iAddTheDisplayedProductToTheCart()
      t.onTheProduct.iToggleTheCart()
      o.onTheCart
        .iShouldSeeTheProductInMyCart()
        .and.iShouldSeeTheTotalPriceUpdated()
      o.iTeardownMyApp()
    })
    t('Should keep the cart when reloading', function (e, t, o) {
      e.iStartMyApp({ keepStorage: true })
      t.onHome.iPressOnTheFlatScreensCategory()
      t.onTheWelcomePage.iToggleTheCart()
      o.onTheCart.iShouldSeeTheProductInMyCart()
      o.iTeardownMyApp()
    })
    t(
      'Should start the app with a bookmarkable cart product',
      function (e, t, o) {
        e.iStartMyApp({
          keepStorage: true,
          hash: 'category/FS/product/HT-1254/cart'
        })
        o.onTheProduct.iShouldSeeTheRightProduct()
      }
    )
    t('Should navigate to checkout', function (e, t, o) {
      t.onTheCart.iPressOnTheProceedButton()
      o.onCheckout.iShouldSeeTheWizardStepContentsStep()
    })
    t('Should return to the home', function (e, t, o) {
      t.onCheckout.iPressOnTheReturnToShopButton()
      o.onHome
        .iShouldSeeTheCategoryList()
        .and.iShouldSeeSomeEntriesInTheCategoryList()
    })
    t('Should return to checkout', function (e, t, o) {
      t.onTheWelcomePage.iToggleTheCart()
      t.onTheCart.iPressOnTheProceedButton()
      o.onCheckout.iShouldSeeTheWizardStepContentsStep()
    })
    t('Should navigate to Payment Step', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheWizardStepPaymentTypeStep()
    })
    t('Should navigate to Credit Card Step', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldNotSeeTheStep4Button('creditCardStep')
    })
    t('Should see Step 4 Button', function (e, t, o) {
      t.onCheckout.iEnterCreditCardInformation(
        'My name',
        '1234567891234567',
        '123',
        '01/2020'
      )
      o.onCheckout.iShouldSeeTheStep4Button()
    })
    t(
      'Should not see Step 4 Button when an information is missing',
      function (e, t, o) {
        t.onCheckout.iEnterCreditCardInformation(
          'My name',
          '1234567891234567',
          '13',
          '01/2020'
        )
        o.onCheckout
          .iShouldNotSeeTheStep4Button('creditCardStep')
          .and.iShouldSeeTheFooterWithTheErrorButton()
      }
    )
    t('Should see a message popover window', function (e, t, o) {
      t.onCheckout.iPressOnTheButtonInTheFooter()
      o.onCheckout.iShouldSeeTheMessagePopover()
    })
    t('Should see Step 4 Button', function (e, t, o) {
      t.onCheckout
        .iPressTheCloseButton()
        .and.iEnterCreditCardInformation(
          'My name',
          '1234567891234567',
          '123',
          '01/2020'
        )
      o.onCheckout.iShouldSeeTheStep4Button()
    })
    t('Should navigate to invoice Step', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldNotSeeTheStep4Button('invoiceStep')
    })
    t('Should invalidate Step 5', function (e, t, o) {
      t.onCheckout.iEnterInvoiceAddressText(
        'MyStr. 2',
        '1m',
        'someLetters',
        '1234'
      )
      o.onCheckout.iShouldNotSeeTheStep4Button('invoiceStep')
    })
    t('Should activate Step 5 Button', function (e, t, o) {
      t.onCheckout.iEnterInvoiceAddressText(
        'MyStreet.2',
        'MyCity',
        '1234',
        'DE'
      )
      o.onCheckout.iShouldSeeTheStep5Button()
    })
    t('Should navigate to Delivery Type Step', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheDeliveryTypeStep()
    })
    t('Should navigate to order summary', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheOrderSummary()
    })
    t('Should return to checkout', function (e, t, o) {
      t.onCheckout.iPressOnTheEditButtonBacktoList()
      o.onCheckout.iShouldSeeTheWizardStepContentsStep()
    })
    t('Should select Bank Transfer', function (e, t, o) {
      t.onCheckout.iPressOnTheBankTransferButton().and.iPressOnTheYesButton()
      o.onCheckout.iShouldSeeTheStep3Button()
    })
    t('Should navigate to Bank Transfer', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheStep4Button()
    })
    t('Should navigate to invoice step', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheStep5Button()
    })
    t('Should navigate to Delivery Type Step', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheDeliveryTypeStep()
    })
    t('Should navigate to order summary', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheOrderSummary()
    })
    t('Should return to checkout', function (e, t, o) {
      t.onCheckout.iPressOnTheEditButtonBackToPaymentType()
      o.onCheckout.iShouldSeeTheWizardStepContentsStep()
    })
    t('Should select Cash On Delivery', function (e, t, o) {
      t.onCheckout.iPressOnTheCashOnDeliveryButton().and.iPressOnTheYesButton()
      o.onCheckout.iShouldSeeTheStep3Button()
    })
    t('Should navigate to Cash On Delivery', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldNotSeeTheStep4Button('cashOnDeliveryStep')
    })
    t('Should invalidate Step 4 Button', function (e, t, o) {
      t.onCheckout.iEnterCashOnDeliveryText(
        'FirstName',
        'LastName',
        '+4911111111',
        'inf'
      )
      o.onCheckout
        .iShouldNotSeeTheStep4Button('cashOnDeliveryStep')
        .and.iShouldGetErrorMessageTextDoesNotMatchTypeForEmailField('inf')
    })
    t('Should invalidate Step 4 Button', function (e, t, o) {
      t.onCheckout.iEnterCashOnDeliveryText(
        'FirstName',
        'LastName',
        '+4911111111',
        'inf.shop.com'
      )
      o.onCheckout
        .iShouldNotSeeTheStep4Button('cashOnDeliveryStep')
        .and.iShouldGetErrorMessageTextDoesNotMatchTypeForEmailField(
          'inf.shop.com'
        )
    })
    t('Should activate Step 4 Button', function (e, t, o) {
      t.onCheckout.iEnterCashOnDeliveryText(
        'FirstName',
        'LastName',
        '+4911111111',
        'inf@shop.com'
      )
      o.onCheckout.iShouldSeeTheStep4Button()
    })
    t('Should navigate to invoice Step', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheStep5Button()
    })
    t('Should navigate to Delivery Type Step', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheDeliveryTypeStep()
    })
    t('Should navigate to order summary', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheOrderSummary()
    })
    t('Should return to checkout', function (e, t, o) {
      t.onCheckout.iPressOnTheEditButtonBackToInvoiceAddress()
      o.onCheckout.iShouldSeeTheWizardStepContentsStep()
    })
    t('Should navigate to Delivery Address Step', function (e, t, o) {
      t.onCheckout
        .iPressOnDifferentAddressCheckbox()
        .and.iPressOnTheYesButton()
        .and.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheDeliveryAddressStep()
    })
    t('Should activate Step 6 Button', function (e, t, o) {
      t.onCheckout.iEnterDeliveryAddressText()
      o.onCheckout.iShouldSeeTheDeliveryStepButton()
    })
    t('Should navigate to Delivery Type Step', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheDeliveryTypeStep()
    })
    t('Should navigate to order summary', function (e, t, o) {
      t.onCheckout.iPressOnTheNextStepButton()
      o.onCheckout.iShouldSeeTheOrderSummary()
    })
    t('Should return to checkout', function (e, t, o) {
      t.onCheckout.iPressOnTheEditButtonBackToDeliveryType()
      o.onCheckout.iShouldSeeTheWizardStepContentsStep()
    })
    t(
      'Should select Express Delivery and navigate to order summary',
      function (e, t, o) {
        t.onCheckout
          .iPressOnTheExpressDeliveryButton()
          .and.iPressOnTheNextStepButton()
        o.onCheckout.iShouldSeeTheOrderSummary().and.iShouldSeeExpressDelivery()
      }
    )
    t(
      'Should submit order and navigate to order completed',
      function (e, t, o) {
        t.onCheckout.iPressOnTheSubmitButton().and.iPressOnTheYesButton()
        o.onOrderCompleted.iShouldSeeTheOrderCompletedPage()
      }
    )
    t('Should return to the shop welcome screen', function (e, t, o) {
      t.onOrderCompleted.iPressOnTheReturnToShopButton()
      o.onTheWelcomePage.iShouldSeeTheWelcomePage()
      o.iTeardownMyApp()
    })
  }
)
