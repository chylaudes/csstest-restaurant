angular.module('algolia')
  .controller('HomeController', HomeController);

HomeController.$inject=['$scope', 'algolia'];
function HomeController( $scope,   algolia ) {
  var client = algolia.Client( "J31118LB7W", "805c64911a7abd9b7a02ac3fe9f28d00");
  var index = client.initIndex('restaurants');
  var vm = this;
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
  $scope.foodType = "";
  $scope.$watch('search.query', function() {
    if ($scope.search.query === "") {
      if (!$scope.foodType) index.search($scope.search.query, {facets: 'food_type'}, setFoodTypeHits);
    } else {
      if (vm.foodyType) {
        index.search($scope.search.query,
          {
            facets: '*',
            filters: "food_type:" + $scope.foodType
          }, showFoodTypeResults);
      } else {
        index.search($scope.search.query, {facets: 'food_type'}, setFoodTypeHits);
      }
    }
  });

  function setFoodTypeHits(err, content) {
    if (err) {
      console.error(err);
      return;
    }
    var facet = content.facets.food_type;
    vm.foodTypeCounts.American = facet["American"];
    vm.foodTypeCounts.Italian = facet["Italian"];
    vm.foodTypeCounts.Californian = facet["Californian"];
    vm.foodTypeCounts.French = facet["French"];
    vm.foodTypeCounts.Seafood = facet["Seafood"];
    vm.foodTypeCounts.Japanese = facet["Japanese"];
    vm.foodTypeCounts.Indian = facet["Indian"];
    $scope.search.hits = content.hits;
    vm.numberOfHits = content.nbHits;
    vm.processTime = content.processingTimeMS;
    console.log("CONTENT", content);
  }
  vm.filterByFoodType = function(foodType) {
    $scope.foodType = foodType;
    index.search($scope.search.query,
      {
        facets: '*',
        filters: "food_type:" + $scope.foodType
      }, showFoodTypeResults);

  };



  function showFoodTypeResults(err, content){
    if (err) {
      console.error(err);
      return;
    }
    console.log("WORKED OBJECT", content);
    $scope.search.hits = content.hits;
    vm.numberOfHits = content.nbHits;
    vm.processTime = content.processingTimeMS;
  }

//clear search function too.

}// end of HOME CONTROLLER
