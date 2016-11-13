angular.module('algolia')
  .controller('HomeController', HomeController);

HomeController.$inject=['$scope', 'algolia'];
function HomeController( $scope,   algolia ) {
  var vm = this;
  vm.hello = "Helloooo";

  $scope.search = {
        query: '',
        hits: []
      };
    var client = algolia.Client( "J31118LB7W", "805c64911a7abd9b7a02ac3fe9f28d00");
    var index = client.initIndex('restaurants');

      $scope.$watch('search.query', function() {
        index.search($scope.search.query)
          .then(function searchSuccess(content) {
            console.log("CONTENT", content);
            // add content of search results to scope for display in view
            $scope.search.hits = content.hits;
          }, function searchFailure(err) {
            console.log(err);
        });
      });
}
