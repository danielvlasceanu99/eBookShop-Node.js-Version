var app = angular.module("eBookShop", ["ngRoute"]);
app.config(($routeProvider) => {
    $routeProvider
        .when("/", {
            templateUrl: "./pages/home.html",
        })
        .when("/bestsellers", {
            templateUrl: "./pages/bestsellers.html",
        });
});

app.controller("bestsellersController", function ($scope, $location) {
    $scope.merge = "merge";

    $scope.id = $location.search().id;

    console.log($scope.id);
});

app.controller("homeController", ($scope, $http) => {
    const initialGet = () => {
        $http
            .get("getAllBooks")
            .then((response) => {
                $scope.bookList = response.data;
            })
            .catch((error) => {
                if (error.data) {
                    const errors = error.data;
                    Object.keys(errors).forEach((key) => {
                        toastr.error(errors[key]);
                    });
                }
            });
    };

    initialGet();
});
