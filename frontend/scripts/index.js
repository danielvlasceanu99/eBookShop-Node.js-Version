var app = angular.module("eBookShop", ["ngRoute"]);
app.config(($routeProvider) => {
    $routeProvider
        .when("/", {
            templateUrl: "home.html",
        })
        .when("/bestsellers", {
            templateUrl: "bestsellers.html",
        });
});

app.controller("bestsellersController", function ($scope, $location) {
    $scope.merge = "merge";

    $scope.id = $location.search().id;

    console.log($scope.id);
});
