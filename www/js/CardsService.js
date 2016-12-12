app.service('CardsService', ['$http', function($http){
  var self = this;

  self.getCards = function(){
    return $http.get("http://star-notes.herokuapp.com/")
  };

  self.createCard = function(card){
    return $http.post("http://star-notes.herokuapp.com/cards.json", card)
  };

  self.destroyCard = function(id){
    $http.delete("http://star-notes.herokuapp.com/" + id).success(function(data){
      console.log(data)
    });
  };

}]);
