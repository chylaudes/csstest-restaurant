var client = algoliasearch( "J31118LB7W", "805c64911a7abd9b7a02ac3fe9f28d00");
var index = 'restaurants';

angular.module('algolia')
  .controller('HomeController', HomeController);
HomeController.$inject=['$scope', 'algolia', 'lodash'];
function HomeController( $scope,   algolia,   _ ) {
  var vm = this;
  var helper = algoliasearchHelper(client, index, {
  facets: ['food_type'],
  disjunctiveFacets: ['stars_count'],
  hitsPerPage: 3
  });
  //recording the pages
 $scope.currentPage = 0;
 $scope.lastPage = 0;

  //scope search object for the DOM
  $scope.search = {
                    hits: [],
                    numberOfHits: 0,
                    processTime : 0,
                  };

  // Recording the hits of the FoodTypes
  $scope.foodTypeCounts = {
    "Italian" : 0,
    "American" : 0,
    "Californian" : 0,
    "French" : 0,
    "Seafood" : 0,
    "Japanese" : 0,
    "Indian" : 0
  };
  //Recording all the star ratings
  $scope.starsRatings = ["1.0", "2.0", "3.0", "4.0", "4.9"];

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
        $scope.search.hits = $scope.search.hits.concat(content.hits);
        $scope.search.numberOfHits = content.nbHits;
        $scope.search.processTime = content.processingTimeMS;
      });
    });
  };

  initialSearch();

  //toggling between food_type facets
  $scope.toggleFacet = function (name) {
      helper.toggleRefinement('food_type', name).search();
      helper.on('result', function (content) {
        $scope.$apply(function() {
          $scope.lastPage = content.nbPages;
          $scope.currentPage = content.page;
          $scope.search.hits = content.hits;
          $scope.facetVal = content.getFacetValues('food_type');
        });
      });
  };


  $scope.toggleStars = function (star) {
    helper.toggleRefinement('stars_count', star);
    helper.search();
    helper.on('result', function (content) {
      $scope.$apply(function () {
        $scope.refinements = content.getRefinements('stars_count');
        $scope.search.hits = content.hits;
        $scope.lastPage = content.nbPages;
        $scope.currentPage = content.page;
      });
    });
  };

  $scope.refinements = [];
  vm.checkRefinements = function(star){
    if (_.find($scope.refinements, { name: star} )) {
      return _.find($scope.refinements, { name: star} );
    }
    else {
      return false;
    }
  };

  //clear search function too.
  vm.clearSearch = function() {
    helper.clearRefinements();
    helper.search();
  };

  //show more on the list
  vm.toggleList = function(){
    helper.nextPage().search();
  };

}// end of HOME CONTROLLER
