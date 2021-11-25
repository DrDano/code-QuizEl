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
var displayContainerE = document.querySelector("#question-container")
var displayTitleE = document.querySelector("#question-title")
var displayListE = document.querySelector("#possible-answers")
var highScores = {}
var questionPresentations = 0

var currentScore = 0
var elapsedTime = 0


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

    displayTitleE.textContent = "Welcome to the Javascript QuizEl by DrDano! Push the button below to begin the timed quiz."

    var startButton = startButtonGenerator();
    displayContainerE.appendChild(startButton);

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

var submitButtonGenerator = function() {
    var submitButtonEContainer = document.createElement("div");
    submitButtonEContainer.className = "submit-btn-con";

    var submitButtonE = document.createElement("button");
    submitButtonE.textContent = "Submit";
    submitButtonE.className = "btn";
    submitButtonE.id = "submit-button";

    submitButtonEContainer.appendChild(submitButtonE);
    return submitButtonEContainer;
}

var answerButtonGenerator = function(currentQuestionContent) {
    var questionContent = currentQuestionContent;

    var answerBtnContainer = document.createElement("div");
    answerBtnContainer.className = "answer-btn-container"
    
    var buttonA = document.createElement("button")
    buttonA.textContent = "1. " + questionContent.ac.a
    buttonA.className = "btn"
    buttonA.id = "option-A"

    var buttonB = document.createElement("button")
    buttonB.textContent = "2. " + questionContent.ac.b
    buttonB.className = "btn"
    buttonB.id = "option-B"

    var buttonC = document.createElement("button")
    buttonC.textContent = "3. " + questionContent.ac.c
    buttonC.className = "btn"
    buttonC.id = "option-C"

    var buttonD = document.createElement("button")
    buttonD.textContent = "4. " + questionContent.ac.d
    buttonD.className = "btn"
    buttonD.id = "option-D"

    answerBtnContainer.appendChild(buttonA);
    answerBtnContainer.appendChild(buttonB);
    answerBtnContainer.appendChild(buttonC);
    answerBtnContainer.appendChild(buttonD);


    return answerBtnContainer
}

var questionPresenter = function() {
    var startButton = document.querySelector(".start-btn-con")
    
    if (startButton) {
        startButton.remove();
    }

    var questionContent = questionRetriever();
    displayTitleE.textContent = questionContent.cq.question;
    
    var answerBtnContainer = document.querySelector(".answer-btn-container")
    if (answerBtnContainer) {
        answerBtnContainer.remove();
    }

    var answerButtons = answerButtonGenerator(questionContent);
    displayContainerE.appendChild(answerButtons);

    questionPresentations++
    console.log(`question ${questionPresentations} being presented`)
}


// Evaluation of user answer
var answerEvaluator = function(answer) {
    // if user answer correct return true
    // if user answer incorrect return false
    var questionContent = questionRetriever();
    var correctAnswer = questionContent.ra;
    var userAnswer = answer;
    if (userAnswer === correctAnswer) {
        console.log("correct answer!")
        correctAnswerRewarder();
    } else if (userAnswer !== correctAnswer) {
        console.log("wrong, you suck.")
        wrongAnswerPunisher();
    }

    if (questionPresentations === questionBank.length) {
        endScreenPresenter();
    } else {questionPresenter();}
    
}

var wrongAnswerPunisher = function() {
    // returns new time amount after subtracting 5 seconds

}

var correctAnswerRewarder = function() {
    // adds +1 to currentScore
    currentScore++
}

var endScreenPresenter = function() {
    var startButton = document.querySelector(".start-btn-con")
    if (startButton) {
        startButton.remove();
    }
    
    questionPresentations = 0
    
    displayTitleE.textContent = "The quiz has ended or timed out. Enter your initials and push 'Submit' to record your score."

    var answerBtnContainer = document.querySelector(".answer-btn-container")
    if (answerBtnContainer) {
        answerBtnContainer.remove();
    }

    elapsedTime = 20

    highScoresFormPresenter();

}

var highScoresFormPresenter = function() {
    var initialsInputContainerE = document.createElement("div");
    initialsInputContainerE.className = "initials-con";
    initialsInputContainerE.id = "initials-container";
    displayContainerE.appendChild(initialsInputContainerE);

    var initialsInputE = document.createElement("input");
    initialsInputE.type = "text";
    initialsInputE.className = "initials-input";
    initialsInputE.id = "initials-form-input";
    initialsInputContainerE.appendChild(initialsInputE);

    var submitButton = submitButtonGenerator();
    initialsInputContainerE.appendChild(submitButton);
}

var highScoresObjectModifier = function(initials, score) {
    // adds/replaces a high score if it matches an initials key in the object and if it exceeds the current high score, or if it doesn't match any initials key
    
    var loadedHS = highScoresObjectLoader();
    highScores = loadedHS
    
    if (loadedHS[initials]) {
        if (loadedHS[initials] < score) {
            highScores[initials] = score
            highScoresObjectSaver();
        }
    } else {
        highScores[initials] = score
        highScoresObjectSaver();
    }

    highScoresObjectSaver();
    currentScore = 0;

    var initialsInputContainerE = document.querySelector("#initials-container");
    initialsInputContainerE.remove();
    initialFormGenerator();
}

var highScoresObjectSaver = function() {
    localStorage.setItem("high-scores", JSON.stringify(highScores));
}

var highScoresObjectLoader = function() {
    // loads high scores object into a readable format for the highScoresPresenter
    var savedHSObj = localStorage.getItem("high-scores");
    var parsedHSObj = JSON.parse(savedHSObj);
    return parsedHSObj;
}

var highScoresPresenter = function() {

    var loadedHS = highScoresObjectLoader();
    var hSbOjLength = Object.keys(loadedHS).length

    while (displayContainerE.firstChild) {
        displayContainerE.firstChild.remove();
    }

    var highScoresContainerE = document.querySelector("#hs-container");
    if (highScoresContainerE) {
        highScoresContainerE.remove();
    }

    var highScoresContainerE = document.createElement("div");
    highScoresContainerE.className = "hs-con";
    highScoresContainerE.id = "hs-container";
    quizDashboardE.appendChild(highScoresContainerE);

    for (let i = 0; i < hSbOjLength; i++) {
        var key = Object.keys(loadedHS)[i]
        var value = Object.values(loadedHS)[i]

        var highScoreE = document.createElement("div");
        highScoreE.className = "hs";
        highScoreE.id = "hs-element";
        highScoreE.textContent = `${key} Score: ${value}`
        highScoresContainerE.appendChild(highScoreE);
    }

    var goBackButtonCon = document.createElement("div");
    goBackButtonCon.className = "goBack-con"
    highScoresContainerE.appendChild(goBackButtonCon);

    var goBackButtonE = document.createElement("button");
    goBackButtonE.className = "btn";
    goBackButtonE.id = "goBack-btn";
    goBackButtonE.textContent = "Go Back";
    goBackButtonCon.appendChild(goBackButtonE);
}

var QuizButtonHandler = function(event) {
    // listens for the initial quiz start button to begin the quiz
    // listens for the quiz answer buttons and sends the input to the answer evaluator to determine if the punisher or rewarder is used
    var targetE = event.target;

    if (targetE.matches("#start-button")) {
        questionPresenter();
        quizTimer();
    }

    else if (targetE.matches("#option-A")) {
        var answer = "a"
        answerEvaluator(answer);
        console.log("A")
    } else if (targetE.matches("#option-B")) {
        var answer = "b"
        answerEvaluator(answer)
        console.log("B")
    } else if (targetE.matches("#option-C")) {
        var answer = "c"
        answerEvaluator(answer)
        console.log("C")
    } else if (targetE.matches("#option-D")) {
        var answer = "d"
        answerEvaluator(answer)
        console.log("D")
    } else if (targetE.matches("#submit-button")) {
        var initialsInput = document.querySelector("#initials-form-input");
        var initials = initialsInput.value;
        var score = currentScore

        highScoresObjectModifier(initials, score)
    } else if (targetE.matches("#goBack-btn")) {
        var highScoresContainerE = document.querySelector("#hs-container");
        highScoresContainerE.remove();

        var replaceHeader = document.createElement("h2");
        replaceHeader.className = "question-title";
        replaceHeader.id = "question-title"
        replaceHeader.textContent = "Welcome to the Javascript QuizEl by DrDano! Push the button below to begin the timed quiz."
        displayTitleE = replaceHeader
        displayContainerE.appendChild(displayTitleE);

        initialFormGenerator();
    }
}

var quizTimer = function() {
    
    var interval = 20000
    function timedOut(){
            endScreenPresenter();
    }
    setTimeout(timedOut, interval);

    setInterval(function(){
        elapsedTime++
        if (elapsedTime === 20) {
            elapsedTime = 0
        }
        console.log(elapsedTime)}, 1000)
}

initialFormGenerator();


quizDashboardE.addEventListener("click", QuizButtonHandler);
highScoresE.addEventListener("click", highScoresPresenter);
