// create question bank with answers and a key to provide location of correct answer

// when user clicks button, display the first question
// display questions randomly from bank of questions
// when user clicks the correct answer screen flashes green and they move on to next question
// when user clicks the wrong answer the screen flashes red and they move on to next question and remove 5 seconds from their timer

// when the user answers all questions the quiz is over
// when the timer reaches 0 the quiz is over
// when the quiz is over, display a form where they can enter their initials next to their high score.

// store the user's highest score in an object with their initials as the key
// store all high scores in JSON format in localStorage for retrieval whenever the user clicks on "view high scores"

var questionBank = [
    {
        question: "What is Javascript?",
        answers: {
            a: '42',
            b: 'A type of antelope',
            c: 'The programming language of the web',
            d: 'All of the above'
        },
        correctAnswer: 'c'
    },

    {
        question: "What is an object?",
        answers: {
            a: 'A giraffe',
            b: 'A data structure which contains data associated with keys',
            c: 'The subject of a verb used in colloquial English',
            d: 'All of the above'
        },
        correctAnswer: 'b'
    }
]

var quizDashboardE = document.querySelector("#quiz-dashboard")
var highScoresE = document.querySelector("#high-score-btn")
var displayConatinerE = document.querySelector("#question-container")
var displayTitleE = document.querySelector("#question-title")
var displayListE = document.querySelector("#possible-answers")
var highScores = {}

var currentScore = 0


// Backend generation of question and answer data
function generateRandomQIndex() {
    var questionIndex = 0
    questionIndex = Math.floor(questionBank.length * Math.random())
    return questionIndex
}

var questionRetriever = function() {
    var currentQIdx = generateRandomQIndex()
    var currentQuestion = questionBank[currentQIdx];
    var rightAnswer = currentQuestion.correctAnswer;
    var answerChoices = currentQuestion.answers;
    
    return {cq: currentQuestion, 
        ra: rightAnswer, 
        ac: answerChoices}
}


// Generation of question Graphical User Interface
var initialFormGenerator = function() {

    displayTitleE.textContent = "Welcome to the Javascript Extreme Quiz by DrDano! Push the button below to begin the timed quiz."

    var startButton = startButtonGenerator();
    displayConatinerE.appendChild(startButton);
}

var startButtonGenerator = function() {
    var startButtonContainerE = document.createElement("div");
    startButtonContainerE.className = "start-btn-con";

    var startButtonE = document.createElement("button");
    startButtonE.textContent = "Start Quiz";
    startButtonE.className = "btn";
    startButtonE.id = "start-button";

    startButtonContainerE.appendChild(startButtonE);
    return startButtonContainerE;
}

var answerButtonGenerator = function() {
    var questionContent = questionRetriever();

    var answerBtnContainer = document.createElement("div");
    answerBtnContainer.className = "answer-btn-container"
    
    var buttonA = document.createElement("button")
    buttonA.textContent = questionContent.ac.a
    buttonA.id = "option-A"

    var buttonB = document.createElement("button")
    buttonB.textContent = questionContent.ac.b
    buttonB.id = "option-B"

    var buttonC = document.createElement("button")
    buttonC.textContent = questionContent.ac.c
    buttonC.id = "option-C"

    var buttonD = document.createElement("button")
    buttonD.textContent = questionContent.ac.d
    buttonD.id = "option-D"

    answerBtnContainer.appendChild(buttonA);
    answerBtnContainer.appendChild(buttonB);
    answerBtnContainer.appendChild(buttonC);
    answerBtnContainer.appendChild(buttonD);


    return answerBtnContainer
}

var questionPresenter = function() {
    var questionContent = questionRetriever();
    displayTitleE.textContent = questionContent.cq.question;

    var answerButtons = answerButtonGenerator();
    displayConatinerE.appendChild(answerButtons);

}


// Evaluation of user answer
var answerEvaluator = function() {
    // if user answer correct return true
    // if user answer incorrect return false


}

var quizTimer = function() {

}

var wrongAnswerPunisher = function() {
    // returns new time amount after subtracting 5 seconds
}

var correctAnswerRewarder = function() {
    // adds +1 to currentScore
}

var highScoresObjectModifier = function() {
    // adds/replaces a high score if it matches an initials key in the object and if it exceeds the current high score, or if it doesn't match any initials key
}

var highScoresObjectSaver = function() {

}

var highScoresObjectLoader = function() {
    // loads high scores object into a readable format for the highScoresPresenter
}

var highScoresPresenter = function() {
    
}

var QuizButtonHandler = function(event) {
    // listens for the initial quiz start button to begin the quiz
    // listens for the quiz answer buttons and sends the input to the answer evaluator to determine if the punisher or rewarder is used
    var targetE = event.target;

    if (targetE.matches("#start-button")) {
        questionPresenter();
    }

    else if (targetE.matches("#answer-btn")) {
        answerEvaluator();
    }
}

// var initiateQuizButtonHandler = function() {
//     // listens for an event of "click" on the start quiz button and proceeds to present the quiz
// }

initialFormGenerator();

quizDashboardE.addEventListener("click", QuizButtonHandler);
highScoresE.addEventListener("click", highScoresPresenter)
