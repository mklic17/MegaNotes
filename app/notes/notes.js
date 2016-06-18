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
        controller: 'NotesController',
        resolve: {
          notesLoaded: notesLoaded
        }
      })

      .state('notes.form', {
        url: '/:noteId',
        templateUrl: 'notes/notes-form.html',
        controller: 'NotesFormController'
      });
  }
  notesLoaded.$inject=['NotesService'];
  function notesLoaded(NotesService){
    return NotesService.getNotes();
  }

  NotesController.$inject = ['$scope', 'NotesService'];
  function NotesController($scope,  NotesService) {
    $scope.notes = NotesService.notes;

  }

}());
