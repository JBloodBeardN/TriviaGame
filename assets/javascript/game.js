
//make an object for all of the questions, their possible answers and their correct answer
var questionSet = [
    {
        question: "what is your favorite color?",
        answers: [
        {value: "blue"},
        {value: "red"},
        {value: "green"},
        {value: "wait, no..yellow.. AHHHH!!"}
        ],
        answer: "wait, no..yellow.. AHHHH!!"
    },
    {
        question: "what is your quest?",
        answers: [
        {value: "to seek the Holy Grail"},
        {value: "dry british comedy"},
        {value: "lay with the queen"},
        {value: "reach the castle of AHHHHH"}
        ],
        answer: "to seek the Holy Grail"
    },
    {
        question: "what is the average velocity of an unladen swallow?",
        answers: [
        {value: "african"},
        {value: "european"},
        {value: "coconut"},
        {value: "oh, I dont know that..AHHHH"}
        ],
        answer: "oh, I dont know that..AHHHH"
    }
    
]

//make a counter for score at the end
var answersRight = 0;

//make a counter for the individual question timer
//done
var timer = 30;
var intervalId;


//make the time function which calls timesUp() on timer=0
//done
function decrementTimer(){
    if(timer <= 0){
        timesUp();
        clearInterval(intervalId);
      
    } else {
    timer--;
    //update the display
    document.getElementById('timeRemaining').innerHTML = "Your time remaining: "+ Math.floor(timer/60)+":"+ Math.floor(timer%60);   
    }
};

//make a timesUp() which calls the wrong answer function after displaying times up
//done
function timesUp(){
    clearInterval(intervalId);
    console.log("timesupRan");
    setTimeout(function(){
        updateStatus("<p>Time's Up</p>");
        wrongAnswer();
    },2000);
    
    timer = 30;
    document.getElementById('timeRemaining').innerHTML = "Your time remaining: "+ Math.floor(timer/60)+":"+ Math.floor(timer%60);
};
function updateStatus(string){
    $('#parentDiv').empty();
    $('#parentDiv').append(string);
}

//make a validateAnswer(chosenAnswer, correctAnswer);
//done
function validateAnswer(chosenAnswer, correctAnswer){
    console.log("validateAnswer ran")
    if(chosenAnswer === correctAnswer){
        rightAnswer();
    } else {
        wrongAnswer(correctAnswer);
    }
}

//make a wrongAnswer() which displays the correct answer then calls nextQuestion()
//done
function wrongAnswer(correctAnswer){
    console.log("wrongAnswer ran");
    $('#parentDiv').empty();
    $('#parentDiv').append("<p>You answered incorrectly.\nThe correct answer was:"+correctAnswer+"</p>");
    setTimeout(function(){nextQuestion()},2000);
};

//make a rightAnswer() which displays success message and iterates answersRight counter then calls nextQuestion()
//done
function rightAnswer(){
    console.log("rightAnswer ran");
    $('#parentDiv').empty();
    $('#parentDiv').append("<p>You answered correctly!</p>");
    answersRight++;
    setTimeout(function(){nextQuestion()},2000);
}
var nextQuestionCounter = 0;

//make a function for nextQuestion()
function nextQuestion(){
    console.log("nextQuestion ran");
    //reset the question timer (clear and recall interval)
    $('#parentDiv').empty();
    clearInterval(intervalId);
    timer = 30;
    
    if(nextQuestionCounter < questionSet.length){
       intervalId = setInterval(decrementTimer, 1000); 
        //make a <form> to append to parentDiv
        //use an index number to add the question text (label)
        //add the radio buttons to the form (data-index:[positionInArray], value="value to compare")
        //add a class for targeting the onClick
        //append that thing
        var newForm = $("<form>");

        var questionLabel = questionSet[nextQuestionCounter].question;
        var newLabel = $("<label>"+questionLabel+"</label>");
        //wet code for adding each radio answer
        var question1 = questionSet[nextQuestionCounter].answers[0].value;
        var question2 = questionSet[nextQuestionCounter].answers[1].value;
        var question3 = questionSet[nextQuestionCounter].answers[2].value;
        var question4 = questionSet[nextQuestionCounter].answers[3].value;
        
        // <label for="firstAnswer"> 
        //     <input type="radio" id="firstAnswer" class="firstQuestion" name="firstQuestion" data-index=1 value=true>
        //     True</label>
        var Radio1 = $("<br><label for='question1'><input id='question1' style='visibility: hidden' type='radio' name='question"+nextQuestionCounter+"' class='radio' data-index='"+nextQuestionCounter+"' value='"+question1+"'>"+question1+"</input></label><br/>");
        var Radio2 = $("<label for='question2'><input id='question2' style='visibility: hidden' type='radio' name='question"+nextQuestionCounter+"' class='radio' data-index='"+nextQuestionCounter+"'value='"+question2+"'>"+question2+"</input></label><br/>");
        var Radio3 = $("<label for='question3'><input id='question3' style='visibility: hidden' type='radio' name='question"+nextQuestionCounter+"' class='radio' data-index='"+nextQuestionCounter+"'value='"+question3+"'>"+question3+"</input></label><br/>");
        var Radio4 = $("<label for='question4'><input id='question4' style='visibility: hidden' type='radio' name='question"+nextQuestionCounter+"' class='radio' data-index='"+nextQuestionCounter+"'value='"+question4+"'>"+question4+"</input></label><br/>");
        newLabel.append(Radio1);
        newLabel.append(Radio2);
        newLabel.append(Radio3);
        newLabel.append(Radio4);

        newForm.append(newLabel);

        $('#parentDiv').append(newForm);


    } else {
        //have an exit for no more questions that goes to score and adds a reset button
        endState();

    }
    nextQuestionCounter++;
};



//make a reset function
//dont forget: counter for score, counter for question, intervalId
function reset(){
    timer=30;
    nextQuestionCounter=0;
    clearInterval(intervalId);
    answersRight=0;
    nextQuestion();
}

//endState() for displaying correct number of answers answersRight
function endState(){
    console.log("endState Ran");
        $('#parentDiv').empty();
        $('#parentDiv').append("<p>You've completed the Trivia.\nYou correctly answered:"+answersRight+"</p><br>");
        $('#parentDiv').append("<button onclick='reset()'>Reset</button>");

}

//only do stuff after the document is ready

$(document).ready(function(){

   $('#parentDiv').on("click", ".radio", function(){
    console.log("clickWorked");
    var chosenAnswer = this.value;
    var correctAnswer = questionSet[this.dataset.index].answer;
    console.log(chosenAnswer);
    console.log(correctAnswer);
    validateAnswer(chosenAnswer, correctAnswer);
   });  



    //call my function for nextQuestion() and start the process
    nextQuestion();
});