angular.module('algolia')
.directive('resultCard', resultCard);

function resultCard(){
  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:  "templates/resultCard.html",
    controller: resultCardController,
    controllerAs: 'resultCardCtrl',
    scope: {
      hit: '='
    }
  };
  return directive;
}

function resultCardController($scope){

}
