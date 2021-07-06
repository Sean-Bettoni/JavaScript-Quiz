const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


// Quiz timer
document.addEventListener('DOMContentLoaded', () => {
    const timeLeftDisplay = document.querySelector('#time-left')
    const startButton = document.querySelector('#startButton')
    timeLeft = 60

function countDown(){
    setInterval(function(){
        if(timeLeft <= 0 ) {
            clearInterval(timeLeft = 0)
        }
        timeLeftDisplay.innerHTML = timeLeft
        timeLeft -=1
    }, 1000)
}

})


let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    // This will allow questions to be randomized
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    // This will make quiz always start at question 1
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}


// This will allow the next question to be randomized
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}



function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


function selectAnswer (e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
// Checking if currentQuestionIndex + 1 (2 or more questions) is greater than shuffledQuestions length, and if correct show the next button
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    }
    // If there are no more questions, display the Restart button
    else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } 
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Quiz Questions
const questions = [
    {
    question: 'What is js and abbreviation for?',
    answers: [
         { text: 'JavaScript', correct: true },
         { text: 'Json', correct: false },
         { text: 'Jason Statham', correct: false },
         { text: 'JavaSource', correct: false }
     ]
    },
    
    {
    question: 'JavaScript files end with?',
    answers: [
         { text: '.css', correct: false },
         { text: '.jpeg', correct: false },
         { text: '.js', correct: true },
         { text: '.html', correct: false }
     ]   
    },

    {
    question: 'What is JavaScript?',
    answers: [
         { text: 'A universal sign language', correct: false },
         { text: 'A book about Java', correct: false },
         { text: 'A font style', correct: false },
         { text: 'A programming language', correct: true }
     ]   
    },

{
    question: 'Who created JavaScript?',
    answers: [
         { text: 'Bill Gates', correct: false },
         { text: 'Brendan Eich', correct: true },
         { text: 'Arvind Krishna', correct: false },
         { text: 'Steve Jobs', correct: false }
     ]   
    },

]