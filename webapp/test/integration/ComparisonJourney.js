sap.ui.define(["sap/ui/core/Configuration","sap/ui/test/opaQunit","./pages/Home","./pages/Category","./pages/Product","./pages/Comparison","./pages/Cart","./pages/Welcome"],function(o,e){"use strict";var n=o.getLanguage(),i="HT-1254",t="HT-1255",r="HT-1137";QUnit.module("Comparison Journey",{before:function(){o.setLanguage("en-US")},after:function(){o.setLanguage(n)}});e("Should see the product list with Compare link",function(o,e,n){o.iStartMyApp();e.onHome.iPressOnTheFlatScreensCategory();n.onTheCategory.iShouldSeeCompareLinkOnListEntry()});e("Should see comparison view with one product",function(o,e,n){e.onTheCategory.iPressOnCompareLink(i);n.onTheComparison.iShouldSeeAProductAndAPlaceholder(i)});e("Should add a product to the cart",function(o,e,n){e.onTheComparison.iAddTheDisplayedProductToTheCart();e.onTheComparison.iToggleTheCart();n.onTheCart.iShouldSeeTheProductInMyCart().and.iShouldSeeTheTotalPriceUpdated()});e("Should see comparison view with two products",function(o,e,n){e.onTheComparison.iToggleTheCart();e.onTheCategory.iPressOnCompareLink(t);n.onTheComparison.iShouldSeeTwoProducts(i,t)});e("Should see comparison view with a different second product",function(o,e,n){e.onTheCategory.iPressOnCompareLink(r);n.onTheComparison.iShouldSeeTwoProducts(i,r)});e("Should see comparison view with one product",function(o,e,n){e.onTheComparison.iDeleteAProduct(i);n.onTheComparison.iShouldSeeAProductAndAPlaceholder(r);n.iTeardownMyApp()})});