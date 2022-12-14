sap.ui.define(['./BaseController', '../model/formatter'], function (t, e) {
  'use strict'
  return t.extend('sap.ui.demo.cart.controller.Comparison', {
    formatter: e,
    onInit: function () {
      this._oRouter = this.getRouter()
      this._oRouter
        .getRoute('comparison')
        .attachPatternMatched(this._onRoutePatternMatched, this)
      this._oRouter
        .getRoute('comparisonCart')
        .attachPatternMatched(this._onRoutePatternMatched, this)
    },
    _onRoutePatternMatched: function (t) {
      var e = this.byId('comparisonContainer')
      var o = t.getParameter('arguments')
      var r = this.byId('placeholder')
      this.getModel('comparison').setProperty('/category', o.id)
      this.getModel('comparison').setProperty('/item1', o.item1Id)
      this.getModel('comparison').setProperty('/item2', o.item2Id)
      r.setVisible(false)
      i(0, o.item1Id)
      i(1, o.item2Id)
      function i(t, o) {
        var i = e.getItems()[t]
        if (o) {
          var a = "/Products('" + o + "')"
          i.bindElement({ path: a })
          i.setVisible(true)
        } else {
          i.unbindElement()
          i.setVisible(false)
          r.setVisible(true)
        }
      }
    },
    onRemoveComparison: function (t) {
      var e = t.getSource().getBindingContext()
      var o = this.getModel('comparison').getProperty('/item1')
      var r = o === e.getObject().ProductId
      var i = this.getModel('comparison').getProperty('/item' + (r ? 2 : 1))
      var a = this.getModel('comparison').getProperty('/category')
      this.getRouter().navTo('comparison', { id: a, item1Id: i }, true)
    },
    onToggleCart: function (t) {
      var e = t.getParameter('pressed')
      var o = this.getView().getModel('comparison').getProperty('/item1')
      var r = this.getView().getModel('comparison').getProperty('/item2')
      var i = this.getView().getModel('comparison').getProperty('/category')
      this._setLayout(e ? 'Three' : 'Two')
      this.getRouter().navTo(e ? 'comparisonCart' : 'comparison', {
        id: i,
        item1Id: o,
        item2Id: r
      })
    }
  })
})
