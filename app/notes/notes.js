angular.module('meganote.notes', [
  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider

  .state('notes', {
      url: '/notes',
      templateUrl: 'notes/notes.html',
      controller: 'NotesController'
    })

  .state('notes.form', {
    url: '/:noteId',
    templateUrl: 'notes/notes-form.html'
  });
})

.controller('NotesController', function($scope) {

  $scope.notes = [];

  $scope.note = {};

  $scope.addNote = function(){
    $scope.notes.push($scope.note);
    $scope.note = {};
  }
  $scope.removeNote = function(index){
    $scope.notes.splice(index, 1);
  }
  $scope.editNote = function(note){
    $scope.note = note;
  }

});
