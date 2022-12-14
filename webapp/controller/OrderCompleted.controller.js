sap.ui.define(['./BaseController'], function (t) {
  'use strict'
  return t.extend('sap.ui.demo.cart.controller.OrderCompleted', {
    onInit: function () {
      this._oRouter = this.getRouter()
    },
    onReturnToShopButtonPress: function () {
      this._setLayout('Two')
      this._oRouter.navTo('home')
    }
  })
})
