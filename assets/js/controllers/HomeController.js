var client = algoliasearch( "J31118LB7W", "805c64911a7abd9b7a02ac3fe9f28d00");
var index = 'restaurants';

angular.module('algolia')
  .controller('HomeController', HomeController);
HomeController.$inject=['$scope', 'algolia'];
function HomeController( $scope,   algolia ) {
  var vm = this;
  var helper = algoliasearchHelper(client, index, {
  facets: ['food_type'],
  disjunctiveFacets: ['stars_count'],
  hitsPerPage: 20
  });
  //scope search object for the DOM
  $scope.search = {
                    hits: [],
                    numberOfHits: 0,
                    processTime : 0,
                  };
  // Special FoodTypes
  $scope.foodTypeCounts = {
    "Italian" : 0,
    "American" : 0,
    "Californian" : 0,
    "French" : 0,
    "Seafood" : 0,
    "Japanese" : 0,
    "Indian" : 0
  };
  $scope.facetVal = [];
  $scope.query = '';
  //event query search on result
  $scope.searchQuery = function () {
    helper.setQuery($scope.query).search();
  };


  //first search on the dom load
  var initialSearch = function () {
    helper.search();
    helper.on('result', function(content) {
      console.log("INIT", content);
      if (content.facets[0]) {
        var foodFacet = content.facets[0].data;
        $scope.$apply(function(){
          $scope.foodTypeCounts.American = foodFacet["American"];
          $scope.foodTypeCounts.Italian = foodFacet["Italian"];
          $scope.foodTypeCounts.Californian = foodFacet["Californian"];
          $scope.foodTypeCounts.French = foodFacet["French"];
          $scope.foodTypeCounts.Seafood = foodFacet["Seafood"];
          $scope.foodTypeCounts.Japanese = foodFacet["Japanese"];
          $scope.foodTypeCounts.Indian = foodFacet["Indian"];
        });
      }
      $scope.$apply(function() {
        $scope.search.hits = content.hits;
        $scope.search.numberOfHits = content.nbHits;
        $scope.search.processTime = content.processingTimeMS;
    });
  })
}
  initialSearch();

  $scope.toggleFacet = function (name) {
      helper.toggleRefinement('food_type', name).search();
      helper.on('result', function (content) {
        console.log("TOOGGLEEE", content);
        $scope.$apply($scope.facetVal = content.getFacetValues('food_type'));
      });
  };
var starRange = {
  0 : [1.0],
  1 : [1.0, 1.1, 1.2, 1.3, 1.4],
  2 : [1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4],
  3 : [2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4],
  4 : [3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4],
  5 : [4.5, 4.6, 4.7, 4.8, 4.9, 5.0]
}
$scope.toggleStars = function (star) {
  console.log(star);

  helper.addNumericRefinement('stars_count', '=', '3.0').search();

  helper.on('result', function (content) {
    $scope.$apply($scope.search.hits = content.hits);

    console.log("STARRRR", content);
    debugger;
  });
}

//clear search function too.

}// end of HOME CONTROLLER
