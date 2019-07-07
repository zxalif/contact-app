app.controller('homeController', function($scope, $http){
    /* initialize form variable */
    $scope.form = {};

    /* GET ALL CONTACT LIST */
    $http({
        url: '/api/v1/contacts/',
        headers: {'Content-type': 'application/json'},
        method: 'GET'
    }).success(function(data, status, headers, config){
        $scope.contacts =  data;
    }).error(function(data, status, headers, config){
        $scope.contacts = new Array();
    });

    /* select a contact */
    $scope.selected = function(contact){
        let select = $scope.contacts.filter(c => c.contact_id == contact.contact_id)[0];
        $scope.form.contact_id = select.contact_id;
        $scope.form.contact_name = select.contact_name;
    };

    $scope.submit = function(){
        console.log($.param($scope.form));
        $http({
            url: 'api/v1/contacts/',
            method: 'POST',
            params: $('#contact-data').serialize()
        }).success(function(data, status, headers, config){
            console.log(status);
        }).error(function(data, status, headers, config){
            console.log(status, data);
        });}

});
