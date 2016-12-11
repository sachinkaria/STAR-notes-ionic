starter.controller('MainCtrl', ['$scope','$auth','CardsService',function($scope, $auth, CardsService){
  this.signedUp = false;
  $scope.cards = [];
  $scope.current_user = $auth.user;
  $scope.registrationForm = {};

  $scope.handleRegBtnClick = function() {
    $auth.submitRegistration($scope.registrationForm)
    .then(function() {
      console.log('SUCCESS')
    })
    .catch(function(){
      console.log('FAILED')
    })
  };

  $scope.handleLoginBtnClick = function() {
    $auth.submitLogin($scope.registrationForm)
    .then(function(resp) {
      console.log('SUCCESS');
    })
    .catch(function(resp) {
      console.log('FAILED.');
    });
  };

  $scope.handleSignOutBtnClick = function() {
  $auth.signOut()
    .then(function(resp) {
      console.log('SUCCESS');
    })
    .catch(function(resp) {
      console.log('FAILED.');
    });
};

  $scope.signUp = function(){
    $scope.signedUp = true;
  };

  $scope.createCard = function(card){
    CardsService.createCard(card).then(function(){
      $scope.getCards();
    });
  }

  $scope.getCards = function(){
  return CardsService.getCards().then(function(response){
    $scope.cards = response.data;
    console.log($scope.cards);
  });
};

  $scope.getCards();
}]);
