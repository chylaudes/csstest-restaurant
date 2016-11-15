angular.module('algolia')
.directive('starRatings', starRatings);
function starRatings(){
  var directive = {
    restrict: 'E',
    require: "resultCard",
    templateUrl:  "templates/starRatings.html",
    controller: starRatingsController,
    controllerAs: 'starRatingsCtrl',
    scope: {
      stars: '=stars',
    }
  };
  return directive;
}

function starRatingsController($scope){
  var vm  = this;
  var Rstars = Math.round($scope.stars);
  $scope.ratings = {
    current: Rstars,
    empty: 5 - Rstars
  };
  $scope.range = function(count){
    var ratings = [];
    for (var i = 1; i <= count; i++) {
      ratings.push(i);
    }
    return ratings;
  };
}
