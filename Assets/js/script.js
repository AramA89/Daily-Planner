$(document).ready(function() {
 
    // Adding current date & time to the jumbotron
    $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
    
    // Function to clear tasks & local storage
    $("#clearBtn").click(function() {
        localStorage.removeItem('tasks');
        location.reload()
     });
    
    let description = $(".description");
    let currentHour = moment().hour();
    
    console.log(currentHour);
    console.log(typeof currentHour); 
  
    // Color coding time blocks based on current hour
    function colorCoding() {
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
}
    
    // Function to display tasks saved in local storage to the appropriate row 
    var storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    description.each(function() {
        for (let i = 0; i < storedTasks.length; i++) {
            let objectKey = storedTasks[i].hour
            let taskValue = storedTasks[i].task
            let rowHour = $(this).siblings(".hour").text();
            
            if (objectKey === rowHour) {
                $(this).val(taskValue);
            }
           
        }
    });
    
    // Function to save task input once the save button is clicked
    function saveTasks () {
        let currentTime = $(this).data("hour");
        let task = $(this).siblings(".description").val();
    
        console.log(currentTime);
        console.log(typeof currentTime);
        let isNewTask = true
        console.log('storedTasks', storedTasks)
        for (let i = 0; i < storedTasks.length; i++) {
            console.log(storedTasks[i].hour)
            console.log(typeof storedTasks[i].hour)
            if (storedTasks[i].hour === currentTime) {
                storedTasks[i].task = task
                isNewTask = false
                break;
            }
        }
        
        if (isNewTask) {
        storedTasks.push({hour: currentTime, task: task})
        }

        localStorage.setItem('tasks', JSON.stringify(storedTasks))
    

    };
    
    $('.container').on("click", '.saveBtn',saveTasks);

    colorCoding();
    setInterval(colorCoding, 60000);
    
    });