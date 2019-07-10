app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/static/contacts/views/home.html',
            controller: 'homeController'
        })
        .state('json', {
            url: '/json',
            templateUrl: '/static/contacts/views/json.html',
            controller: 'jsonController'
        });
});
