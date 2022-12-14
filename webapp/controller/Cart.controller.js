sap.ui.define(
  [
    './BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/ui/Device',
    '../model/formatter',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
  ],
  function (t, e, o, r, i, a) {
    'use strict'
    var s = 'cartProducts'
    var n = 'savedForLaterEntries'
    var c = 'cartEntries'
    return t.extend('sap.ui.demo.cart.controller.Cart', {
      formatter: r,
      onInit: function () {
        this._oRouter = this.getRouter()
        this._oRouter
          .getRoute('cart')
          .attachPatternMatched(this._routePatternMatched, this)
        this._oRouter
          .getRoute('productCart')
          .attachPatternMatched(this._routePatternMatched, this)
        this._oRouter
          .getRoute('comparisonCart')
          .attachPatternMatched(this._routePatternMatched, this)
        var t = new e({})
        this.getView().setModel(t, 'cfg')
        this._toggleCfgModel()
        var o = this.byId('editButton')
        o.addEventDelegate({
          onAfterRendering: function () {
            o.focus()
          }
        })
      },
      onExit: function () {
        if (this._orderDialog) {
          this._orderDialog.destroy()
        }
        if (this._orderBusyDialog) {
          this._orderBusyDialog.destroy()
        }
      },
      _routePatternMatched: function () {
        this._setLayout('Three')
        var t = this.getModel('cartProducts')
        var e = t.getProperty('/cartEntries')
        if (Object.keys(e).length > 0) {
          t.setProperty('/showProceedButton', true)
          t.setProperty('/showEditButton', true)
        }
        var o = this.byId('entryList')
        o.removeSelections()
      },
      onEditOrDoneButtonPress: function () {
        this._toggleCfgModel()
      },
      _toggleCfgModel: function () {
        var t = this.getView().getModel('cfg')
        var e = t.getData()
        var r = this.getResourceBundle()
        var i = !e.hasOwnProperty('inDelete')
        var a = i ? true : e.inDelete
        var s = o.system.phone ? 'None' : 'SingleSelectMaster'
        var n = o.system.phone ? 'Active' : 'Inactive'
        t.setData({
          inDelete: !a,
          notInDelete: a,
          listMode: a ? s : 'Delete',
          listItemType: a ? n : 'Inactive',
          pageTitle: a ? r.getText('appTitle') : r.getText('cartTitleEdit')
        })
      },
      onEntryListPress: function (t) {
        this._showProduct(t.getSource())
      },
      onEntryListSelect: function (t) {
        this._showProduct(t.getParameter('listItem'))
      },
      onSaveForLater: function (t) {
        var e = t.getSource().getBindingContext(s)
        this._changeList(n, c, e)
      },
      onAddBackToBasket: function (t) {
        var e = t.getSource().getBindingContext(s)
        this._changeList(c, n, e)
      },
      _changeList: function (t, e, o) {
        var r = o.getModel()
        var i = o.getObject()
        var a = r.getData()
        var s = Object.assign({}, a[t])
        var n = Object.assign({}, a[e])
        var c = i.ProductId
        if (s[c] === undefined) {
          s[c] = Object.assign({}, i)
        }
        delete n[c]
        r.setProperty('/' + t, s)
        r.setProperty('/' + e, n)
      },
      _showProduct: function (t) {
        var e = t.getBindingContext(s).getObject()
        var r = false
        if (!o.system.phone) {
          r = this.getModel('appView')
            .getProperty('/layout')
            .startsWith('Three')
        } else {
          r = false
          this._setLayout('Two')
        }
        this._oRouter.navTo(
          r ? 'productCart' : 'product',
          { id: e.Category, productId: e.ProductId },
          !o.system.phone
        )
      },
      onCartEntriesDelete: function (t) {
        this._deleteProduct(c, t)
      },
      onSaveForLaterDelete: function (t) {
        this._deleteProduct(n, t)
      },
      _deleteProduct: function (t, e) {
        var o = e.getParameter('listItem').getBindingContext(s),
          r = this.getResourceBundle(),
          n = o.getProperty('ProductId'),
          c = o.getProperty('Name')
        i.show(r.getText('cartDeleteDialogMsg'), {
          title: r.getText('cartDeleteDialogTitle'),
          actions: [i.Action.DELETE, i.Action.CANCEL],
          onClose: function (e) {
            if (e !== i.Action.DELETE) {
              return
            }
            var s = o.getModel()
            var g = Object.assign({}, s.getData()[t])
            delete g[n]
            s.setProperty('/' + t, Object.assign({}, g))
            a.show(r.getText('cartDeleteDialogConfirmDeleteMsg', [c]))
          }
        })
      },
      onProceedButtonPress: function () {
        this.getRouter().navTo('checkout')
      }
    })
  }
)
