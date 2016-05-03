var poetry_prototype = angular.module('poetry.controllers', ['ionic', 'firebase']);

poetry_prototype.controller('fireCtrl', function($scope, $firebaseArray) {
  var poetry = new Firebase("https://poetry-prototype.firebaseio.com/poems/");
  $scope.literature = $firebaseArray(poetry);
  return $scope.literature
});

poetry_prototype.controller('coverCtrl', function($scope, $firebaseArray, $firebaseObject) {
  $scope.newPhoto = function() {
    var ref = new Firebase('https://poetry-prototype.firebaseio.com/images/');
    ref.once("value", function(snapshot) {
      var a = snapshot.numChildren();
      var i = 0;
      var rand = Math.floor(Math.random() * a);
      snapshot.forEach(function(snapshot) {
        if (i == rand) {
          $scope.simg = snapshot.val();
          if ($scope.simg.verified !== true) {
            console.log($scope.simg.verified);
            console.log('Image has not been verified.');
            $scope.newPhoto();
          } else if ($scope.simg.verified == true) {
            return $scope.simg
          }
        }
        i++;
      });
    });
  };
  $scope.newPhoto();
});

poetry_prototype.controller('PlaylistsCtrl', function($scope, playlistService, idService) {
  $scope.groups = [
                    {
                      "name": "Form Types",
                      "items": ["Haiku", "Prose", "Pantoum"],
                      "id": [1, 2, 3]
                    }
                  ]

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.getTitle = function(val, val2){
    playlistService.selectedPlaylist = val;
    idService.selectedPoem = val2;
  }
});

poetry_prototype.controller('PlaylistCtrl', function($scope, $stateParams, playlistService, idService) {
  $scope.playlistService = playlistService; 
  $scope.idService = idService; 
});

poetry_prototype.controller('randomCtrl', function($scope, $http, $ionicScrollDelegate, $timeout) {
  $scope.given = {
      "title" : "Untitled",
      "author" : "Malik Hemphill",
      "formType" : "Haiku",
      "lines" : {
        "line1" : "This is it.",
        "line2" : "Are you sure?",
        "line3" : "I am sure!"
      }
  };

  $scope.doRefresh = function() {
    console.log('Refreshing!');
    $timeout( function() {
      $scope.cP();
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }, 750);
  };

  $scope.cP = function(){
    $ionicScrollDelegate.scrollTop();
    var rn = Math.floor(Math.random() * $scope.literature.length);
    $scope.given.title = $scope.literature[rn].title;
    $scope.given.author = $scope.literature[rn].author;
    $scope.given.formType = $scope.literature[rn].formType;
    $scope.given.lines = $scope.literature[rn].lines;
    return $scope.given
  }
});

poetry_prototype.controller('ExCtrl', function($scope, $timeout, $q, $ionicPopup) {
  $scope.haikuAlert = function() {
    $ionicPopup.alert({
      title: 'Haiku Example',
      okText: 'close',
      okType: 'button-dark',
      content: '<b>Untitled</b><br>In the cicada\'s cry<br>No sign can foretell<br>How soon it must die.<br>by: <b>Matsuo Bashō</b>'
    })
  };

  $scope.proseAlert = function() {
    $ionicPopup.alert({
      title: 'Prose Example',
      okText: 'close',
      okType: 'button-dark',
      content: '<b>Exoskeletal Gesture</b><br>Venom erupted from the trees when the vital system of the brook reset its serum stem. Can suspended snakes compose a more careless music? Do two detached wings count as an exoskeletal gesture? A hiss is the sound the sky would make if these leaves revived their flight.<br>by: <b>Eric Baus</b>'
    });
  };

  $scope.pantoumAlert = function() {
    $ionicPopup.alert({
      title: 'Pantoum Example',
      okText: 'close',
      okType: 'button-dark',
      content: '<b>Satisfied</b><br>You took a wrong turn.<br>Now we are both dead.<br>The voices are getting louder.<br>Did you do this on purpose?<br><br>Now we are both dead.<br>Our bodies begin to decay.<br>Did you do this on purpose?<br>At least I was with you.<br><br>Our bodies begin to decay.<br>You took a wrong turn.<br>At least I was with you.<br>The voices are getting louder.<br>by: <b>Malik Hemphill</b>'
    });
  };
});

poetry_prototype.controller('PoemCtrl', function($scope, $ionicModal, $timeout, $http, $ionicLoading) {
  $scope.dropdown = 'Haiku';
  $scope.description = description;
  
  $scope.haikuData = {};
  $scope.proseData = {};
  $scope.pantoumData = {};
  $scope.poetryData = {};

  $scope.show = function() {
    $ionicLoading.show({
      template: '<div class="spinnerCenter"><ion-spinner icon="ripple" class="spinner-light"></ion-spinner></div>',
      noBackdrop: true
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };


  $ionicModal.fromTemplateUrl('templates/submit.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeSubmit = function() {
    $scope.modal.hide();
  };

  $scope.addPoem = function() {
    $scope.modal.show();
  };

  $scope.haikuSubmit = function() {
    $scope.show();
    if (!$scope.haikuData.title && !$scope.haikuData.author) {
      $scope.haikuData.title = 'Untitled';
      $scope.haikuData.author = 'Anonymous';
    } else if (!$scope.haikuData.title && $scope.haikuData.author) {      
      $scope.haikuData.title = 'Untitled';
    } else if ($scope.haikuData.title && !$scope.haikuData.author) {
      $scope.haikuData.author = 'Anonymous';
    }

    var oui = new Firebase("https://poetry-prototype.firebaseio.com/poems/");
    $scope.poetryData.title = $scope.haikuData.title;
    $scope.poetryData.author = $scope.haikuData.author;
    $scope.poetryData.formType = "Haiku";
    $scope.poetryData.lines = {
      "line1" : $scope.haikuData.line1,
      "line2" : $scope.haikuData.line2,
      "line3" : $scope.haikuData.line3
    };
    oui.push($scope.poetryData);

    $scope.doSubmit();
  }

  $scope.proseSubmit = function() {
    $scope.show();
    if (!$scope.proseData.title && !$scope.proseData.author) {
      $scope.proseData.title = 'Untitled';
      $scope.proseData.author = 'Anonymous';
    } else if (!$scope.proseData.title && $scope.proseData.author) {      
      $scope.proseData.title = 'Untitled';
    } else if ($scope.proseData.title && !$scope.proseData.author) {
      $scope.proseData.author = 'Anonymous';
    }
    var oui = new Firebase("https://poetry-prototype.firebaseio.com/poems/");
    $scope.poetryData.title = $scope.proseData.title;
    $scope.poetryData.author = $scope.proseData.author;
    $scope.poetryData.formType = "Prose";
    $scope.poetryData.lines = {
      "line1" : $scope.proseData.bodyCopy
    };
    oui.push($scope.poetryData);

    $scope.doSubmit();
  }

  $scope.pantoumSubmit = function() {
    $scope.show();
    if (!$scope.pantoumData.title && !$scope.pantoumData.author) {
      $scope.pantoumData.title = 'Untitled';
      $scope.pantoumData.author = 'Anonymous';
    } else if (!$scope.pantoumData.title && $scope.pantoumData.author) {      
      $scope.pantoumData.title = 'Untitled';
    } else if ($scope.pantoumData.title && !$scope.pantoumData.author) {
      $scope.pantoumData.author = 'Anonymous';
    }

    $scope.pantoumData.pantoum5 = $scope.pantoumData.pantoum2; //from line 2
    $scope.pantoumData.pantoum7 = $scope.pantoumData.pantoum4; //from line 4
    $scope.pantoumData.pantoum9 = $scope.pantoumData.pantoum6; //from line 6
    $scope.pantoumData.pantoum10 = $scope.pantoumData.pantoum3; //from line 1
    $scope.pantoumData.pantoum11 = $scope.pantoumData.pantoum8; //from line 8
    $scope.pantoumData.pantoum12 = $scope.pantoumData.pantoum1; //from line 2

    var oui = new Firebase("https://poetry-prototype.firebaseio.com/poems/");
    $scope.poetryData.title = $scope.pantoumData.title;
    $scope.poetryData.author = $scope.pantoumData.author;
    $scope.poetryData.formType = "Pantoum";
    $scope.poetryData.lines = {};
    $scope.poetryData.lines = {
      "line1" : $scope.pantoumData.pantoum1,
      "line2" : $scope.pantoumData.pantoum2,
      "line3" : $scope.pantoumData.pantoum3,
      "line4" : $scope.pantoumData.pantoum4,
      "line5" : $scope.pantoumData.pantoum5,
      "line6" : $scope.pantoumData.pantoum6,
      "line7" : $scope.pantoumData.pantoum7,
      "line8" : $scope.pantoumData.pantoum8,
      "line9" : $scope.pantoumData.pantoum9,
      "lines10" : $scope.pantoumData.pantoum10,
      "lines11" : $scope.pantoumData.pantoum11,
      "lines12" : $scope.pantoumData.pantoum12
    };
    oui.push($scope.poetryData);

    $scope.doSubmit();
  }

  $scope.doSubmit = function() {
    $timeout(function() {
      console.log($scope.poetryData);
      $scope.haikuData = {};
      $scope.proseData = {};
      $scope.pantoumData = {};
      $ionicLoading.hide();
      $scope.closeSubmit();
    }, 1000);
  };
});

var description = [
  {
    Haiku: 'Haikus are a traditional form of Japanese poetry. Haiku poems consist of 3 lines. The first and last lines of a Haiku have 5 syllables and the middle line has 7 syllables.',
    Pantoum: 'A Pantoum is a type of poem with a verse form consisting of three stanzas. It has a set pattern within the poem of repetitive lines.',
    Prose: 'Prose poetry is poetry written in prose instead of using verse but preserving poetic qualities such as heightened imagery, parataxis and emotional effects.'
  } 
]
