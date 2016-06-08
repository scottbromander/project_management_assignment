var randomNumber = require('./randomNumber');
var firstNames = require('../data/firstNames');
var lastNames = require('../data/lastNames');

function createEmployee(){
    var firstName = firstNames[randomNumber(0, (firstNames.length - 1))];
    var lastName = lastNames[randomNumber(0, (lastNames.length - 1))];
    var skillSet = randomNumber(0,2);

    switch(skillSet){
        case 0:
            skillSet = "Back End";
            break;
        case 1:
            skillSet = "Front End";
            break;
        case 2:
            skillSet = "Logic";
            break;
    }

    var spriteValue = randomNumber(1,9);

    var employee = {
        "name" : firstName + " " + lastName,
        "skillSet" : skillSet,
        "sprintValue" : spriteValue
    };

    return employee;
}

module.exports = createEmployee;