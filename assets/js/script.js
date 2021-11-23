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
            c: 'The programming language of the web'
        },
        correctAnswer: 'c'
    },

    {
        question: "What is an object?",
        answers: {
            a: 'A giraffe',
            b: 'A data structure which contains data associated with keys',
            c: 'The subject of a verb used in colloquial English'
        },
        correctAnswer: 'b'
    }
]

var currentQuestion
var rightAnswer = ""
var answerChoices = []


// Backend generation of question and answer data
var questionRetriever = function() {

}


// Generation of Graphical User Interface
var answerButtonGenerator = function() {

}

var questionPresenter = function() {

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