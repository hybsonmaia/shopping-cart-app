sap.ui.define(
  [
    './BaseController',
    '../model/formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/Device'
  ],
  function (t, e, o, r, i) {
    'use strict'
    return t.extend('sap.ui.demo.cart.controller.Home', {
      formatter: e,
      onInit: function () {
        var t = this.getOwnerComponent()
        this._router = t.getRouter()
        this._router
          .getRoute('categories')
          .attachMatched(this._onRouteMatched, this)
      },
      _onRouteMatched: function () {
        var t = this.getModel('appView').getProperty('/smallScreenMode')
        if (t) {
          this._setLayout('One')
        }
      },
      onSearch: function () {
        this._search()
      },
      onRefresh: function () {
        var t = this.byId('productList')
        var e = t.getBinding('items')
        var o = function () {
          this.byId('pullToRefresh').hide()
          e.detachDataReceived(o)
        }.bind(this)
        e.attachDataReceived(o)
        this._search()
      },
      _search: function () {
        var t = this.getView()
        var e = t.byId('productList')
        var i = t.byId('categoryList')
        var a = t.byId('searchField')
        var n = a.getValue().length !== 0
        e.setVisible(n)
        i.setVisible(!n)
        var s = e.getBinding('items')
        if (s) {
          if (n) {
            var c = new o('Name', r.Contains, a.getValue())
            s.filter([c])
          } else {
            s.filter([])
          }
        }
      },
      onCategoryListItemPress: function (t) {
        var e = t.getSource().getBindingContext()
        var o = e.getModel()
        var r = o.getData(e.getPath()).Category
        this._router.navTo('category', { id: r })
      },
      onProductListSelect: function (t) {
        var e = t.getParameter('listItem')
        this._showProduct(e)
      },
      onProductListItemPress: function (t) {
        var e = t.getSource()
        this._showProduct(e)
      },
      _showProduct: function (t) {
        var e = t.getBindingContext().getObject()
        this._router.navTo(
          'product',
          { id: e.Category, productId: e.ProductId },
          !i.system.phone
        )
      },
      onBack: function () {
        this.getRouter().navTo('home')
      }
    })
  }
)
