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

  NotesController.$inject = ['$state', '$scope', 'Flash', 'NotesService'];
  function NotesController($state, $scope, Flash, NotesService) {
    $state.go('notes.form');

    NotesService.getNotes() //not global so we need to inject it
        .then(function() {
          $scope.notes = NotesService.notes; //The actual notes on the sidebar
        });

    $scope.clearForm = function(){
      $scope.note = { title: '', body_html: '' };
    };

    $scope.addNote = function(){
      if ($scope.note._id) {
        NotesService.update($scope.note)
        .then(function(res){
          $scope.note=res.data.note;
          Flash.create('success', res.data.message);
        });
      }
      else {
        NotesService.create($scope.note)
        .then(
          function(res){
            $scope.note = res.data.note;
            Flash.create('success', res.data.message);
          },
          function() {
            Flash.create('danger', 'Oops! Something went wrong.');
          });
      }
    };

    $scope.editNote = function(note){
      $scope.note = angular.copy(note);
    };

    $scope.delete = function() {
      NotesService.delete($scope.note)
        .then(function() {
          $scope.clearForm();
        });
    };

    $scope.clearForm(); //Empty object, the form's title and body
  }

}());
