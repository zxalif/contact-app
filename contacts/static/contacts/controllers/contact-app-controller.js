app.controller('homeController', function($scope, $http, dataManager){
    /* initialize form variable */
    $scope.form = {};
    $scope.dataManager = dataManager;
    $scope.root_url = '/api/v1/contacts/';

    /* Button Visibility Setup */
    $scope.createButton = true;
    $scope.updateButton = false;
    $scope.cancelButton = false;

    /* GET ALL CONTACT LIST */
    $http({
        url: $scope.root_url,
        headers: {'Content-type': 'application/json'},
        method: 'GET'
    }).success(function(data, status, headers, config){
        $scope.dataManager.contacts =  data;
    }).error(function(data, status, headers, config){
        $scope.dataManager.contacts = new Array();
    });

    /* select a contact */
    $scope.selected = function(contact){
        let select = $scope.dataManager.contacts.filter(c => c.id == contact.id)[0];

        $scope.createButton = false;
        $scope.updateButton = true;
        $scope.cancelButton = true;

        $scope.message = null;

        $scope.form.id = select.id;
        $scope.form.contact_name = select.contact_name;
        $scope.form.contact_phone = select.contact_phone;
        $scope.form.contact_email = select.contact_email;
        $scope.form.contact_address = select.contact_address;
    };

    /* Function for create new information on submit */
    $scope.submit = function(){
        $http({
            url: $scope.root_url,
            method: 'POST',
            data: $scope.form,
        }).success(function(data, status, headers, config){
            $scope.dataManager.contacts.push(data);
            $scope.message = 'Successfully created the contact!';
            $scope.form = {};
        }).error(function(data, status, headers, config){
            $scope.message = 'Failed to created new contact!';
        });
    };

    /* Function for delete information based on click */
    $scope.delete = function(contact){
        var index = $scope.dataManager.contacts.indexOf(contact)
        $scope.dataManager.contacts.splice(index, 1);
        $http({
            url: $scope.root_url + contact.id + '/',
            method: 'DELETE',
            headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).success(function(data, status, headers, config){
            $scope.cancel();
            $scope.message = 'Successfully deleted the contact!';
            if($scope.form.id && $scope.form.id == contact.id){
                $scope.form = {};
            };
        }).error(function(data, status, headers, config){
            $scope.message = 'Faild to delete the data deleted the contact!';
        });
    };

    /* Reset button */
    $scope.cancel = function(){
        $scope.form = {};
        $scope.createButton = true;
        $scope.updateButton = false;
        $scope.cancelButton = false;
    }

    /* Function for update form information on submit */
    $scope.update = function(){
        $http({
            'url': $scope.root_url + $scope.form.id + '/',
            method: 'PUT',
            data: $.param($scope.form),
            headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).success(function(data, status, headers, config){
            $scope.message = 'Successfully updated data';
            var index = $scope.dataManager.contacts.indexOf($scope.dataManager.contacts.filter(c => c.id == $scope.form.id)[0]);
            $scope.dataManager.contacts.splice(index, 1);
            $scope.dataManager.contacts.push(data);
        }).error(function(data, status, headers, config){
            $scope.message = 'Fail to update data!';
        });
    };
});

app.controller('jsonController', function($scope, dataManager){
    $scope.dataManager = dataManager;
});
