(function() {
  angular.module('meganote.notes')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', '$scope', 'Flash', 'NotesService'];
  function NotesFormController($state, $scope, Flash, NotesService) {
    $scope.note = NotesService.find($state.params.noteId);

    $scope.clearForm = function(){
      $scope.note = { title: '', body_html: '' };
    };

    $scope.addNote = function(){
      if ($scope.note._id) {
        NotesService.update($scope.note)
        .then(function(res){
          $scope.note = res.data.note;
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

    // $scope.editNote = function(note){
    //   $scope.note = angular.copy(note);
    // };

    $scope.delete = function() {
      NotesService.delete($scope.note)
        .then(function() {
          $scope.clearForm();
        });
    };

    // $scope.clearForm(); //Empty object, the form's title and body
  }
}());
