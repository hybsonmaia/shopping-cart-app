sap.ui.define(
  [
    'sap/ui/core/Configuration',
    'sap/ui/test/opaQunit',
    './pages/Home',
    './pages/Welcome',
    './pages/Product',
    './pages/Category',
    './pages/Cart'
  ],
  function (e, o) {
    'use strict'
    var t = e.getLanguage()
    QUnit.module('Welcome Journey', {
      before: function () {
        e.setLanguage('en-US')
      },
      after: function () {
        e.setLanguage(t)
      }
    })
    o(
      'Should start the app and see the right number of featured products and an avatar button',
      function (e, o, t) {
        e.iStartMyApp()
        t.onTheWelcomePage
          .iShouldSeeTheRightAmountOfProducts()
          .and.iShouldSeeAnAvatarButton()
      }
    )
    o(
      'Should press the product link and navigate to product view',
      function (e, o, t) {
        o.onTheWelcomePage.iPressTheProductLink()
        t.onTheProduct.iShouldSeeTheProductPage()
        t.onTheCategory.iShouldSeeSomeEntriesInTheProductList()
      }
    )
    o('Should press the image and see the LightBox item', function (e, o, t) {
      o.onTheProduct.iPressOnTheProductPicture()
      t.onTheProduct.iShouldSeeALightBox()
    })
    o(
      'Should press the close button and see the product view',
      function (e, o, t) {
        o.onTheProduct.iPressTheCloseButtonOfTheLightBox()
        t.onTheProduct.iShouldSeeTheProductPage()
      }
    )
    o(
      'Should press back button and navigate to welcome view',
      function (e, o, t) {
        o.onTheCategory.iPressTheBackButtonInCategory()
        t.onTheWelcomePage.iShouldSeeTheWelcomePage()
      }
    )
    o(
      'Should press cart button and see the product in the cart',
      function (e, o, t) {
        o.onHome.iPressOnTheFlatScreensCategory()
        o.onTheWelcomePage.iPressOnTheCartButton()
        o.onTheWelcomePage.iToggleTheCart()
        t.onTheCart.iShouldSeeTheProductInMyCart()
        t.iTeardownMyApp()
      }
    )
  }
)
