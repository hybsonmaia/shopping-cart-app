sap.ui.define(
  [
    'sap/ui/core/Configuration',
    'sap/ui/test/opaQunit',
    './pages/Home',
    './pages/Category',
    './pages/Welcome',
    './pages/Product',
    './pages/Cart'
  ],
  function (e, o) {
    'use strict'
    var t = e.getLanguage()
    QUnit.module('Navigation Journey', {
      before: function () {
        e.setLanguage('en-US')
      },
      after: function () {
        e.setLanguage(t)
      }
    })
    o(
      'Should start the app and go to the speaker category view',
      function (e, o, t) {
        e.iStartMyApp()
        o.onHome.iPressOnTheSpeakerCategory()
        t.onTheCategory.iShouldBeTakenToTheSpeakerCategory()
      }
    )
    o('Should see the product Blaster Extreme', function (e, o, t) {
      o.onTheCategory.iPressOnTheProductBlasterExtreme()
      t.onTheProduct.iShouldSeeTheBlasterExtremeDetailPage()
    })
    o('Should navigate back to home', function (e, o, t) {
      o.onTheCategory.iPressTheBackButtonInCategory()
      t.onHome.iShouldSeeTheCategoryList()
      t.onTheWelcomePage.iShouldSeeTheWelcomePage()
    })
    o('Should navigate to cart', function (e, o, t) {
      o.onTheWelcomePage.iToggleTheCart()
      t.onTheCart.iShouldSeeTheCart()
      t.onTheWelcomePage.iShouldSeeTheWelcomePage()
    })
    o('Should navigate from welcome to product view', function (e, o, t) {
      o.onTheWelcomePage.iToggleTheCart()
      o.onTheWelcomePage.iPressOnTheProductSmartphoneAlphaTitle()
      t.onTheProduct.iShouldSeeTheSmartphoneAlphaDetailPage()
    })
    o('Should navigate back to home', function (e, o, t) {
      o.onTheCategory.iPressTheBackButtonInCategory()
      t.onHome.iShouldSeeTheCategoryList()
      t.onTheWelcomePage.iShouldSeeTheWelcomePage()
    })
    o(
      'Should navigate to product view via pressing product image',
      function (e, o, t) {
        o.onTheWelcomePage.iPressTheProductImage()
        t.onTheProduct.iShouldSeeTheProductPage()
        t.onTheCategory.iShouldSeeSomeEntriesInTheProductList()
        t.iTeardownMyApp()
      }
    )
  }
)
