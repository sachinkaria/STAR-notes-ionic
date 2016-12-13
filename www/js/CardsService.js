app.service('CardsService', ['$http', function($http){
  var self = this;
  self.card = [];

  self.getCards = function(){
    return $http.get("http://star-notes.herokuapp.com/")
  };

  self.getCard = function(id){
    return $http.get("http://star-notes.herokuapp.com/cards/" + id)
  };

  self.createCard = function(card){
    return $http.post("http://star-notes.herokuapp.com/cards.json", card)
  };

  self.destroyCard = function(id){
    return $http.delete("http://star-notes.herokuapp.com/cards/" + id)
  };

}]);
