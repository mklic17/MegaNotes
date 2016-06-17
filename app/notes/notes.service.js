(function() {
  angular.module('meganote.notes')
    .service('NotesService', NotesService);

  NotesService.$inject = ['$http'];
  var url = 'http://localhost:3030/';
  function NotesService($http) {
    var service = this;
    service.notes = [];

    service.getNotes = function() {
      var notesPromise = $http.get(url);

      notesPromise.then(function(res) {
        service.notes = res.data;
      });

      return notesPromise;
    };

    service.create = function(note) {
      var notesPromise = $http.post(url, {
        note: note
        // Service doesn't know about the note, only the controller does
      });

      notesPromise.then(function(res) {
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    };


    service.update = function(note) {
      var notesPromise = $http.put(url + note._id, {
        note: note
      });

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    };


    service.delete = function(note) {
      var notesPromise = $http.delete(url + '/' + note._id);

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
      });

      return notesPromise;
    };

    service.removeById = function(id) {
      for (var i=0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return service.notes.splice(i, 1);
        }
      }
    };
  }
}());
