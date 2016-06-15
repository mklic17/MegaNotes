(function() {
  angular.module('meganote.notes', ['ui.router'])
    .config(notesConfig)
    .controller('NotesController', NotesController); //Passes the second NotesController function as an object

  notesConfig.$inject= ['$stateProvider'];//contains all of the dependencies as strings
  function notesConfig($stateProvider) { //now $stateProvider does not have to be called that if you do not want it to be
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
  }

  NotesController.$inject = ['$state', '$scope', 'NotesService'];
  function NotesController($state, $scope, NotesService) {
    $state.go('notes.form');

    NotesService.getNotes() //not global so we need to inject it
        .then(function() {
          $scope.notes = NotesService.notes; //The actual notes on the sidebar
        });

    $scope.clearForm = function(){
      $scope.note = { title: '', body_html: '' };
    };

    $scope.addNote = function(){
      NotesService.create($scope.note);
      $scope.clearForm(); //What is in the form
    };

    $scope.removeNote = function(index){
      $scope.notes.splice(index, 1);
    };

    $scope.editNote = function(note){
      $scope.note = angular.copy(note);
    };

    $scope.clearForm(); //Empty object, the form's title and body
  }

}());
