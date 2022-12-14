sap.ui.define(
  [
    './BaseController',
    '../model/formatter',
    'sap/ui/Device',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/MessageToast',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/Fragment'
  ],
  function (t, e, i, o, r, a, s, n) {
    'use strict'
    return t.extend('sap.ui.demo.cart.controller.Category', {
      formatter: e,
      _iLowFilterPreviousValue: 0,
      _iHighFilterPreviousValue: 5e3,
      onInit: function () {
        var t = new s({ Suppliers: [] })
        this.getView().setModel(t, 'view')
        var e = this.getOwnerComponent()
        this._oRouter = e.getRouter()
        this._oRouter
          .getRoute('category')
          .attachMatched(this._loadCategories, this)
        this._oRouter
          .getRoute('productCart')
          .attachMatched(this._loadCategories, this)
        this._oRouter
          .getRoute('product')
          .attachMatched(this._loadCategories, this)
        this._oRouter
          .getRoute('comparison')
          .attachMatched(this._loadCategories, this)
        this._oRouter
          .getRoute('comparisonCart')
          .attachMatched(this._loadCategories, this)
      },
      _loadCategories: function (t) {
        var e = this.getModel('appView').getProperty('/smallScreenMode'),
          i = t.getParameter('name')
        if (i === 'category') {
          this._setLayout(e ? 'One' : 'Two')
        }
        var o = this.getModel()
        this._loadSuppliers()
        var r = this.byId('productList')
        var a = r.getBinding('items')
        a.attachDataReceived(this.fnDataReceived, this)
        var s = t.getParameter('arguments').id
        this._sProductId = t.getParameter('arguments').productId
        o.metadataLoaded().then(
          function () {
            var t = this.getView(),
              e =
                '/' +
                this.getModel().createKey('ProductCategories', { Category: s })
            t.bindElement({
              path: e,
              parameters: { expand: 'Products' },
              events: {
                dataRequested: function () {
                  t.setBusy(true)
                },
                dataReceived: function () {
                  t.setBusy(false)
                }
              }
            })
          }.bind(this)
        )
      },
      _loadSuppliers: function () {
        var t = this.getModel()
        t.read('/Products', {
          success: function (t) {
            var e = t.results,
              i = []
            e.forEach(function (t) {
              i.push(t.SupplierName)
            })
            var o = i
              .filter(function (t, e, i) {
                return i.indexOf(t) === e
              })
              .sort()
            o.map(function (t, e, i) {
              i[e] = { SupplierName: t }
            })
            this.getModel('view').setProperty('/Suppliers', o)
          }.bind(this)
        })
        this._clearComparison()
      },
      fnDataReceived: function () {
        var t = this.byId('productList')
        var e = t.getItems()
        e.some(
          function (e) {
            if (
              e.getBindingContext().getPath() ===
              "/Products('" + this._sProductId + "')"
            ) {
              t.setSelectedItem(e)
              return true
            }
          }.bind(this)
        )
      },
      onProductListSelect: function (t) {
        this._showProduct(t)
      },
      onProductDetails: function (t) {
        var e
        if (i.system.phone) {
          e = t.getSource().getBindingContext()
        } else {
          e = t.getSource().getSelectedItem().getBindingContext()
        }
        var o = e.getModel()
        var r = o.getData(e.getPath()).Category
        var a = o.getData(e.getPath()).ProductId
        var s = this.getModel('appView')
          .getProperty('/layout')
          .startsWith('Three')
        this._setLayout('Two')
        this._oRouter.navTo(
          s ? 'productCart' : 'product',
          { id: r, productId: a },
          !i.system.phone
        )
      },
      _applyFilter: function (t) {
        var e = this.byId('productList'),
          i = e.getBinding('items'),
          a = t.getParameter('filterItems'),
          s = this.byId('categoryFilterDialog').getFilterItems()[1],
          n,
          g = {},
          u = [],
          l = [],
          c = [],
          d = []
        if (
          s.getCustomControl().getAggregation('content')[0].getValue() !==
            s.getCustomControl().getAggregation('content')[0].getMin() ||
          s.getCustomControl().getAggregation('content')[0].getValue2() !==
            s.getCustomControl().getAggregation('content')[0].getMax()
        ) {
          a.push(s)
        }
        a.forEach(function (t) {
          var e = t.getProperty('key'),
            i,
            a
          switch (e) {
            case 'Available':
              n = new o('Status', r.EQ, 'A')
              l.push(n)
              break
            case 'OutOfStock':
              n = new o('Status', r.EQ, 'O')
              l.push(n)
              break
            case 'Discontinued':
              n = new o('Status', r.EQ, 'D')
              l.push(n)
              break
            case 'Price':
              i = t.getCustomControl().getAggregation('content')[0].getValue()
              a = t.getCustomControl().getAggregation('content')[0].getValue2()
              n = new o('Price', r.BT, i, a)
              c.push(n)
              g['priceKey'] = { Price: true }
              break
            default:
              n = new o('SupplierName', r.EQ, e)
              d.push(n)
          }
        })
        if (l.length > 0) {
          u.push(new o({ filters: l }))
        }
        if (c.length > 0) {
          u.push(new o({ filters: c }))
        }
        if (d.length > 0) {
          u.push(new o({ filters: d }))
        }
        n = new o({ filters: u, and: true })
        if (u.length > 0) {
          i.filter(n)
          this.byId('categoryInfoToolbar').setVisible(true)
          var h = this.getResourceBundle().getText('filterByText') + ' '
          var p = ''
          var m = t.getParameter('filterCompoundKeys')
          var f = Object.assign(m, g)
          for (var v in f) {
            if (f.hasOwnProperty(v)) {
              h =
                h +
                p +
                this.getResourceBundle().getText(v, [
                  this._iLowFilterPreviousValue,
                  this._iHighFilterPreviousValue
                ])
              p = ', '
            }
          }
          this.byId('categoryInfoToolbarTitle').setText(h)
        } else {
          i.filter(null)
          this.byId('categoryInfoToolbar').setVisible(false)
          this.byId('categoryInfoToolbarTitle').setText('')
        }
      },
      onFilter: function () {
        if (!this._pCategoryFilterDialog) {
          this._pCategoryFilterDialog = n
            .load({
              id: this.getView().getId(),
              name: 'sap.ui.demo.cart.view.CategoryFilterDialog',
              controller: this
            })
            .then(
              function (t) {
                this.getView().addDependent(t)
                t.addStyleClass(
                  this.getOwnerComponent().getContentDensityClass()
                )
                return t
              }.bind(this)
            )
        }
        this._pCategoryFilterDialog.then(function (t) {
          t.open()
        })
      },
      handleConfirm: function (t) {
        var e = this.byId('categoryFilterDialog').getFilterItems()[1]
        var i = e.getCustomControl().getAggregation('content')[0]
        this._iLowFilterPreviousValue = i.getValue()
        this._iHighFilterPreviousValue = i.getValue2()
        this._applyFilter(t)
      },
      handleCancel: function () {
        var t = this.byId('categoryFilterDialog').getFilterItems()[1]
        var e = t.getCustomControl().getAggregation('content')[0]
        e.setValue(this._iLowFilterPreviousValue).setValue2(
          this._iHighFilterPreviousValue
        )
        if (
          this._iLowFilterPreviousValue > e.getMin() ||
          this._iHighFilterPreviousValue !== e.getMax()
        ) {
          t.setFilterCount(1)
        } else {
          t.setFilterCount(0)
        }
      },
      handleChange: function (t) {
        var e = this.byId('categoryFilterDialog').getFilterItems()[1]
        var i = e.getCustomControl().getAggregation('content')[0]
        var o = t.getParameter('range')[0]
        var r = t.getParameter('range')[1]
        if (o !== i.getMin() || r !== i.getMax()) {
          e.setFilterCount(1)
        } else {
          e.setFilterCount(0)
        }
      },
      handleResetFilters: function () {
        var t = this.byId('categoryFilterDialog').getFilterItems()[1]
        var e = t.getCustomControl().getAggregation('content')[0]
        e.setValue(e.getMin())
        e.setValue2(e.getMax())
        t.setFilterCount(0)
      },
      compareProducts: function (t) {
        var e = t.getSource().getBindingContext().getObject()
        var i = this.getModel('comparison').getProperty('/item1')
        var o = this.getModel('comparison').getProperty('/item2')
        this._oRouter.navTo(
          'comparison',
          {
            id: e.Category,
            item1Id: i ? i : e.ProductId,
            item2Id: i && i != e.ProductId ? e.ProductId : o
          },
          true
        )
      },
      onBack: function () {
        this.getRouter().navTo('categories')
      }
    })
  }
)
