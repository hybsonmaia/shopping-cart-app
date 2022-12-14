sap.ui.define(
  [
    'sap/ui/model/type/String',
    'sap/ui/model/ValidateException',
    'sap/ui/model/resource/ResourceModel'
  ],
  function (e, a, i) {
    'use strict'
    var t = new i({ bundleName: 'sap.ui.demo.cart.i18n.i18n' })
    return e.extend('sap.ui.demo.cart.model.EmailType', {
      validateValue: function (e) {
        var i = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/
        if (!e.match(i)) {
          throw new a(
            t
              .getResourceBundle()
              .getText('checkoutCodEmailValueTypeMismatch', [e])
          )
        }
      }
    })
  }
)
