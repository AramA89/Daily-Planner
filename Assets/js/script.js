$(document).ready(function() {

    // Adding current date to the jumbotron
    $("#currentDay").text(moment().format("MMMM Do YYYY"));
    
    
    let description = $(".description");
    let saveButton = $(".saveBtn");
    let currentHour = moment().hour();
    
    console.log(currentHour);
    console.log(typeof currentHour);
    
    
    // Color coding the time blocks based on current hour
    description.each(function () {
        let timeBlock = parseInt($(this).attr("id"));
    
        if (timeBlock === currentHour) {
            $(this).addClass("present");
            $(this).removeClass("future");
            $(this).removeClass("past");
        }
        else if (timeBlock < currentHour) {
            $(this).addClass("past");
            $(this).removeClass("future");
            $(this).removeClass("present");
        }
        else {
            $(this).addClass("future");
            $(this).removeClass("past");
            $(this).removeClass("present");
        }
    });
    
    // Function to save in local storage to the appropriate row 
    
    description.each(function() {
    
        for (let i = 0; i < localStorage.length; i++) {
            let objectKey = localStorage.key(i);
            let taskValue = localStorage.getItem(objectKey);
            let rowHour = $(this).siblings(".hour").text();
            
            console.log(rowHour);
            console.log(typeof rowHour);
            console.log(objectKey);
            console.log(typeof objectKey);
            console.log(taskValue);
            console.log(typeof taskValue);
           
            if (objectKey === rowHour) {
                $(this).val(taskValue);
            }
           
        }
    });
    
    // Function to save task input once the save button is clicked
    function saveTasks () {
        let currentTime = $(this).data("hour");
        let rowHour = $(this).siblings(".hour").text();
        let task = $(this).siblings(".description").val();
    
        console.log(currentTime);
        console.log(rowHour);
        console.log(task);
    
        if (task === "") {
            localStorage.setItem(rowHour, "");
        }
        else {
            localStorage.setItem(rowHour, task);
        }
    }
    
    saveButton.on("click", saveTasks);
    
    });