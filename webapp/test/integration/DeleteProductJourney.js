/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(
  [
    'sap/ui/core/Configuration',
    'sap/ui/test/opaQunit',
    './pages/Home',
    './pages/Category',
    './pages/Product',
    './pages/Cart',
    './pages/Dialog'
  ],
  function (e, t) {
    'use strict'
    var o = e.getLanguage()
    QUnit.module('Delete Product Journey', {
      before: function () {
        e.setLanguage('en-US')
      },
      after: function () {
        e.setLanguage(o)
      }
    })
    t('Should see the product list', function (e, t, o) {
      e.iStartMyApp()
      t.onHome.iPressOnTheFlatScreensCategory()
      o.onTheCategory
        .iShouldBeTakenToTheFlatScreensCategory()
        .and.iShouldSeeTheProductList()
        .and.iShouldSeeSomeEntriesInTheProductList()
    })
    t(
      'Should add a product to the cart and enable the edit button',
      function (e, t, o) {
        t.onTheCategory.iPressOnTheFirstProduct()
        t.onTheProduct.iAddTheDisplayedProductToTheCart()
        t.onTheProduct.iToggleTheCart()
        o.onTheCart
          .iShouldSeeTheProductInMyCart()
          .and.iShouldSeeTheEditButtonEnabled().and
          .iShouldSeeTheProceedButtonEnabled
      }
    )
    t(
      'Should see the delete button after pressing the edit button',
      function (e, t, o) {
        t.onTheCart.iPressOnTheEditButton()
        o.onTheCart.iShouldSeeTheDeleteButton()
      }
    )
    t('Should see the confirmation dialog', function (e, t, o) {
      t.onTheCart.iPressOnTheDeleteButton()
      o.onTheDialog.iShouldBeTakenToTheConfirmationDialog()
    })
    t('Should cancel the delete process', function (e, t, o) {
      t.onTheDialog.iPressCancelOnTheConfirmationDialog()
      o.onTheCart.iShouldBeTakenToTheCart()
    })
    t('Should see the edit button', function (e, t, o) {
      t.onTheCart.iPressOnTheSaveChangesButton()
      o.onTheCart.iShouldSeeTheEditButtonEnabled()
    })
    t('Should delete the product from the cart', function (e, t, o) {
      t.onTheCart.iPressOnTheEditButton().and.iPressOnTheDeleteButton()
      t.onTheDialog.iPressDeleteButtonOnTheConfirmationDialog()
      o.onTheCart
        .iShouldNotSeeTheDeletedItemInTheCart()
        .and.iShouldSeeTheTotalPriceEqualToZero()
    })
    t('Edit button should be disabled', function (e, t, o) {
      t.onTheCart.iPressOnTheSaveChangesButton()
      o.onTheCart
        .iShouldSeeTheEditButtonDisabled()
        .and.iShouldSeeTheProceedButtonDisabled()
      o.iTeardownMyApp()
    })
  }
)
