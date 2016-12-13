
'use strict';

var ctrl = angular.module('controllers', []);

ctrl.controller('MainCtrl', ['$scope','$auth','$state','$ionicHistory','$stateParams','CardsService',function($scope, $auth, $state, $ionicHistory, $stateParams, CardsService){
  this.signedUp = false;
  $scope.cards = [];
  $scope.current_user = $auth.user;
  $scope.registrationForm = {};
  $scope.selectedCard = [];

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
        $scope.getCards();
        $state.go('tab.home');
      });
    }

  $scope.getCard = function(id){
    return CardsService.getCard(id).then(function(response){
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

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }

  $scope.getCards();
  $scope.getCard($stateParams.id);

}]);
