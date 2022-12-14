sap.ui.define(
  ['sap/ui/demo/cart/model/formatter', '../helper/FakeI18nModel'],
  function (t, o) {
    'use strict'
    QUnit.module('price')
    function e(o, e, r) {
      var i = t.price(e)
      o.strictEqual(i, r, 'The formatting was correct')
    }
    QUnit.test('Should format a number with no digits', function (t) {
      e.call(this, t, '123', '123,00')
    })
    QUnit.test(
      'Should contain a decimal separator for large numbers',
      function (t) {
        e.call(this, t, '12345.67', '12.345,67')
      }
    )
    QUnit.test('Should round a number with more than 2 digits', function (t) {
      e.call(this, t, '3.123', '3,12')
    })
    QUnit.test('Should format a negative number properly', function (t) {
      e.call(this, t, '-3', '-3,00')
    })
    QUnit.test('Should format an empty string properly', function (t) {
      e.call(this, t, '', '0,00')
    })
    QUnit.test('Should format a zero properly', function (t) {
      e.call(this, t, '0', '0,00')
    })
    QUnit.module('totalPrice')
    function r(e, r, i) {
      var s = {
        getResourceBundle: function () {
          return new o({ cartTotalPrice: 'Foo: {0}' }).getResourceBundle()
        }
      }
      var u = t.totalPrice.bind(s)
      var a = u(r)
      e.strictEqual(a, i, 'Correct total text was assigned')
    }
    QUnit.test(
      'Should multiply the price with the quantity for  1 product',
      function (t) {
        var o = { 1: { Price: 123, Quantity: 2 } }
        r.call(this, t, o, 'Foo: 246,00')
      }
    )
    QUnit.test(
      'Should format a quantity of 0 to a total of zero for one product',
      function (t) {
        var o = { 1: { Price: 123, Quantity: 0 } }
        r.call(this, t, o, 'Foo: 0,00')
      }
    )
    QUnit.test(
      'Should format two products with quantities and digits to the correct price',
      function (t) {
        var o = {
          1: { Price: 123.45, Quantity: 1 },
          2: { Price: 456.78, Quantity: 2 }
        }
        r.call(this, t, o, 'Foo: 1.037,01')
      }
    )
    QUnit.module('statusText')
    function i(e, r, i) {
      var s = {
        getResourceBundle: function () {
          return new o({
            statusA: '1',
            statusO: '2',
            statusD: '3'
          }).getResourceBundle()
        }
      }
      var u = t.statusText.bind(s)
      var a = u(r)
      e.strictEqual(a, i, 'Correct text was assigned')
    }
    QUnit.test(
      "Should provide the status text 'statusA' for products with status A",
      function (t) {
        i.call(this, t, 'A', '1')
      }
    )
    QUnit.test(
      "Should provide the status text 'statusO' for products with status O",
      function (t) {
        i.call(this, t, 'O', '2')
      }
    )
    QUnit.test(
      "Should provide the status text 'statusD' for products with status D",
      function (t) {
        i.call(this, t, 'D', '3')
      }
    )
    QUnit.test(
      'Should provide the original input for all other values',
      function (t) {
        i.call(this, t, 'foo', 'foo')
        i.call(this, t, '', '')
      }
    )
    QUnit.module('statusState')
    function s(o, e, r) {
      var i = t.statusState(e)
      o.strictEqual(i, r, 'The formatter returned the correct state')
    }
    QUnit.test(
      'Should return "Success" status for products with status A',
      function (t) {
        s.call(this, t, 'A', 'Success')
      }
    )
    QUnit.test(
      'Should return "Warning" status for products with status A',
      function (t) {
        s.call(this, t, 'O', 'Warning')
      }
    )
    QUnit.test(
      'Should return "Error" status for products with status A',
      function (t) {
        s.call(this, t, 'D', 'Error')
      }
    )
    QUnit.test(
      'Should return "None" status for all other statuses',
      function (t) {
        s.call(this, t, 'foo', 'None')
        s.call(this, t, '', 'None')
      }
    )
    QUnit.module('pictureUrl')
    QUnit.test(
      "Should return the url to a product picture relative to the app's root directory",
      function (o) {
        var e = t.pictureUrl('sap/ui/demo/mock/images/foo.jpg')
        o.strictEqual(
          e,
          './../../localService/mockdata/images/foo.jpg',
          'The formatter returned the correct URL'
        )
      }
    )
  }
)
