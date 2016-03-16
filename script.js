var i;
var I = 1,
  K = 2;

angular.module('MyApp', [])
  .controller('MainController', ['$scope', '$http', function($scope, $http) {
    $http.get('base.json')
      .then(function(response) {

        $scope.baseList = response.data;

        $scope.actualPeopleArrInit();
        $scope.updatePerson();
      });

    $scope.actualPeopleArrInit = function() {
      $scope.actualPeopleArray = [];

      for (i = K - 2; i < K + 4; i++) {
        var actualPeopleArrayNew = {
          firstName: $scope.baseList[i]['first_name'],
          lastName: $scope.baseList[i]['last_name'],
          age: $scope.baseList[i]['age'],
          location: $scope.baseList[i]['location'],
          id: $scope.baseList[i]['id']
        };
        $scope.actualPeopleArray.push(actualPeopleArrayNew);
      }
    };

    $scope.updatePerson = function() {
      $scope.selectedPerson = [];

      var selectedPersonNew = {
        firstName: $scope.actualPeopleArray[I]['firstName'],
        lastName: $scope.actualPeopleArray[I]['lastName'],
        age: $scope.actualPeopleArray[I]['age'],
        location: $scope.actualPeopleArray[I]['location'],
        id: $scope.actualPeopleArray[I]['id']
      };
      $scope.selectedPerson.push(selectedPersonNew);
    };
    
    $scope.drawBorder = function(index) {
      var myBorder = (index == I) ? 'selectedCell' : null;
        return myBorder;
    };

    $scope.selectPerson = function() {
      if (I >= $scope.actualPeopleArray.length - 1) {
        I = 5;
        $scope.updatePersonGhost();
        if ($scope.selectedPersonGhost[0]['id'] == $scope.baseList.length) {
          $scope.updatePerson();
        } else {
          if ($scope.selectedPersonGhost[0]['id'] + 4 > $scope.baseList.length) {
            $scope.actualPeopleArrShiftForwardShortage();
          } else {
            $scope.actualPeopleArrShiftForward();
          }
        }
      } else if (I <= 0) {
        I = 0;
        $scope.updatePersonGhost();
        if ($scope.selectedPersonGhost[0]['id'] == 1) {
          $scope.updatePerson();
        } else {
          if ($scope.selectedPersonGhost[0]['id'] - 4 < 1) {
            $scope.actualPeopleArrShiftBackwardShortage();
          } else {
            $scope.actualPeopleArrShiftBackward();
          }
        }
      } else {
        $scope.updatePerson();
      }
    };

    $scope.peopleMoveForward = function() {
      if (I >= $scope.actualPeopleArray.length - 1) {
        if (I > $scope.actualPeopleArray.length - 1) {
          I = 5;
        } else {
          $scope.updatePersonGhost();
          if ($scope.selectedPersonGhost[0]['id'] == $scope.baseList.length) {
            $scope.updatePerson();
          } else {
            if ($scope.selectedPersonGhost[0]['id'] + 4 > $scope.baseList.length) {
              $scope.actualPeopleArrShiftForwardShortage();
            } else {
              $scope.actualPeopleArrShiftForward();
            }
          }
        }
      } else {
        $scope.updatePerson();
      }
    };

    $scope.peopleMoveBackward = function() {
      if (I <= 0) {
        if (I < 0) {
          I = 0;
        } else {
          $scope.updatePersonGhost();
          if ($scope.selectedPersonGhost[0]['id'] == 1) {
            $scope.updatePerson();
          } else {
            if ($scope.selectedPersonGhost[0]['id'] - 4 < 1) {
              $scope.actualPeopleArrShiftBackwardShortage();
            } else {
              $scope.actualPeopleArrShiftBackward();
            }
          }
        }
      } else {
        $scope.updatePerson();
      }
    };

    $scope.updatePersonGhost = function() {
      $scope.selectedPersonGhost = [];

      var selectedPersonGhostNew = {
        firstName: $scope.actualPeopleArray[I]['firstName'],
        lastName: $scope.actualPeopleArray[I]['lastName'],
        age: $scope.actualPeopleArray[I]['age'],
        location: $scope.actualPeopleArray[I]['location'],
        id: $scope.actualPeopleArray[I]['id']
      };
      $scope.selectedPersonGhost.push(selectedPersonGhostNew);
    };

    $scope.actualPeopleArrShiftForward = function() {
      $scope.actualPeopleArray = [];
      K = $scope.selectedPersonGhost[0]['id'];

      I = 1;

      for (i = K - 2; i < K + 4; i++) {
        var actualPeopleArrayNew = {
          firstName: $scope.baseList[i]['first_name'],
          lastName: $scope.baseList[i]['last_name'],
          age: $scope.baseList[i]['age'],
          location: $scope.baseList[i]['location'],
          id: $scope.baseList[i]['id']
        };
        $scope.actualPeopleArray.push(actualPeopleArrayNew);
      }
      $scope.updatePerson();
    };

    $scope.actualPeopleArrShiftBackward = function() {
      $scope.actualPeopleArray = [];
      K = $scope.selectedPersonGhost[0]['id'];

      I = 4;

      for (i = K - 5; i < K + 1; i++) {
        var actualPeopleArrayNew = {
          firstName: $scope.baseList[i]['first_name'],
          lastName: $scope.baseList[i]['last_name'],
          age: $scope.baseList[i]['age'],
          location: $scope.baseList[i]['location'],
          id: $scope.baseList[i]['id']
        };
        $scope.actualPeopleArray.push(actualPeopleArrayNew);
      }
      $scope.updatePerson();
    };

    $scope.actualPeopleArrShiftForwardShortage = function() {
      $scope.actualPeopleArray = [];
      I = 5 - ($scope.baseList.length - $scope.selectedPersonGhost[0]['id']);

      for (i = $scope.baseList.length - 6; i < $scope.baseList.length; i++) {
        var actualPeopleArrayNew = {
          firstName: $scope.baseList[i]['first_name'],
          lastName: $scope.baseList[i]['last_name'],
          age: $scope.baseList[i]['age'],
          location: $scope.baseList[i]['location'],
          id: $scope.baseList[i]['id']
        };
        $scope.actualPeopleArray.push(actualPeopleArrayNew);
      }
      $scope.updatePerson();
    };

    $scope.actualPeopleArrShiftBackwardShortage = function() {
      $scope.actualPeopleArray = [];
      I = $scope.selectedPersonGhost[0]['id'] - 1;

      for (i = 0; i < 6; i++) {
        var actualPeopleArrayNew = {
          firstName: $scope.baseList[i]['first_name'],
          lastName: $scope.baseList[i]['last_name'],
          age: $scope.baseList[i]['age'],
          location: $scope.baseList[i]['location'],
          id: $scope.baseList[i]['id']
        };
        $scope.actualPeopleArray.push(actualPeopleArrayNew);
      }
      $scope.updatePerson();
    };
    
  }]);