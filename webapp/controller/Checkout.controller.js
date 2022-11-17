sap.ui.define(
  [
    './BaseController',
    '../model/cart',
    'sap/ui/model/json/JSONModel',
    'sap/ui/Device',
    '../model/formatter',
    'sap/m/MessageBox',
    'sap/m/Link',
    'sap/m/MessagePopover',
    'sap/m/MessagePopoverItem',
    '../model/EmailType',
    'sap/ui/core/Core'
  ],
  function (e, t, r, i, s, a, n, o, d, c, h) {
    'use strict'
    return e.extend('sap.ui.demo.cart.controller.Checkout', {
      types: { email: new c() },
      formatter: s,
      onInit: function () {
        var e = new r({
            SelectedPayment: 'Credit Card',
            SelectedDeliveryMethod: 'Standard Delivery',
            DifferentDeliveryAddress: false,
            CashOnDelivery: {
              FirstName: '',
              LastName: '',
              PhoneNumber: '',
              Email: ''
            },
            InvoiceAddress: {
              Address: '',
              City: '',
              ZipCode: '',
              Country: '',
              Note: ''
            },
            DeliveryAddress: {
              Address: '',
              Country: '',
              City: '',
              ZipCode: '',
              Note: ''
            },
            CreditCard: {
              Name: '',
              CardNumber: '',
              SecurityCode: '',
              Expire: ''
            }
          }),
          t = this.byId('returnToShopButton')
        this.setModel(e)
        this._oHistory = {
          prevPaymentSelect: null,
          prevDiffDeliverySelect: null
        }
        this.setModel(h.getMessageManager().getMessageModel(), 'message')
        this.getRouter()
          .getRoute('checkout')
          .attachMatched(
            function () {
              this._setLayout('One')
            }.bind(this)
          )
        this.getView().addEventDelegate({
          onAfterShow: function () {
            t.focus()
          }
        })
      },
      onShowMessagePopoverPress: function (e) {
        var t = e.getSource()
        var r = new n({
          text: 'Show more information',
          href: 'http://sap.com',
          target: '_blank'
        })
        var i = new d({
          type: '{message>type}',
          title: '{message>message}',
          subtitle: '{message>additionalText}',
          link: r
        })
        if (!this.byId('errorMessagePopover')) {
          var s = new o(this.createId('messagePopover'), {
            items: { path: 'message>/', template: i },
            afterClose: function () {
              s.destroy()
            }
          })
          this._addDependent(s)
        }
        s.openBy(t)
      },
      _addDependent: function (e) {
        this.getView().addDependent(e)
      },
      goToPaymentStep: function () {
        var e = this.getModel().getProperty('/SelectedPayment')
        var t = this.byId('paymentTypeStep')
        switch (e) {
          case 'Bank Transfer':
            t.setNextStep(this.byId('bankAccountStep'))
            break
          case 'Cash on Delivery':
            t.setNextStep(this.byId('cashOnDeliveryStep'))
            break
          case 'Credit Card':
          default:
            t.setNextStep(this.byId('creditCardStep'))
            break
        }
      },
      setPaymentMethod: function () {
        this._setDiscardableProperty({
          message: this.getResourceBundle().getText(
            'checkoutControllerChangePayment'
          ),
          discardStep: this.byId('paymentTypeStep'),
          modelPath: '/SelectedPayment',
          historyPath: 'prevPaymentSelect'
        })
      },
      setDifferentDeliveryAddress: function () {
        this._setDiscardableProperty({
          message: this.getResourceBundle().getText(
            'checkoutControllerChangeDelivery'
          ),
          discardStep: this.byId('invoiceStep'),
          modelPath: '/DifferentDeliveryAddress',
          historyPath: 'prevDiffDeliverySelect'
        })
      },
      invoiceAddressComplete: function () {
        var e = this.getModel().getProperty('/DifferentDeliveryAddress')
          ? 'deliveryAddressStep'
          : 'deliveryTypeStep'
        this.byId('invoiceStep').setNextStep(this.byId(e))
      },
      handleWizardCancel: function () {
        var e = this.getResourceBundle().getText(
          'checkoutControllerAreYouSureCancel'
        )
        this._handleSubmitOrCancel(e, 'warning', 'home')
      },
      handleWizardSubmit: function () {
        var e = this.getResourceBundle().getText(
          'checkoutControllerAreYouSureSubmit'
        )
        this._handleSubmitOrCancel(e, 'confirm', 'ordercompleted')
      },
      backToWizardContent: function () {
        this.byId('wizardNavContainer').backToPage(
          this.byId('wizardContentPage').getId()
        )
      },
      _clearMessages: function () {
        h.getMessageManager().removeAllMessages()
      },
      onCheckStepActivation: function (e) {
        this._clearMessages()
        var t = e.getSource().getId()
        switch (t) {
          case this.createId('creditCardStep'):
            this.checkCreditCardStep()
            break
          case this.createId('cashOnDeliveryStep'):
            this.checkCashOnDeliveryStep()
            break
          case this.createId('invoiceStep'):
            this.checkInvoiceStep()
            break
          case this.createId('deliveryAddressStep'):
            this.checkDeliveryAddressStep()
            break
        }
      },
      checkCreditCardStep: function () {
        this._checkStep('creditCardStep', [
          'creditCardHolderName',
          'creditCardNumber',
          'creditCardSecurityNumber',
          'creditCardExpirationDate'
        ])
      },
      checkCashOnDeliveryStep: function () {
        this._checkStep('cashOnDeliveryStep', [
          'cashOnDeliveryName',
          'cashOnDeliveryLastName',
          'cashOnDeliveryPhoneNumber',
          'cashOnDeliveryEmail'
        ])
      },
      checkInvoiceStep: function () {
        this._checkStep('invoiceStep', [
          'invoiceAddressAddress',
          'invoiceAddressCity',
          'invoiceAddressZip',
          'invoiceAddressCountry'
        ])
      },
      checkDeliveryAddressStep: function () {
        this._checkStep('deliveryAddressStep', [
          'deliveryAddressAddress',
          'deliveryAddressCity',
          'deliveryAddressZip',
          'deliveryAddressCountry'
        ])
      },
      _checkInputFields: function (e) {
        var t = this.getView()
        return e.some(function (e) {
          var r = t.byId(e)
          var i = r.getBinding('value')
          try {
            i.getType().validateValue(r.getValue())
          } catch (e) {
            return true
          }
          return false
        })
      },
      _checkStep: function (e, t) {
        var r = this.byId('shoppingCartWizard'),
          i = this.byId(e),
          s = this._checkInputFields(t),
          a = !!h.getMessageManager().getMessageModel().getData().length
        if (!a && !s) {
          r.validateStep(i)
        } else {
          r.invalidateStep(i)
        }
      },
      checkCompleted: function () {
        if (h.getMessageManager().getMessageModel().getData().length > 0) {
          a.error(this.getResourceBundle().getText('popOverMessageText'))
        } else {
          this.byId('wizardNavContainer').to(this.byId('summaryPage'))
        }
      },
      onReturnToShopButtonPress: function () {
        this._setLayout('Two')
        this.getRouter().navTo('home')
      },
      _setDiscardableProperty: function (e) {
        var t = this.byId('shoppingCartWizard')
        if (t.getProgressStep() !== e.discardStep) {
          a.warning(e.message, {
            actions: [a.Action.YES, a.Action.NO],
            onClose: function (r) {
              if (r === a.Action.YES) {
                t.discardProgress(e.discardStep)
                this._oHistory[e.historyPath] = this.getModel().getProperty(
                  e.modelPath
                )
              } else {
                this.getModel().setProperty(
                  e.modelPath,
                  this._oHistory[e.historyPath]
                )
              }
            }.bind(this)
          })
        } else {
          this._oHistory[e.historyPath] = this.getModel().getProperty(
            e.modelPath
          )
        }
      },
      _handleSubmitOrCancel: function (e, t, r) {
        a[t](e, {
          actions: [a.Action.YES, a.Action.NO],
          onClose: function (e) {
            if (e === a.Action.YES) {
              var t = this.byId('shoppingCartWizard')
              var i = this.getModel()
              var s = this.getOwnerComponent().getModel('cartProducts')
              this._navToWizardStep(this.byId('contentsStep'))
              t.discardProgress(t.getSteps()[0])
              var n = i.getData()
              n.SelectedPayment = 'Credit Card'
              n.SelectedDeliveryMethod = 'Standard Delivery'
              n.DifferentDeliveryAddress = false
              n.CashOnDelivery = {}
              n.InvoiceAddress = {}
              n.DeliveryAddress = {}
              n.CreditCard = {}
              i.setData(n)
              var o = s.getData()
              o.cartEntries = {}
              o.totalPrice = 0
              s.setData(o)
              this.getRouter().navTo(r)
            }
          }.bind(this)
        })
      },
      _navBackToStep: function (e) {
        var t = e.getSource().data('navBackTo')
        var r = this.byId(t)
        this._navToWizardStep(r)
      },
      _navToWizardStep: function (e) {
        var t = this.byId('wizardNavContainer')
        var r = function () {
          this.byId('shoppingCartWizard').goToStep(e)
          t.detachAfterNavigate(r)
        }.bind(this)
        t.attachAfterNavigate(r)
        t.to(this.byId('wizardContentPage'))
      }
    })
  }
)
