'use strict';

/**
 * @ngdoc function
 * @name deusExStateMachinePortalApp.controller:InstancesCtrl
 * @description
 * # InstancesCtrl
 * Controller of the deusExStateMachinePortalApp
 */
angular.module('deusExStateMachinePortalApp')
    .controller('InstancesCtrl', function($scope, $state, dataService, instances, chartName, username) {
        instances.data.forEach(function(id, i, arr) {
            arr[i] = {
                id: id
            };
        });

        $scope.instances = instances.data;
        $scope.chartName = chartName;

        $scope.createInstance = function(chartName) {
            // closeInstanceSubscription();

            dataService.createInstance(username, chartName).then(function() {
                // loadInstances(stateChart.name);
                $state.go('.', null, { reload: true });
                alertify.success('Instance created');
            }, function(response) {
                if (response.data.message) {
                    alertify.error(response.data.message);
                } else {
                    alertify.error('An error occured');
                }
            });
        };
    });