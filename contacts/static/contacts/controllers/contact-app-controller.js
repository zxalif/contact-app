app.controller('homeController', function($scope, $http, dataManager){
    /* initialize form variable */
    $scope.form = {};
    $scope.contacts = new Array();

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
        $('#contact_id').hide();
        $('#create').hide();
        $('#update').show();
        $('#cancel').show();

        $scope.form.contact_id = select.contact_id;
        $scope.form.contact_name = select.contact_name;
    };

    $scope.submit = function(){
        $http({
            url: '/api/v1/contacts/',
            method: 'POST',
            data: $.param($scope.form),
            headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).success(function(data, status, headers, config){
            $scope.contacts.push(data);
            $scope.message = 'Successfully created the contact!';
        }).error(function(data, status, headers, config){
            $scope.message = 'Failed to created new contact!';
        });
    };

    $scope.delete = function(contact){
        var index = $scope.contacts.indexOf(contact)
        $scope.contacts.splice(index, 1);
        $http({
            'url': 'api/v1/contacts/' + contact.contact_id + '/',
            method: 'DELETE',
            headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).success(function(data, status, headers, config){
            $scope.message = 'Successfully deleted the contact!';
        }).error(function(data, status, headers, config){
            $scope.message = 'Faild to delete the data deleted the contact!';
        });   
    };

    $scope.cancel = function(){
        $scope.form.contact_id = null;
        $scope.form.contact_name = null;
        $('#contact_id').show();
        $('#create').show();
        $('#update').hide();
        $('#cancel').hide();
    }

    $scope.update = function(){
        $http({
            'url': 'api/v1/contacts/' + $scope.form.contact_id + '/',
            method: 'PUT',
            data: $.param($scope.form),
            headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).success(function(data, status, headers, config){
            $scope.message = 'Successfully updated data';
            var index = $scope.contacts.indexOf($scope.contacts.filter(c => c.contact_id == $scope.form.contact_id)[0]);
            $scope.contacts.splice(index, 1);
            $scope.contacts.push(data);
        }).error(function(data, status, headers, config){
            $scope.message = 'Fail to update data!';
        });
    };

    dataManager.getNumberOfData = function(){
        if($scope.contacts.length > 0){
            dataManager.sample.contact_id = $scope.contacts[$scope.contacts.length-1].contact_id;
            dataManager.sample.contact_name = $scope.contacts[$scope.contacts.length-1].contact_name;
        }
        return $scope.contacts.length;
    }
});

app.controller('aboutController', function($scope, dataManager){
    $scope.numberOfTotalContact = dataManager.getNumberOfData();
    $scope.sample = dataManager.sample;
});