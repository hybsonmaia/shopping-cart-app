sap.ui.define(
  [
    'sap/ui/core/Configuration',
    'sap/ui/test/opaQunit',
    './pages/Home',
    './pages/Category'
  ],
  function (e, o) {
    'use strict'
    var t = e.getLanguage()
    QUnit.module('Filtr Journey', {
      before: function () {
        e.setLanguage('en-US')
      },
      after: function () {
        e.setLanguage(t)
      }
    })
    o(
      'Should start the app and go to the category view I should see a filter button',
      function (e, o, t) {
        e.iStartMyApp()
        o.onHome.iPressOnTheFlatScreensCategory()
        t.onTheCategory.iShouldSeeAFilterButton()
      }
    )
    o('Should filter the products on availability', function (e, o, t) {
      o.onTheCategory.iFilterOnAvailability()
      t.onTheCategory.iShouldOnlySeeAvailableAndDiscontinuedProductsWithInfoToolbar()
    })
    o('Should remove the availability filters', function (e, o, t) {
      o.onTheCategory.iRemoveTheAvailabilityFilters()
      t.onTheCategory.iShouldSeeAllProductsAndNoInfoToolbar()
    })
    o('Should filter on both availability and price', function (e, o, t) {
      o.onTheCategory.iFilterOnAvailabilityAndPrice()
      t.onTheCategory.iShouldOnlySeeOutOfStockAndCheapProductsWithInfoToolbar()
    })
    o(
      'Should change the price filter and then cancel the change',
      function (e, o, t) {
        o.onTheCategory.iCancelAPriceFilterChange()
        t.onTheCategory.iShouldOnlySeeOutOfStockAndCheapProductsWithInfoToolbar()
        o.onTheCategory.iPressTheFilterButton()
        o.onTheCategory.iPressTheBackButtonInDialog()
        t.onTheCategory.iShouldTestTheFilterCount(1)
      }
    )
    o(
      'Should change the price filter values to the default ones',
      function (e, o, t) {
        o.onTheCategory.iChangeToTheDefaultFilterPriceValues()
        t.onTheCategory.iShouldOnlySeeOutOfStockProductsAndAnInfoToolbar()
        o.onTheCategory.iPressTheFilterButton()
        o.onTheCategory.iPressTheBackButtonInDialog()
        t.onTheCategory.iShouldTestTheFilterCount(0)
      }
    )
    o('Should reset price custom filter', function (e, o, t) {
      o.onTheCategory.iPressResetButton()
      t.onTheCategory.iShouldTestTheFilterCount(0)
      o.onTheCategory.iPressOkButton()
      t.onTheCategory.iShouldSeeAllProductsAndNoInfoToolbar()
    })
    o('Should filter the products on supplier', function (e, o, t) {
      o.onTheCategory.iFilterOnSupplier()
      t.onTheCategory.iShouldOnlySeeTechnoComProductsAndAnInfoToolbar()
    })
    o('Should remove the supplier filter', function (e, o, t) {
      o.onTheCategory.iRemoveTheSupplierFilter()
      t.onTheCategory.iShouldSeeAllProductsAndNoInfoToolbar()
      t.onTheCategory.iTeardownMyApp()
    })
  }
)
