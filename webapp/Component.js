sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    './model/LocalStorageModel',
    './model/models',
    'sap/ui/Device'
  ],
  function (t, e, s, i) {
    'use strict'
    return t.extend('sap.ui.demo.cart.Component', {
      metadata: { manifest: 'json' },
      init: function () {
        var i = new e('SHOPPING_CART', {
          cartEntries: {},
          savedForLaterEntries: {}
        })
        this.setModel(i, 'cartProducts')
        var n = new e('PRODUCT_COMPARISON', {
          category: '',
          item1: '',
          item2: ''
        })
        this.setModel(n, 'comparison')
        this.setModel(s.createDeviceModel(), 'device')
        t.prototype.init.apply(this, arguments)
        this.getRouter().initialize()
        this.getRouter().attachTitleChanged(function (t) {
          var e = t.getParameter('title')
          document.addEventListener('DOMContentLoaded', function () {
            document.title = e
          })
        })
      },
      getContentDensityClass: function () {
        if (this._sContentDensityClass === undefined) {
          if (
            document.body.classList.contains('sapUiSizeCozy') ||
            document.body.classList.contains('sapUiSizeCompact')
          ) {
            this._sContentDensityClass = ''
          } else if (!i.support.touch) {
            this._sContentDensityClass = 'sapUiSizeCompact'
          } else {
            this._sContentDensityClass = 'sapUiSizeCozy'
          }
        }
        return this._sContentDensityClass
      }
    })
  }
)
