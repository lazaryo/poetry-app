var app = angular.module('poetry.services', ['firebase'])

app.service('playlistService', function() {
  this.selectedPlaylist;
});

app.service('idService', function() {
  this.selectedPoem;
});