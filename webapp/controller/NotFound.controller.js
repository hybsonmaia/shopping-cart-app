sap.ui.define(['./BaseController', 'sap/ui/core/UIComponent'], function (t, o) {
  'use strict'
  return t.extend('sap.ui.demo.cart.controller.NotFound', {
    onInit: function () {
      this._router = o.getRouterFor(this)
    }
  })
})
