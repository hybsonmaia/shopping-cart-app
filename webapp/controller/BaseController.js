sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    'sap/ui/core/UIComponent',
    'sap/ui/core/routing/History',
    '../model/cart'
  ],
  function (e, t, o, n, r) {
    'use strict'
    return e.extend('sap.ui.demo.cart.controller.BaseController', {
      cart: r,
      getRouter: function () {
        return o.getRouterFor(this)
      },
      getModel: function (e) {
        return this.getView().getModel(e)
      },
      setModel: function (e, t) {
        return this.getView().setModel(e, t)
      },
      getResourceBundle: function () {
        return this.getOwnerComponent().getModel('i18n').getResourceBundle()
      },
      onAvatarPress: function () {
        var e = this.getResourceBundle().getText('avatarButtonMessageToastText')
        t.show(e)
      },
      onStateChange: function (e) {
        var t = e.getParameter('layout'),
          o = e.getParameter('maxColumnsCount')
        if (o === 1) {
          this.getModel('appView').setProperty('/smallScreenMode', true)
        } else {
          this.getModel('appView').setProperty('/smallScreenMode', false)
          if (t === 'OneColumn') {
            this._setLayout('Two')
          }
        }
      },
      _setLayout: function (e) {
        if (e) {
          this.getModel('appView').setProperty(
            '/layout',
            e + 'Column' + (e === 'One' ? '' : 'sMidExpanded')
          )
        }
      },
      onBack: function () {
        var e = n.getInstance()
        var t = e.getPreviousHash()
        if (t !== undefined) {
          window.history.go(-1)
        } else {
          this.getRouter().navTo('home')
        }
      },
      onAddToCart: function () {
        var e = this.getOwnerComponent().getModel('i18n').getResourceBundle()
        var t = arguments[0].getSource().getBindingContext().getObject()
        var o = this.getView().getModel('cartProducts')
        r.addToCart(e, t, o)
      },
      _clearComparison: function () {
        var e = this.getOwnerComponent().getModel('comparison')
        e.setData({ category: '', item1: '', item2: '' })
      }
    })
  }
)
