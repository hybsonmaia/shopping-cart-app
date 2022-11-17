sap.ui.define(['sap/ui/core/format/NumberFormat'], function (t) {
  'use strict'
  var e = { A: 'Success', O: 'Warning', D: 'Error' }
  var r = {
    price: function (e) {
      var r = t.getFloatInstance({
        maxFractionDigits: 2,
        minFractionDigits: 2,
        groupingEnabled: true,
        groupingSeparator: '.',
        decimalSeparator: ','
      })
      return r.format(e)
    },
    totalPrice: function (t) {
      var e = this.getResourceBundle(),
        n = 0
      Object.keys(t).forEach(function (e) {
        var r = t[e]
        n += parseFloat(r.Price) * r.Quantity
      })
      return e.getText('cartTotalPrice', [r.price(n)])
    },
    statusText: function (t) {
      var e = this.getResourceBundle()
      var r = {
        A: e.getText('statusA'),
        O: e.getText('statusO'),
        D: e.getText('statusD')
      }
      return r[t] || t
    },
    statusState: function (t) {
      return e[t] || 'None'
    },
    pictureUrl: function (t) {
      if (t) {
        return sap.ui.require.toUrl(t)
      } else {
        return undefined
      }
    },
    hasItems: function (t, e) {
      var r = !!(t && Object.keys(t).length),
        n = !!(e && Object.keys(e).length)
      return r || n
    }
  }
  return r
})
