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
  $scope.starsRatings = {
    "1.0" : 0,
    "2.0" : 0,
    "3.0" : 0,
    "4.0" : 0,
    "4.9" : 0
  };

  $scope.facetVal = [];
  $scope.query = '';
  //event query search on result
  $scope.searchQuery = function () {
    helper.setQuery($scope.query).search();
  };
  var applyCounts = function(obj, hitObj) {
    for (var i in obj) {
      if (!hitObj[i]) {
        obj[i] = 0;
      } else {
        obj[i] = hitObj[i];
      }
    }
  };
  //first search on the dom load
  var initialSearch = function () {
    helper.search();
    helper.on('result', function(content) {
      if (content.facets[0]) {
        var foodFacet = content.facets[0].data;
        var starFacet = content.disjunctiveFacets[0].data;
        $scope.$apply(function(){
          applyCounts($scope.starsRatings, starFacet);
          applyCounts($scope.foodTypeCounts, foodFacet);
        });
      }

      $scope.$apply(function() {
        $scope.search.hits = content.hits;
        $scope.search.numberOfHits = content.nbHits;
        $scope.search.processTime = content.processingTimeMS;
      });
    });
  };

  initialSearch();

  //toggling between food_type facets
  $scope.toggleFacet = function (name) {
      helper.toggleRefinement('food_type', name).search();
      $scope.facetVal = helper.getRefinements('food_type');
      helper.on('result', function (content) {
        $scope.$apply(function() {
          $scope.lastPage = content.nbPages;
          $scope.currentPage = content.page;
          $scope.search.hits = content.hits;
        });
      });
  };


  $scope.toggleStars = function (star) {
    helper.toggleRefinement('stars_count', star);
    helper.search();
    $scope.facetVal = helper.getRefinements('food_type');

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
