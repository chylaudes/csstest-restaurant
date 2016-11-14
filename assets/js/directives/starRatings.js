angular.module('algolia')
.directive('starRatings', starRatings);

function starRatings(){
  var directive = {
    restrict: 'E',
    require: "resultCard",
    replace: true,
    templateUrl:  "templates/starRatings.html",
    controller: starRatingsController,
    controllerAs: 'starRatingsCtrl',
    scope: {
      stars: '=stars'
    }
  };
  return directive;
}

function starRatingsController($scope){
  var vm  = this;
  $scope.ratings = {
    current: Math.round($scope.stars),
    max: 5
  }
  console.log("Stars");
  console.log("STARRRS", $scope.stars);
  console.log("Ratings", vm.ratings);

}
