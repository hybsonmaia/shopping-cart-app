sap.ui.define(
  [
    './BaseController',
    '../model/cart',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    '../model/formatter'
  ],
  function (e, t, o, r, i, a) {
    'use strict'
    return e.extend('sap.ui.demo.cart.controller.Welcome', {
      _iCarouselTimeout: 0,
      _iCarouselLoopTime: 8e3,
      formatter: a,
      _mFilters: {
        Promoted: [new r('Type', i.EQ, 'Promoted')],
        Viewed: [new r('Type', i.EQ, 'Viewed')],
        Favorite: [new r('Type', i.EQ, 'Favorite')]
      },
      onInit: function () {
        var e = new o({
          welcomeCarouselShipping: 'sap/ui/demo/cart/img/Shipping_273087.jpg',
          welcomeCarouselInviteFriend:
            'sap/ui/demo/cart/img/InviteFriend_276352.jpg',
          welcomeCarouselTablet: 'sap/ui/demo/cart/img/Tablet_275777.jpg',
          welcomeCarouselCreditCard:
            'sap/ui/demo/cart/img/CreditCard_277268.jpg',
          Promoted: [],
          Viewed: [],
          Favorite: [],
          Currency: 'BRL'
        })
        this.getView().setModel(e, 'view')
        this.getRouter().attachRouteMatched(this._onRouteMatched, this)
        var t = this.byId('welcomeCarousel')
        var r = Math.floor(Math.abs(Math.random()) * t.getPages().length)
        t.setActivePage(t.getPages()[r])
      },
      onAfterRendering: function () {
        this.onCarouselPageChanged()
      },
      _onRouteMatched: function (e) {
        var t = e.getParameter('name')
        if (t === 'home') {
          this._setLayout('Two')
        }
        if (t !== 'product' && t !== 'cartProduct') {
          var o = this.getView().getModel('view').getProperty('/Promoted')
          if (!o.length) {
            var r = this.getModel()
            Object.keys(this._mFilters).forEach(
              function (e) {
                r.read('/FeaturedProducts', {
                  urlParameters: { $expand: 'Product' },
                  filters: this._mFilters[e],
                  success: function (t) {
                    this.getModel('view').setProperty('/' + e, t.results)
                    if (e === 'Promoted') {
                      this._selectPromotedItems()
                    }
                  }.bind(this)
                })
              }.bind(this)
            )
          }
        }
      },
      onCarouselPageChanged: function () {
        clearTimeout(this._iCarouselTimeout)
        this._iCarouselTimeout = setTimeout(
          function () {
            var e = this.byId('welcomeCarousel')
            if (e) {
              e.next()
              this.onCarouselPageChanged()
            }
          }.bind(this),
          this._iCarouselLoopTime
        )
      },
      onSelectProduct: function (e) {
        var t = e.getSource().getBindingContext('view')
        var o = t.getProperty('Product/Category')
        var r = t.getProperty('Product/ProductId')
        this.getRouter().navTo('product', { id: o, productId: r })
      },
      onShowCategories: function () {
        this.getRouter().navTo('categories')
      },
      onAddToCart: function (e) {
        var o = this.getModel('i18n').getResourceBundle()
        var r = e.getSource().getBindingContext('view').getObject()
        var i = this.getModel('cartProducts')
        t.addToCart(o, r, i)
      },
      onToggleCart: function (e) {
        var t = e.getParameter('pressed')
        this._setLayout(t ? 'Three' : 'Two')
        this.getRouter().navTo(t ? 'cart' : 'home')
      },
      _selectPromotedItems: function () {
        var e = this.getView().getModel('view').getProperty('/Promoted')
        var t,
          o = Math.floor(Math.random() * e.length)
        do {
          t = Math.floor(Math.random() * e.length)
        } while (t === o)
        this.getModel('view').setProperty('/Promoted', [e[t], e[o]])
      }
    })
  }
)
