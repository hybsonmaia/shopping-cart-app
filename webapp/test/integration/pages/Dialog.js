sap.ui.define(
  ['sap/ui/test/Opa5', './Common', 'sap/ui/test/actions/Press'],
  function (t, e, n) {
    'use strict'
    t.createPageObjects({
      onTheDialog: {
        baseClass: e,
        actions: {
          iPressDeleteButtonOnTheConfirmationDialog: function () {
            return this.waitFor({
              controlType: 'sap.m.Button',
              matchers: function (t) {
                return this.I18NTextExtended(
                  t,
                  'MSGBOX_DELETE',
                  'text',
                  'sap.m'
                )
              }.bind(this),
              actions: new n(),
              errorMessage: 'The delete button could not be pressed'
            })
          },
          iPressCancelOnTheConfirmationDialog: function () {
            return this.waitFor({
              controlType: 'sap.m.Button',
              matchers: function (t) {
                return this.I18NTextExtended(
                  t,
                  'MSGBOX_CANCEL',
                  'text',
                  'sap.m'
                )
              }.bind(this),
              actions: new n(),
              errorMessage: 'The cancel button could not be pressed'
            })
          }
        },
        assertions: {
          iShouldBeTakenToTheConfirmationDialog: function () {
            return this.waitFor({
              controlType: 'sap.m.Button',
              matchers: function (t) {
                return this.I18NTextExtended(
                  t,
                  'MSGBOX_DELETE',
                  'text',
                  'sap.m'
                )
              }.bind(this),
              success: function (e) {
                t.assert.ok(e, 'The delete button was found')
              },
              errorMessage: 'The delete button was not found'
            })
          }
        }
      }
    })
  }
)
