angular.module('algolia')
  .controller('HomeController', HomeController);

HomeController.$inject=['$scope', '$http'];
function HomeController( $scope,   $http ) {
  var vm = this;
  vm.hello = "Helloooo"
}
