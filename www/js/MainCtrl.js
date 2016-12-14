
'use strict';

var ctrl = angular.module('controllers', []);

ctrl.controller('MainCtrl', ['$scope','$auth','$state','$ionicHistory','$stateParams','CardsService',function($scope, $auth, $state, $ionicHistory, $stateParams, CardsService){
  this.signedUp = false;
  $scope.cards = [];
  $scope.card = {};
  $scope.current_user = $auth.user;
  $scope.registrationForm = {};
  $scope.selectedCard = [];
  $scope.editable = false;

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
      $state.go('tab.home');
      $scope.card = {};
    });
  }

  $scope.getCard = function(id){
    CardsService.getCard(id).then(function(response){
      $scope.selectedCard = response.data;
    });
  }

  $scope.getCards = function(){
    return CardsService.getCards().then(function(response){
      $scope.cards = response.data;
    });
  }

  $scope.destroyCard = function(id){
    CardsService.destroyCard(id).then(function(){
      $scope.getCards();
    });
  }

  $scope.updateCard = function(selectedCard){
    CardsService.updateCard($stateParams.id, selectedCard).then(function(){
      $scope.editCard();
    })
  }

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }

  $scope.editCard = function(){
    if ($scope.editable === false) {$scope.editable = true}
    else {$scope.editable = false};
  }

  $scope.$on('$stateChangeSuccess',
    function onStateSuccess(event, toState, toParams, fromState) {
      if (toState.name === 'tab.home'){$scope.getCards()};
    }
  );

  $scope.goHome = function(){
    $state.go('tab.home', {}, {absolute: true, inherit: false})
  };

  $scope.getCards();
  $scope.getCard($stateParams.id);

}]);
