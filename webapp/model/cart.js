sap.ui.define(['sap/m/MessageBox', 'sap/m/MessageToast'], function (t, e) {
  'use strict'
  return {
    addToCart: function (e, s, a) {
      if (s.Product !== undefined) {
        s = s.Product
      }
      switch (s.Status) {
        case 'D':
          t.show(e.getText('productStatusDiscontinuedMsg'), {
            icon: t.Icon.ERROR,
            titles: e.getText('productStatusDiscontinuedTitle'),
            actions: [t.Action.CLOSE]
          })
          break
        case 'O':
          t.show(e.getText('productStatusOutOfStockMsg'), {
            icon: t.Icon.QUESTION,
            title: e.getText('productStatusOutOfStockTitle'),
            actions: [t.Action.OK, t.Action.CANCEL],
            onClose: function (i) {
              if (t.Action.OK === i) {
                this._updateCartItem(e, s, a)
              }
            }.bind(this)
          })
          break
        case 'A':
        default:
          this._updateCartItem(e, s, a)
          break
      }
    },
    _updateCartItem: function (t, s, a) {
      var i = Object.assign({}, a.getData()['cartEntries'])
      var c = i[s.ProductId]
      if (c === undefined) {
        c = Object.assign({}, s)
        c.Quantity = 1
        i[s.ProductId] = c
      } else {
        c.Quantity += 1
      }
      a.setProperty('/cartEntries', Object.assign({}, i))
      a.refresh(true)
      e.show(t.getText('productMsgAddedToCart', [s.Name]))
    }
  }
})
