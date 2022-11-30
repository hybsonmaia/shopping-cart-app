sap.ui.define(['./BaseController', '../model/formatter'], function (t, e) {
  'use strict'
  return t.extend('sap.ui.demo.cart.controller.Product', {
    formatter: e,
    onInit: function () {
      var t = this.getOwnerComponent()
      this._router = t.getRouter()
      this._router
        .getRoute('product')
        .attachPatternMatched(this._routePatternMatched, this)
      this._router.getTarget('product').attachDisplay(function (t) {
        this.fnUpdateProduct(t.getParameter('data').productId)
      }, this)
    },
    _routePatternMatched: function (t) {
      var e = t.getParameter('arguments').productId,
        that = this,
        a = this.getView(),
        r = a.getModel()
      r.metadataLoaded().then(
        function () {
          var t = '/' + this.getModel().createKey('Products', { ProductId: e })
          a.bindElement({
            path: t,
            events: {
              dataRequested: function () {
                a.setBusy(true)
              },
              dataReceived: function () {
                that._controlFieldsVisibility(r, t)
                that._mountTechnicalSpecsList(r, t)
                a.setBusy(false)
              }
            }
          })
          var n = r.getData(t)
          if (!n) {
            a.setBusyIndicatorDelay(0)
            a.getElementBinding().attachEventOnce(
              'dataReceived',
              function () {
                a.setBusyIndicatorDelay(null)
                this._checkIfProductAvailable(t)
              }.bind(this)
            )
          }
        }.bind(this)
      )
    },
    fnUpdateProduct: function (t) {
      var e = "/Products('" + t + "')",
        a = function () {
          this._checkIfProductAvailable(e)
        }
      this.getView().bindElement({ path: e, events: { change: a.bind(this) } })
    },
    _checkIfProductAvailable: function (t) {
      var e = this.getModel()
      var a = e.getData(t)
      if (!a) {
        this._router.getTargets().display('notFound')
      }
    },
    _controlFieldsVisibility: function (r, t) {
      var productData = r.getObject(t)
      if (
        productData.ShortDescription == undefined ||
        productData.ShortDescription == ''
      ) {
        this.getView().byId('oaDescription').setVisible(false)
      } else {
        this.getView().byId('oaDescription').setVisible(true)
      }
      if (
        productData.Weight == undefined ||
        productData.WeightUnit == undefined ||
        productData.Weight == '' ||
        productData.WeightUnit == ''
      ) {
        this.getView().byId('oaWeight').setVisible(false)
      } else {
        this.getView().byId('oaWeight').setVisible(true)
      }
      if (
        productData.DimensionWidth == undefined ||
        productData.DimensionDepth == undefined ||
        productData.DimensionHeight == undefined ||
        productData.Unit == undefined ||
        productData.DimensionWidth == '' ||
        productData.DimensionDepth == '' ||
        productData.DimensionHeight == '' ||
        productData.Unit == ''
      ) {
        this.getView().byId('aoDimension').setVisible(false)
      } else {
        this.getView().byId('aoDimension').setVisible(true)
      }
      if (productData.TechnicalSpecs == undefined) {
        this.getView().byId('listTechnicalSpecs').setVisible(false)
      } else {
        this.getView().byId('listTechnicalSpecs').setVisible(true)
      }
    },
    _mountTechnicalSpecsList: function (r, t) {
      var productData = r.getObject(t)
      var oListModel = new sap.ui.model.json.JSONModel()
      var keyValues = []
      this.setModel(oListModel, 'listModel')
      if (productData.TechnicalSpecs != undefined) {
        for (const [key, value] of Object.entries(productData.TechnicalSpecs)) {
          var element = {}
          element.key = key
          element.value = value
          keyValues.push(element)
        }
        oListModel.setData(keyValues)
        this.getView().byId('listTechnicalSpecs').setModel(oListModel)
      }
    },
    onToggleCart: function (t) {
      var e = t.getParameter('pressed')
      var a = this.getView().getBindingContext().getObject()
      this._setLayout(e ? 'Three' : 'Two')
      this.getRouter().navTo(e ? 'productCart' : 'product', {
        id: a.Category,
        productId: a.ProductId
      })
    }
  })
})
