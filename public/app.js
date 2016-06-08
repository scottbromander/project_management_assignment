var currentProject;

var employeeArray = [];
var projectCanBeCompleted = false;

$(document).ready(function(){
    enable();
});

function enable(){
    $("#generateProject").on('click', clickGenerateProject);
    $("#generateEmployee").on('click', clickGenerateEmployee);
}

function disable(){
    $("#generateProject").off('click', clickGenerateProject);
    $("#generateEmployee").on('click', clickGenerateEmployee);
}

function clickGenerateProject(){
    employeeArray = [];
    updateEmployeeList();
    $("#timeToComplete").text("");
    projectCanBeCompleted = false;

    var randomFe = randomNumber(10,60);
    var randomBe = randomNumber(10,60);
    var randomLogic = randomNumber(10,60);

    currentProject = new Project(randomFe, randomBe, randomLogic);
    updateProjectDisplay();

}

function clickGenerateEmployee(){
    checkProject();
}

function checkProject(employee){
    if(employee){
        employeeArray.push(employee);
        updateEmployeeList();
    }
    if(employeeArray.length >= 3){
        if(!projectCanBeCompleted) {
            if (canProjectBeComplete()) {
                projectCanBeCompleted = true;
                calculateComplete();
            } else {
                getEmployee();
            }
        } else {
            if(!employee) {
                getEmployee();
            }
            calculateComplete();
        }
    } else {
        getEmployee();
    }
}

function calculateComplete(){
    var beSprint = feSprint = logicSprint = 0;
    var beWeeks, feWeeks, logicWeeks;

    for(var i = 0; i < employeeArray.length; i++){
        switch(employeeArray[i].skillSet) {
            case "Back End":
                beSprint += employeeArray[i].sprintValue;
                break;
            case "Front End":
                feSprint += employeeArray[i].sprintValue;
                break;
            case "Logic":
                logicSprint += employeeArray[i].sprintValue;
                break;
        }
    }

    beWeeks = Math.ceil(currentProject.bePoints / beSprint);
    feWeeks = Math.ceil(currentProject.fePoints / feSprint);
    logicWeeks = Math.ceil(currentProject.logicPoints / logicSprint);

    var highestWeek = beWeeks;
    if(highestWeek < feWeeks){
        highestWeek = feWeeks;
    }
    if(highestWeek < logicWeeks){
        highestWeek = logicWeeks;
    }

    $("#timeToComplete").text("Time to complete project: " + highestWeek + " weeks!");
}

function canProjectBeComplete(){
    var feCovered, beCovered, logicCovered;

    for(var i = 0; i < employeeArray.length; i++){
        switch(employeeArray[i].skillSet) {
            case "Back End":
                beCovered = true;
                break;
            case "Front End":
                feCovered = true;
                break;
            case "Logic":
                logicCovered = true;
                break;
        }
    }

    if(beCovered && feCovered && logicCovered){
        return true;
    } else {
        return false;
    }
}

function getEmployee(){
    $.ajax({
        type: "GET",
        url: "/generateEmployee",
        success: function(data){
            checkProject(data);
        }
    })
}

function updateProjectDisplay(){
    $("#currentProject").children(".project-name").text("Some Project Name");
    $("#currentProject").children(".project-fe").text("Front End Points: " + currentProject.fePoints);
    $("#currentProject").children(".project-be").text("Back End Points: " + currentProject.bePoints);
    $("#currentProject").children(".project-logic").text("Logic Points: " + currentProject.logicPoints);

}

function updateEmployeeList(){
    $("#employeeList").empty();

    for(var i = 0; i < employeeArray.length; i++){
        var el = "<div class='col-md-2 well'>" +
                    "<p>" + employeeArray[i].name + "</p>" +
                    "<p>" + employeeArray[i].skillSet + "</p>" +
                    "<p>" + employeeArray[i].sprintValue + "</p>" +
                 "</div>";

        $("#employeeList").prepend(el);
    }
}

function Project(fePoints, bePoints, logicPoints){
    this.fePoints = fePoints;
    this.bePoints = bePoints;
    this.logicPoints = logicPoints;
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}