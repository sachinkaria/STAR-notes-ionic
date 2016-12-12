app.controller('MainCtrl', ['$scope','$auth','$state','CardsService',function($scope, $auth, $state, CardsService){
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
    return CardsService.createCard(card).then(function(){
      return $scope.getCards().then(function(){
        $state.go('tab.home');
      });
    });
  }

  $scope.getCards = function(){
  return CardsService.getCards().then(function(response){
    $scope.cards = response.data;
  });
};

$scope.destroyCard = function(id){
  CardsService.destroyCard(id).then(function(){
    $scope.getCards();
  });
}

  $scope.getCards();
}]);
