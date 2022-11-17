sap.ui.define(['sap/ui/demo/cart/localService/mockserver'], function (e) {
  'use strict'
  e.init()
    .catch(function (e) {
      sap.ui.require(['sap/m/MessageBox'], function (i) {
        i.error(e.message)
      })
    })
    .finally(function () {
      sap.ui.require(['sap/ui/core/ComponentSupport'])
    })
})
