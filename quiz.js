const questions = [
    {
        question: "What is the capital city of Australia?",
        answers: [
            { text: "Sydney", correct: false},
            { text: "Melbourne", correct: false},
            { text: "Canbera", correct: true},
            { text: "Brisbane", correct: false},
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Mars", correct: true},
            { text: "Jupiter", correct: false},
            { text: "Saturn", correct: false},
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "William Wordsworth", correct: false},
            { text: "William Faulkner", correct: false},
            { text: "William Shakespeare", correct: true},
            { text: "Jane Austen", correct: false},
        ]
    },
    {
        question: "What is the largest mammal in earth?",
        answers: [
            { text: "Elephant", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Giraffe", correct: false},
            { text: "Polar Bear", correct: false},
        ]
    },
    {
        question: "In which year did the United Statees declare its independence?",
        answers: [
            { text: "1676", correct: false},
            { text: "1776", correct: true},
            { text: "1876", correct: false},
            { text: "1976", correct: false},
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Indian Ocean", correct: false},
            { text: "Atlantic Ocean", correct: false},
            { text: "Southern Ocean", correct: false},
            { text: "Pacific Ocean", correct: true},
        ]
    },
    {
        question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
        answers: [
            { text: "Mars", correct: false},
            { text: "Venus", correct: true},
            { text: "Jupiter", correct: false},
            { text: "Saturn", correct: false},
        ]
    },
    {
        question: "Who is the author of the Harry Potter book series?",
        answers: [
            { text: "J.R.R. Tolkien", correct: false},
            { text: "George R.R. Martin", correct: false},
            { text: "J.K. Rowling", correct: true},
            { text: "Suzanne Collins", correct: false},
        ]
    },
    {
        question: "What is the capital city of Japan?",
        answers: [
            { text: "Beijing", correct: false},
            { text: "Seoul", correct: false},
            { text: "Tokyo", correct: true},
            { text: "Bangkok", correct: false},
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            { text: "Oxygen", correct: true},
            { text: "Gold", correct: false},
            { text: "Silver", correct: false},
            { text: "Iron", correct: false},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    resetTimer();
    startTimer(20);

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetTimer() {
    clearInterval(timer);
    timerElement.textContent = "";
}

function startTimer(duration) {
    let timeLeft = duration;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
      if (timeLeft <= 1) {
        clearInterval(timer);
        handleTimeout(); 
      }
      
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft}s`;
    }, 1000);
}

function handleTimeout() {
    const correctButton = Array.from(answerButtons.children).find(button => button.dataset.correct === "true");

    correctButton.classList.add("correct");
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    resetTimer();
    timerElement.textContent = ""; 

    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Take Quiz Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();