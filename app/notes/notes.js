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

    NotesController.$inject = ['$state', '$scope'];
    function NotesController($state,$scope) {
      $state.go('notes.form')

      $scope.notes = []; //The actual notes on the sidebar
      $scope.note = {title: '', body: ''}; //Empty object, the form's title and body

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
    }

}());
