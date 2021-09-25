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
    $scope.genres = [
        "Action and adventure",
        "Autobiography",
        "Biography",
        "Business/economics",
        "Children's",
        "Crime",
        "Encyclopedia",
        "Drama",
        "Fairytale",
        "Fantasy",
        "History",
        "Humor",
        "Horror",
        "Mystery",
        "Memoir",
        "Philosophy",
        "Poetry",
        "Romance",
        "Satire",
        "True crime",
        "Science fiction",
        "Short story",
        "Science",
        "Thriller",
        "Western",
        "Travel",
        "Young adult",
        "genre1",
        "genre2",
    ];

    $scope.getBooks = () => {
        var url = "getAllBooks";
        if ($scope.genre || $scope.title) {
            url += "/?";
            $scope.genre ? (url += `genre=${$scope.genre}`) : 0;
            $scope.title ? (url += `title=${$scope.title}`) : 0;

            $scope.genre = $scope.title = "";
        }
        $http
            .get(url)
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

    $scope.getBooks();

    $scope.filter = (genre) => {
        $scope.genre = genre;
        $scope.getBooks();
    };
});
