/**
 * Created by marco on 01/12/15.
 */

(function(){
    var app = angular.module('ui.router', []);
    app.factory("$state",[function(){return { transitionTo :function(l){return l}}}]);
    app.factory("$stateProvider",[function(){return {}}]);
    app.factory("$stateParamsProvider",[function(){return {}}]);
    app.factory("$stateParams",[function(){return {}}]);


})();