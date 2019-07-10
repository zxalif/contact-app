app.controller('homeController', function($scope, $http, dataManager){
    /* initialize form variable */
    $scope.form = {};
    $scope.contacts = new Array();

    /* Visibility Setup */
    $scope.createButton = true;
    $scope.updateButton = false;
    $scope.cancelButton = false;

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
        let select = $scope.contacts.filter(c => c.id == contact.id)[0];

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

    $scope.submit = function(){
        $http({
            url: '/api/v1/contacts/',
            method: 'POST',
            data: $scope.form,
        }).success(function(data, status, headers, config){
            $scope.contacts.push(data);
            $scope.message = 'Successfully created the contact!';
            $scope.form = {};
        }).error(function(data, status, headers, config){
            $scope.message = 'Failed to created new contact!';
        });
    };

    $scope.delete = function(contact){
        var index = $scope.contacts.indexOf(contact)
        $scope.contacts.splice(index, 1);
        $http({
            'url': 'api/v1/contacts/' + contact.id + '/',
            method: 'DELETE',
            headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).success(function(data, status, headers, config){
            $scope.message = 'Successfully deleted the contact!';
            if($scope.form.id && $scope.form.id == contact.id){
                $scope.form = {};
            };
        }).error(function(data, status, headers, config){
            $scope.message = 'Faild to delete the data deleted the contact!';
        });   
    };

    $scope.cancel = function(){
        $scope.form = {};
        $scope.createButton = true;
        $scope.updateButton = false;
        $scope.cancelButton = false;
    }

    $scope.update = function(){
        $http({
            'url': 'api/v1/contacts/' + $scope.form.id + '/',
            method: 'PUT',
            data: $.param($scope.form),
            headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).success(function(data, status, headers, config){
            $scope.message = 'Successfully updated data';
            var index = $scope.contacts.indexOf($scope.contacts.filter(c => c.id == $scope.form.id)[0]);
            $scope.contacts.splice(index, 1);
            $scope.contacts.push(data);
        }).error(function(data, status, headers, config){
            $scope.message = 'Fail to update data!';
        });
    };

    dataManager.getNumberOfData = function(){
        if($scope.contacts.length > 0){
            dataManager.sample.id = $scope.contacts[$scope.contacts.length-1].id;
            dataManager.sample.contact_name = $scope.contacts[$scope.contacts.length-1].contact_name;
        }
        return $scope.contacts.length;
    }
});

app.controller('jsonController', function($scope, dataManager){
    $scope.contacts = dataManager.contacts;
});