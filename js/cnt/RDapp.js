var apiUrl2 = 'https://cdn.rawgit.com/ArabeJS/29fd711814f7574af0dc4f5f6becb3a6/raw/c45d6718cbff9039467acdbb0a584b4db647f23e/data.json';
var apiUrl = 'js/data.json';
function endLoad() {$('body #spinner2').hide();};

RD.config(function($routeProvider) {
  var home = {
   templateUrl: 'theme/home.html',
   controller: 'home'
 }

 var cat = {
  templateUrl: 'theme/cat.html',
  controller: 'cat'
}

var course = {
 templateUrl: 'theme/course.html',
 controller: 'course'
}

var viewer = {
 templateUrl: 'theme/viewer.html',
 controller: 'viewer'
}

 $routeProvider
 .when('/', home)
 .when('/cat/:id', cat)
 .when('/course/:id', course)
 .when('/viewer/:id', viewer);
});

RD.controller('RDapp', function ($scope, $location) {
  $scope.go = function (v) {
    $location.path( v );
  }
  $scope.b64 = Base64;
});

RD.controller('home', function ($scope, Data) {
  $scope.color = {
    blue: {backgroundColor: 'default-primary-700'}
  }

  Data.query(function(data) {
    $scope.cats = data[0].cats;
  });
});

RD.controller('cat', function ($scope, Data, $routeParams) {
  var id = $routeParams.id;
  localStorage.setItem("RDcatid", id);
  Data.query(function(data) {
    $scope.cats = data[0].cats[id].course;
  });
});

RD.controller('course', function ($scope, Data, $routeParams) {
  var id = $routeParams.id;
  var catID = localStorage.getItem("RDcatid");
  Data.query(function(data) {
    $scope.tpcs = data[1].topics[catID].topics['t'+id];
  });
});

RD.controller('viewer', function ($scope, $routeParams) {
  var id = Base64.decode($routeParams.id);
  $scope.vUrl = 'https://docs.google.com/gview?embedded=true&url='+id;
});

/* factory */
RD.factory("Data", function($resource) {
  return $resource(apiUrl);
});
