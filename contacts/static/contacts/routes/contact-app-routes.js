app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/static/contacts/views/home.html',
            controller: 'homeController'
        })
        .state('home.about', {
            url: '/about',
            templateUrl: '/static/contacts/views/about.html',
            controller: 'aboutController'
        });
});
