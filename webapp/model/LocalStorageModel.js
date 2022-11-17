sap.ui.define(
  ['sap/ui/model/json/JSONModel', 'sap/ui/util/Storage'],
  function (t, a) {
    'use strict'
    return t.extend('sap.ui.demo.cart.model.CartModel', {
      _STORAGE_KEY: 'LOCALSTORAGE_MODEL',
      _storage: new a(a.Type.local),
      constructor: function (a, e) {
        t.apply(this, [].slice.call(arguments, 1))
        this.setSizeLimit(1e6)
        if (a) {
          this._STORAGE_KEY = a
        }
        this._loadData()
        return this
      },
      _loadData: function () {
        var t = this._storage.get(this._STORAGE_KEY)
        if (t) {
          this.setData(JSON.parse(t))
        }
        this._bDataLoaded = true
      },
      _storeData: function () {
        var t = this.getData()
        var a = JSON.stringify(t)
        this._storage.put(this._STORAGE_KEY, a)
      },
      setProperty: function () {
        t.prototype.setProperty.apply(this, arguments)
        this._storeData()
      },
      setData: function () {
        t.prototype.setData.apply(this, arguments)
        if (this._bDataLoaded) {
          this._storeData()
        }
      },
      refresh: function () {
        t.prototype.refresh.apply(this, arguments)
        this._storeData()
      }
    })
  }
)
