app.filter('byName', function(){
    /* Filter for shorting an object by its property */

    return function(inputs, argument, reverse=false){
        if(inputs == undefined || typeof inputs != 'object'){
            return inputs;
        }
        let items = [], reminder = [], sortedArray = [];
        inputs.forEach(input => {
            items.push(input[argument]);
            reminder.push(input[argument]);
        });
        items.sort();
        var i = 0;
        for(var item in items){
            let index = reminder.indexOf(items[item]);
            sortedArray[i] = inputs[index];
            sortedArray[i][argument] = items[item];
            reminder[index] = null;
            i = i + 1;
        }

        if(reverse){
            let reversed = [];
            for(var i = sortedArray.length; i > 0; i--){
                reversed[sortedArray.length-i] = sortedArray[i-1];
            }
            return reversed;
        }
        return sortedArray;
    };
});
