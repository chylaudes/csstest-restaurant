angular.module('algolia')
  .controller('HomeController', HomeController);

HomeController.$inject=['$scope', 'algolia'];
function HomeController( $scope,   algolia ) {
  var client = algolia.Client( "J31118LB7W", "805c64911a7abd9b7a02ac3fe9f28d00");
  var index = client.initIndex('restaurants');
  var vm = this;
  var food_array = ["Italian", "American","Californian", "French", "Seafood","Japanese","Indian"]
  $scope.search = {
                    query: '',
                    hits: []
                  };
  vm.numberOfHits = 0;
  vm.processTime = 0;
  vm.foodTypeCounts = {
    "Italian" : 0,
    "American" : 0,
    "Californian" : 0,
    "French" : 0,
    "Seafood" : 0,
    "Japanese" : 0,
    "Indian" : 0
  };

  $scope.$watch('search.query', function() {
    index.search($scope.search.query)
      .then(function searchSuccess(content) {
        console.log("CONTENT", content);
        // add content of search results to scope for display in view
        $scope.search.hits = content.hits;
        vm.numberOfHits = content.nbHits;
        vm.processTime = content.processingTimeMS;
      }, function searchFailure(err) {
        console.log(err);
    });
  });
  index.search('', {facets: 'food_type'}, setFoodTypeHits);


  function setFoodTypeHits(err, content) {
    if (err) {
      console.error(err);
      return;
    }
    var facet = content.facets.food_type;
    vm.foodTypeCounts.American = facet["American"] + facet["Contemporary American"];
    vm.foodTypeCounts.Italian = facet["Italian"]; + facet["Contemporary Italian"];
    vm.foodTypeCounts.Californian = facet["Californian"];
    vm.foodTypeCounts.French = facet["French"] + facet["Contemporary French"] ;
    vm.foodTypeCounts.Seafood = facet["Seafood"];
    vm.foodTypeCounts.Japanese = facet["Japanese"];
    vm.foodTypeCounts.Indian = facet["Indian"] + facet["Contemporary Indian"];
    debugger
    console.log("FACET SEARCHHH", content);
  }

}// end of HOME CONTROLLER
