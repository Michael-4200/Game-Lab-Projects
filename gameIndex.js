// - - - - - - - - - - - - - - - - - - - - GAME LAB PROJECT: BATCH #1 (1 - 30) - - - - - - - - - - - - - - - - - - - - //

// homeScreenContainer
const homeScreenContainer = document.getElementById("homeScreenContainer")
// REPLACED EVERY EVENTLISTENER with Universal GameCard Handlers:
document.querySelectorAll(".gameCard").forEach(card => {
    card.addEventListener("click", function(){
        const targetId = card.getAttribute("data-target")

        // hide the homeScreenContainer 
        homeScreenContainer.style.display = "none"
        // Hide all display containers
        document.querySelectorAll(".gameDisplayContainer").forEach(container => {
            container.style.display = "none"
        })
        // Only show the matching one, if it exists
        if(targetId){
            const targetGame = document.getElementById(targetId)
            if (targetGame){
                targetGame.style.display = "block"
                targetGame.classList.add("activeGame")
            }

            // If a game needs setup logic, run it
            if (targetId === "numberGuessingContainer"){
                loadNumberGuessingGame()
            }
            if (targetId === "counterContainer"){
                document.getElementById("counterResult").textContent = "0"
            }
            // add more here when needed
        }
    })
})

// Add a listener for the BACK btn inside each game container
document.querySelectorAll(".backBtn").forEach(button => {
    button.addEventListener("click", function(){
        // hide all game containers
        document.querySelectorAll(".gameDisplayContainer").forEach(container => {
            container.style.display = "none"
            container.classList.remove("activeGame")
        })
        homeScreenContainer.style.display = "block"
    })
})


// ---------------------------------- NUMBER GUESSING GAME ---------------------------------- // 
// Description: User tries to guess a random number within a range.

// Create persistent state vars for keeping track of answers and attempts
let answer
let attempts
// JavaScript checks the guess and updates #numberGuessingFeedback with a message
document.getElementById("mySubmit").addEventListener("click", function () {
    const guessInput = document.getElementById("guessInput")
    const numberGuessingFeedback = document.getElementById("numberGuessingFeedback")
    const mySubmit = document.getElementById("mySubmit")
    const game1restartBtn = document.getElementById("game1restartBtn")

    let guess = Number(guessInput.value)
    // Check if input is a valid number
    if(isNaN(guess)){
        numberGuessingFeedback.textContent = "Please enter a valid number."
    // Check if input is within the range    
    } else if (guess < 1 || guess > 100) {
        numberGuessingFeedback.textContent = "Please enter a number between 1 and 100."
    } else {
        attempts++
        // Check if the input is too low
        if (guess < answer){
            numberGuessingFeedback.textContent = "Too low! Try again."
        // Check if the input is too high    
        } else if(guess > answer){
            numberGuessingFeedback.textContent = "Too high! Try again"
        // Respond to confirm if guess is correct, then disable the input and submit
        } else {
            numberGuessingFeedback.textContent = `🎉 You guessed it! The number was ${answer}. Attempts: ${attempts}`
            guessInput.disabled = true
            mySubmit.disabled = true
            game1restartBtn.style.display = "inline"
            mySubmit.style.display = "none"
        }
    }

    // Optional: clear the input after guess
    guessInput.value = ""
})

// Initialize the function
function loadNumberGuessingGame(){
    // Re-enable the input and submit
    document.getElementById("mySubmit").disabled = false
    document.getElementById("guessInput").disabled = false
    
    // Reset the game state
    answer = Math.floor(Math.random() * 100) + 1
    attempts = 0

    // Make the game display window visible
    document.getElementById("numberGuessingContainer").style.display = "block"

    // Clear input and feedback from prevoious games
    document.getElementById("guessInput").value = ""
    document.getElementById("numberGuessingFeedback").textContent = ""
}

// Reset the game by adding an event listener to the game1restartBtn
document.getElementById("game1restartBtn").addEventListener("click", function () {
    loadNumberGuessingGame()
    this.style.display = "none"
})


// ---------------------------------- PASSWORD GENERATOR ---------------------------------- // 
// Description: Creates a random password based on user criteria.

// Initialize the function
function generatePassword(){
    // set the consts for all possible chars
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numberChars = "0123456789"
    const symbolChars = "!@#$&*/?"
    // which chars are allowed?
    let allowedChars = lowercaseChars + uppercaseChars + numberChars + symbolChars
    // initialize an empty password string
    let password = ""
    // set the maximum password length
    const length = 15
    // create the password via for loop
    for (let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * allowedChars.length)
        password += allowedChars[randomIndex]
    }
    // display password
    return password
}
    // event listener for "GENERATE" button
    document.getElementById("generatePasswordBtn").addEventListener("click", function (){
        const password = generatePassword()
        document.getElementById("passwordGeneratorFeedback").textContent = password
        document.getElementById("passwordGeneratorFeedback").style.display = "inline-block"
        document.getElementById("passwordGeneratorResetBtn").style.display = "inline"
        document.getElementById("generatePasswordBtn").style.display = "none"
        document.getElementById("reGeneratePasswordBtn").style.display = "inline"
    })

    // event listener for "REGENERATE" button
    document.getElementById("reGeneratePasswordBtn").addEventListener("click", function (){
        const password = generatePassword()
        document.getElementById("passwordGeneratorFeedback").textContent = password
        document.getElementById("passwordGeneratorFeedback").style.display = "inline-block"
        document.getElementById("passwordGeneratorResetBtn").style.display = "inline"
        document.getElementById("generatePasswordBtn").style.display = "none"
    })

    // event listener for "passwordGeneratorResetBtn" button, reset and hide the reset button
    document.getElementById("passwordGeneratorResetBtn").addEventListener("click", function(){
        document.getElementById("passwordGeneratorFeedback").textContent = ""
        document.getElementById("passwordGeneratorFeedback").style.display = "none"
        document.getElementById("passwordGeneratorResetBtn").style.display = "none"
        document.getElementById("generatePasswordBtn").style.display = "inline"
        document.getElementById("reGeneratePasswordBtn").style.display = "none"
    })


// ---------------------------------- RANDOM NUMBER GENERATOR ---------------------------------- // 
// Description: Generates a random number within a specified range.

// Initialize the constants
const randomNumberGeneratorBtn = document.getElementById("randomNumberGeneratorBtn")
const randomNumberGeneratorResetBtn = document.getElementById("randomNumberGeneratorResetBtn")
const randomNumberGeneratorFeedback = document.getElementById("randomNumberGeneratorFeedback")

// Determine the min and max
const min = 1
const max = 1500

// Initialize a variable for the random number
let randomNum

// Create a function that generates a number between min and max
function generateRandomNumber(){
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNum
}

// Display the number when the button is clicked
randomNumberGeneratorBtn.addEventListener("click", function (){
    const result = generateRandomNumber()
    document.getElementById("randomNumberGeneratorFeedback").textContent = result
    randomNumberGeneratorResetBtn.style.display = "inline"
})

// If reset is clicked, display is reset
randomNumberGeneratorResetBtn.addEventListener("click", function(){
    randomNumberGeneratorFeedback.textContent = ""
    randomNumberGeneratorResetBtn.style.display = "none"
})


// ---------------------------------- COUNTER ---------------------------------- // 
// Description: Simple counter to increase, decrease, or reset a number.

// Store all buttons and result within a constant
const counterResult = document.getElementById("counterResult")
const counterDecreaseBtn = document.getElementById("counterDecreaseBtn")
const counterIncreaseBtn = document.getElementById("counterIncreaseBtn")
const counterResetBtn = document.getElementById("counterResetBtn")

// Ensure the counter begins at 0
let count = 0

// Create a function for each button
counterDecreaseBtn.addEventListener("click", function(){
    count--
    counterResult.textContent = count
})
counterIncreaseBtn.addEventListener("click", function(){
    count++
    counterResult.textContent = count
})
counterResetBtn.addEventListener("click", function(){
    count = 0
    counterResult.textContent = count
})


// ---------------------------------- ANAGRAM SOLVER ---------------------------------- //  
// Description: Jumbles names of capital cities for the user to solve.

// Define the constants
const anagramSolverWordScrambled = document.getElementById("anagramSolverWordScrambled")
const anagramSolverInput = document.getElementById("anagramSolverInput")
const anagramSolverSubmitBtn = document.getElementById("anagramSolverSubmitBtn")
const anagramSolverResetBtn = document.getElementById("anagramSolverResetBtn")
const anagramSolverStartBtn = document.getElementById("anagramSolverStartBtn")
const anagramSolverFeedback = document.getElementById("anagramSolverFeedback")
const anagramSolverInstructions = document.getElementById("anagramSolverInstructions")
const anagramSolverNextBtn = document.getElementById("anagramSolverNextBtn")

let possibleCities = [
    "Washington", "London", "Paris", "Tokyo", "Beijing", "Berlin", "Rome"
    // "Moscow", "Ottawa", "Canberra", "Madrid", "Brasilia", "Seoul", "Bangkok", "Cairo", "Ankara", "Athens",
    // "Jakarta", "Tehran", "Riyadh", "Baghdad", "Hanoi", "Jerusalem", "Nairobi ", "Pretoria", "Lisbon"
]
let mentionedCities = []

let currentAnagramAnswer = ""
// function to loadAnagramSolver
function loadAnagramSolver(){
    // filter out the used names
    let remainingCities = possibleCities.filter(n => !mentionedCities.includes(n))

    if (remainingCities.length === 0){
        // console.log("Cities Remaining: ", remainingCities.length)
        // All questions used
        anagramSolverInput.style.display = "none"
        anagramSolverWordScrambled.style.display = "none"
        anagramSolverInstructions.style.display = "none"
        anagramSolverNextBtn.style.display = "none"
        anagramSolverFeedback.textContent = "Congratuations! You have solved all the Capital Cities."
        anagramSolverFeedback.style.display = "inline-block"
        anagramSolverResetBtn.style.display = "inline-block"
    }
    
    // pick a name from remainingCities
    const randomIndex = Math.floor(Math.random() * remainingCities.length)
    const currentCity = remainingCities[randomIndex]
    // add the currentCity to mentionedCities once used
    mentionedCities.push(currentCity)
    currentAnagramAnswer = currentCity // store original word globally for later use
    console.log(currentCity)

    const letters = currentCity.split("") // split into letters
    // create forloop for an index which chooses which letter to swap
    for(let i = currentCity.length - 1; i > 0; i--){
        // manually shuffle (have had problems with Fisher Yates)
        const j = Math.floor(Math.random() * (i + 1))
        let temporaryVariable = letters[i] // temp variable to hold one letter
        letters[i] = letters[j] // swap positions
        letters[j] = temporaryVariable // complete the swap
    }

    const scrambled = letters.join("")
    anagramSolverWordScrambled.textContent = scrambled
}

// click listener for START button
anagramSolverStartBtn.addEventListener("click", function(){
    loadAnagramSolver()
    anagramSolverStartBtn.style.display = "none"
    anagramSolverSubmitBtn.style.display = "inline-block"
    anagramSolverInstructions.style.display = "block"
    anagramSolverInput.style.display = "inline-block"
    anagramSolverInput.disabled = false

})

// click listener for SUBMIT button
anagramSolverSubmitBtn.addEventListener("click", function(){
    const userGuess = anagramSolverInput.value.toLowerCase().trim()
    const correctAnswer = currentAnagramAnswer.toLowerCase().trim()
    
    if (!/^[a-zA-Z]+$/.test(userGuess)){
        anagramSolverFeedback.textContent = `Invalid input. Letters only, try again.`
        anagramSolverFeedback.style.display = "inline-block"
        return // exit early if invalid input
    } else if(userGuess === correctAnswer){
        anagramSolverSubmitBtn.style.display = "none"
        anagramSolverFeedback.textContent = "Correct!"
        anagramSolverFeedback.style.display = "inline-block"
        anagramSolverNextBtn.style.display = "inline-block"
        anagramSolverInput.disabled = true
    } else{
        anagramSolverFeedback.textContent = "Incorrect. Try again."
        anagramSolverFeedback.style.display = "block"
    }
})

// click listener for NEXT button
anagramSolverNextBtn.addEventListener("click", function(){
    anagramSolverNextBtn.style.display = "none"
    loadAnagramSolver()
    anagramSolverFeedback.style.display = "none"
    anagramSolverSubmitBtn.style.display = "inline-block"
    anagramSolverInput.value = ""
    anagramSolverInput.style.display = "inline-block"
    anagramSolverInput.disabled = false
    // console.log("Mentioned Cities: ", mentionedCities)
})
// click listener for RESET button
anagramSolverResetBtn.addEventListener("click", function(){
    // clear the mentionedCities array
    mentionedCities.length = 0

    loadAnagramSolver()
    anagramSolverResetBtn.style.display = "none"
    anagramSolverStartBtn.style.display = "none"
    anagramSolverWordScrambled.style.display = "inline-block"
    anagramSolverSubmitBtn.style.display = "inline-block"
    anagramSolverInstructions.style.display = "block"
    anagramSolverInput.value = ""
    anagramSolverInput.style.display = "inline-block"
    anagramSolverInput.disabled = false
    anagramSolverFeedback.style.display = "none"
})


// ---------------------------------- TO DO LIST APP ---------------------------------- //  
// Description: Allows users to add, mark complete, and delete tasks.

const toDoUserInput = document.getElementById("toDoUserInput")
const addTaskBtn = document.getElementById("addTaskBtn")
const toDoTaskList = document.getElementById("toDoTaskList")

//event listener for "Add Task" button
addTaskBtn.addEventListener("click", function(){
    const newTask = toDoUserInput.value.trim()  //define the new task
    if(newTask === "") return               // cater for blank user input

    const li = document.createElement("li") // create <li>
    li.textContent = newTask                // update <li> to show "newTask"
    li.classList.add("toDoListItems")
    
    // "done" button
    const doneBtn = document.createElement("button")
    doneBtn.textContent ="done"
    doneBtn.classList.add("done-btn")
    doneBtn.addEventListener("click", function(){
        li.classList.toggle("done")             // use .classList.toggle("") to add/remove a class

        // alternate between "done" / "undo" for the button text
        if (li.classList.contains("done")){
            doneBtn.textContent ="undo"
        } else {
            doneBtn.textContent ="done"
        }
    })
    // "delete" button
    const deleteBtn = document.createElement("button")
    deleteBtn.textContent ="remove"
    deleteBtn.classList.add("remove-btn")
    deleteBtn.addEventListener("click", function(){
        li.remove()                             // use .remove() to remove an element
    })

    // add "edit" button
    const toDoEditBtn = document.createElement("button")
    toDoEditBtn.textContent = "edit"
    toDoEditBtn.classList.add("edit-btn")
    toDoEditBtn.addEventListener("click", function(){
        const currentText = li.firstChild.textContent // defining currentText

        const input = document.createElement("input") // create "input" element
        input.type = "text"
        input.value = currentText
        // input.classList.add("edit-input")

        // CONTEXT: Trying to create an optional "udpate" button in addition to "Enter" key:
        // const update = document.createElement("button")
        // update.textContent = "update"
        // update.classList.add("edit-btn")
        // update.style.display = "inline-block"
        // update.addEventListener("click", function(){
        //     const updatedText = input.value.trim()
        //         if (updatedText === "") return

        //         // rebuild the task item
        //         li.textContent = updatedText
        //         li.appendChild(doneBtn)
        //         li.appendChild(deleteBtn)
        //         li.appendChild(toDoEditBtn)
        // })

        li.textContent = ""    // clear everything from the <li>
        li.appendChild(input)  // then put the input into the <li>
        input.focus()          // wot ?

        input.addEventListener("keydown", function(e){
            if (e.key === "Enter") {
                const updatedText = input.value.trim()
                if (updatedText === "") return

                // rebuild the task item
                li.textContent = updatedText
                li.appendChild(doneBtn)
                li.appendChild(deleteBtn)
                li.appendChild(toDoEditBtn)
            }
        })
    })
    li.appendChild(doneBtn)                     // append the button to the <li>
    li.appendChild(deleteBtn)                   // append the button to the <li>
    li.appendChild(toDoEditBtn)                 // append the button to the <li>
        
    toDoTaskList.appendChild(li)                // append the <li> to the list of tasks
    toDoUserInput.value = ""                    // clear the input field when task is added
})

// add "keydown" listener to the input field
toDoUserInput.addEventListener("keydown", function(e){ // we check event.key(e) to see which key was pressed
    if (e.key === "Enter") { // if the event.key is Enter,
        addTaskBtn.click()   // do this. (make sure a "click" listener exists)
    }
})


// ---------------------------------- ROCK, PAPER, SCISSORS ---------------------------------- // 
// Description: Classic game where user plays against the computer.

const rockPaperScissorsStart = document.getElementById("rockPaperScissorsStart")
const rockOption = document.getElementById("rockOption")
const paperOption = document.getElementById("paperOption")
const scissorsOption = document.getElementById("scissorsOption")
const rockPaperScissorsGoBtn = document.getElementById("rockPaperScissorsGoBtn")
const rpsInstructions = document.getElementById("rpsInstructions")
const rpsFeedback = document.getElementById("rpsFeedback")
const rpsResetBtn = document.getElementById("rpsResetBtn")

rockPaperScissorsStart.addEventListener("click", function(){
    console.log("Start button has been clicked")
    rockPaperScissorsStart.style.display = "none"
    rockOption.style.display = "inline-block"
    paperOption.style.display = "inline-block"
    scissorsOption.style.display = "inline-block"
    rockPaperScissorsGoBtn.style.display = "inline-block"

    rpsInstructions.style.display = "none"
    rpsFeedback.style.display = "block"

})

document.querySelectorAll(".userOptions").forEach(option => {
    option.addEventListener("click", function(){
        const targetId = option.getAttribute("data-target")

        if (targetId === "rock"){
            rockOption.classList.add("buttonSelected")
            paperOption.classList.remove("buttonSelected")
            scissorsOption.classList.remove("buttonSelected")

        }
        if (targetId === "paper"){
            paperOption.classList.add("buttonSelected")
            scissorsOption.classList.remove("buttonSelected")
            rockOption.classList.remove("buttonSelected")
        }
        if (targetId === "scissors"){
            scissorsOption.classList.add("buttonSelected")
            rockOption.classList.remove("buttonSelected")
            paperOption.classList.remove("buttonSelected")
        }
    })
})

const rpsOptions = ["rock", "paper", "scissors"]

function loadRockPaperScissors(){
    const randomIndex = Math.floor(Math.random() * rpsOptions.length) // create a random index
    const computersChoice = rpsOptions[randomIndex] // choose randomly from the array
    
    // find the users choice ".buttonSelected"
    const selectedButton = document.querySelector(".buttonSelected")

    // if none is selected, return
    if(!selectedButton) return

    // read the data-target attribute, eg."rock"
    const userChoice = selectedButton.getAttribute("data-target")
    if(userChoice === computersChoice){
        // its a draw
        rpsFeedback.style.display = "inline-block"
        rpsFeedback.textContent = `It's a draw! Computer: ${computersChoice}, You: ${userChoice}`
    } else if (
        (userChoice === "rock" && computersChoice === "scissors") ||
        (userChoice === "paper" && computersChoice === "rock") ||
        (userChoice === "scissors" && computersChoice === "paper")
    ){
        // user wins
        rpsFeedback.style.display = "inline-block"
        rpsFeedback.textContent = `You win! Computer: ${computersChoice}, You: ${userChoice}`
    } else {
        // computer wins
        rpsFeedback.style.display = "inline-block"
        rpsFeedback.textContent = `You lose! Computer: ${computersChoice}, You: ${userChoice}`
    }

}

rockPaperScissorsGoBtn.addEventListener("click", function(){
    loadRockPaperScissors()
    rockOption.style.display = "none"
    paperOption.style.display = "none"
    scissorsOption.style.display = "none"
    rockPaperScissorsGoBtn.style.display = "none"
    rpsResetBtn.style.display = "inline-block"
    rpsInstructions.style.display = "none"
})

rpsResetBtn.addEventListener("click", function(){
    rpsResetBtn.style.display = "none"
    rockOption.style.display = "inline-block"
    paperOption.style.display = "inline-block"
    scissorsOption.style.display = "inline-block"
    rockPaperScissorsGoBtn.style.display = "inline-block"

    rpsInstructions.textContent = "Choose: Rock, Paper or Scissors and hit GO when you're ready!"
    rpsInstructions.style.display = "block"
    rpsFeedback.style.display = "none"

    rockOption.classList.remove("buttonSelected")
    paperOption.classList.remove("buttonSelected")
    scissorsOption.classList.remove("buttonSelected")
})


// ---------------------------------- QUIZ GAME ---------------------------------- //
// Description: Multiple-choice questions with score tracking.

const quizGameStartBtn = document.getElementById("quizGameStartBtn")
const quizGameFeedback1 = document.getElementById("quizGameFeedback1")
const quizGameFeedback2 = document.getElementById("quizGameFeedback2")
const quizGameInstructions = document.getElementById("quizGameInstructions")
const optionA = document.getElementById("optionA")
const optionB = document.getElementById("optionB")
const optionC = document.getElementById("optionC")
const quizGameCenterWrap = document.getElementById("quizGameCenterWrap")
const quizGameNextBtn = document.getElementById("quizGameNextBtn")
//  questionBank
let questionBank = [
    {
        question: "What's my name?",
        options: ["Mike", "Bob", "Ted"],
        answer: "Mike"
    },
    {
        question: "Which is the fruit?",
        options: ["Potato", "Banana", "Chicken"],
        answer: "Banana"
    }, 
    {
        question: "According to astronauts, what does outer space smell like?",
        options: ["Fresh Grass", "Vanilla", "Burnt Steak"],
        answer: "Burnt Steak"
    },
    {
        question: "How many brains does an octopus have?",
        options: ["1", "3", "9"],
        answer: "9"
    },
    {
        question: "What's the longest time a chicken has survived without a head?",
        options: ["9 hours", "6 weeks", "18 months"],
        answer: "18 months"
    },
    {
        question: "How long did the oldest dog survive?",
        options: ["29.5 years", "16 years", "22.5 years"],
        answer: "29.5 years"
    }
]
// an array for used questions
let quizGameUsedQuestions = []
// make currentAnswer accessible outside the function
let quizGameCurrentAnswer = ""

// choose a random question, display it
function loadQuizGameQuestion(){
    // filter out the used questions
    let remainingQuestions = questionBank.filter(q => !quizGameUsedQuestions.includes(q))

    if (remainingQuestions.length === 0) {
        // All questions used
        quizGameFeedback2.textContent = "You have completed the quiz!"
        quizGameFeedback1.textContent = ""
        quizGameFeedback1.style.display = "none"
        quizGameCenterWrap.style.display = "none"
        quizGameFeedback2.style.display = "inline-block"
        return
    }

    // pick a question from the remaining bank
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length)
    const quizGameCurrentQuestion = remainingQuestions[randomIndex]
    // add the selected question to the used array
    quizGameUsedQuestions.push(quizGameCurrentQuestion)
    quizGameCurrentAnswer = quizGameCurrentQuestion.answer
    
    // console.log("Question:", quizGameCurrentQuestion.question)
    // console.log("Answer:", quizGameCurrentQuestion.answer)
    quizGameFeedback1.textContent = quizGameCurrentQuestion.question
    quizGameFeedback1.style.display = "inline-block"

    // update the button text
    optionA.textContent = quizGameCurrentQuestion.options[0]
    optionB.textContent = quizGameCurrentQuestion.options[1]
    optionC.textContent = quizGameCurrentQuestion.options[2]
}

//  START button click
quizGameStartBtn.addEventListener("click", function(){
    quizGameStartBtn.style.display = "none"
    quizGameInstructions.style.display = "none"
    loadQuizGameQuestion()
    quizGameCenterWrap.style.display = "flex"
})

// function to handle comparison logic
function quizGameHandleOptionsClick(userGuess){
    if (userGuess === quizGameCurrentAnswer){
        quizGameFeedback2.textContent = "✅Correct!"
    } else {
        quizGameFeedback2.textContent = "❌Incorrect! Unlucky..."
    }
    quizGameFeedback2.style.display = "inline-block"
    quizGameNextBtn.style.display = "inline-block"
}

const quizGameOptions = document.querySelectorAll(".quizGameOptions")

// single listener for all buttons
quizGameOptions.forEach(option => {
    option.addEventListener("click", () => {
        // call the click handler
        quizGameHandleOptionsClick(option.textContent)

        // disable other options
        quizGameOptions.forEach(otherOption => {
            if (otherOption !== option){
                otherOption.disabled = true
            }
        })
    })
})
// click listeners for all option buttons
// optionA.addEventListener("click", () => quizGameHandleOptionsClick(optionA.textContent))
// optionB.addEventListener("click", () => quizGameHandleOptionsClick(optionB.textContent))
// optionC.addEventListener("click", () => quizGameHandleOptionsClick(optionC.textContent))

// liste for "NEXT", should start a new round
quizGameNextBtn.addEventListener("click", function(){
    quizGameNextBtn.style.display = "none"
    quizGameFeedback2.style.display = "none"
    quizGameOptions.forEach(option => {
        option.disabled = false
    })
    loadQuizGameQuestion()
})


// ---------------------------------- MEMORY CARD GAME ---------------------------------- //
// Description: Match pairs of cards to clear the board.

const cardContainer = document.getElementById("cardContainer")
const memoryCardGameResetBtn = document.getElementById("memoryCardGameResetBtn")
const memoryCardGameFeedback = document.getElementById("memoryCardGameFeedback") 
const memoryCardGameInstructions = document.getElementById("memoryCardGameInstructions")

const memoryCardStartBtn = document.getElementById("memoryCardStartBtn")
let memoryCardGamePossibleIcons = ["🍌", "🍌", "🍟", "🍟", "🎈", "🎈", "🧦", "🧦", "🏀", "🏀", "🗝️", "🗝️", "🛹", "🛹", "🚀", "🚀",
                                   "💕", "💕", "👵", "👵", "🎨", "🎨", "🍨", "🍨", "🕗", "🕗", "🚹", "🚹", "🍔", "🍔", "😒", "😒",
                                   "🏍️", "🏍️", "🚅", "🚅", "🌉", "🌉", "💙", "💙", "☣️", "☣️", "❤️‍🩹", "❤️‍🩹", "💤", "💤", "☯️", "☯️",
                                   "♻️", "♻️", "🍿", "🍿", "🥓", "🥓", "🥩", "🥩", "🍣", "🍣", "🧁", "🧁", "🍫", "🍫", "🍉", "🍉"]
let memoryCardGameUsedIcons = []
// variables to store 1st and 2nd choices
let memoryGameFirstCard = ""
let memoryGameSecondCard = ""
let lockBoard = true

// function to shuffle the board
function memoryCardShuffle(){
    // console.log("Shuffle Runs")
    // clone the original array
    const iconsCopy = [...memoryCardGamePossibleIcons]
    // clear used icon from previous round
    memoryCardGameUsedIcons.length = 0
    //  loop 16 times to pick all icons
    for(let i = 0; i < 64; i++){
        // pick a random index from the possible icons
        const randomIndex = Math.floor(Math.random() * iconsCopy.length)
        // remove that icon from the possible list and save it
        const chosenIcon = iconsCopy.splice(randomIndex, 1)[0]
        // push it to the used array
        memoryCardGameUsedIcons.push(chosenIcon)
    }
}
// function to assign the shuffled icons
function memoryCardAssignIcons(){
    // console.log("Assign Function runs")
    const cards = document.querySelectorAll(".memoryCard") // grab all 16 cards

    for (let i = 0; i < cards.length; i++){
        cards[i].dataset.icon = memoryCardGameUsedIcons[i] // hide card using data-icon attribute
    }
}

memoryCardStartBtn.addEventListener("click", function(){
    memoryCardGameInstructions.style.display = "none"
    cardContainer.style.display = "grid"
    memoryCardStartBtn.style.display = "none"
    memoryCardShuffle()
    // console.log(memoryCardGameUsedIcons)
    memoryCardAssignIcons()
    lockBoard = false
})

memoryCardGameResetBtn.addEventListener("click", function(){
    lockBoard = true
    memoryCardGameResetBtn.style.display = "none"
    memoryCardGameFeedback.style.display = "none"
    memoryCardGameUsedIcons.length = 0

    const cards = document.querySelectorAll(".memoryCard")
    cards.forEach(card => {
        card.classList.remove("memoryCardCompleteState")
        card.textContent = ""
    })
    memoryCardShuffle()
    memoryCardAssignIcons()
    resetTurn()
})

// click listener forEach card
const memoryCard = document.querySelectorAll(".memoryCard")
memoryCard.forEach(card =>{
    card.addEventListener("click", () =>{
        // use lockBoard to ignore too many clicks
        if(lockBoard === true) return
        // ignore if already revealed
        if(card.textContent) return
        // prevent a rare double click
        if(card === memoryGameFirstCard) return
        // assign the first click
        if(memoryGameFirstCard === ""){
            memoryGameFirstCard = card
            card.textContent = card.dataset.icon
            console.log("First card: ", memoryGameFirstCard.dataset.icon)
        } else {
            memoryGameSecondCard = card
            card.textContent = card.dataset.icon
            console.log("Second card: ", memoryGameSecondCard.dataset.icon)
            // lock the board while it compares
            lockBoard = true
            // compare
            if(memoryGameFirstCard.dataset.icon === memoryGameSecondCard.dataset.icon){
                // make green if complete
                memoryGameFirstCard.classList.add("memoryCardCompleteState")
                memoryGameFirstCard.classList.remove("memoryCard:hover")
                memoryGameSecondCard.classList.add("memoryCardCompleteState")
                memoryGameSecondCard.classList.remove("memoryCard:hover")
                // its a match, leave them revealed
                memoryCardGameAreAllCardsRevealed()
                // if all cards are revealed, stop the game
                if(memoryCardGameAreAllCardsRevealed()){
                    // true, all cards are revealed
                    lockBoard = true
                    memoryCardGameResetBtn.style.display = "inline-block"
                    memoryCardGameFeedback.textContent = "Amazing, you've completed the board!"
                    memoryCardGameFeedback.classList.add("completeStateFeedback")
                    memoryCardGameFeedback.style.display = "inline-block"
                    return
                } else {
                    // false, game must continue
                    resetTurn()
                }
                
            } else {
                // not a match, hide tile after short delay
                setTimeout(() => {
                    memoryGameFirstCard.textContent = ""
                    memoryGameSecondCard.textContent = ""
                    resetTurn()
                }, 1000)
            }
        }

    })
})

// function to reset 1st and 2nd cards
function resetTurn() {
    memoryGameFirstCard = ""
    memoryGameSecondCard = ""
    lockBoard = false
}

// function to check if every card's "textContent" is set
function memoryCardGameAreAllCardsRevealed() {
    const cards = document.querySelectorAll(".memoryCard")
    return [...cards].every(card => card.textContent !== "")
}

// simulate end game state for testing
document.addEventListener("keydown", (r) => {
    if (r.key === "R" && r.shiftKey){
        console.log("R key pressed and detected")
        simulateEndGame()
    }
})
function simulateEndGame(){
    //programatically mark all cards as matched
    const cards = document.querySelectorAll(".memoryCard") // first select all cards
    cards.forEach(card => {
        card.classList.add("memoryCardCompleteState")
        card.textContent = card.dataset.icon
    })

    lockBoard = true
    memoryCardGameResetBtn.style.display = "inline-block"
    memoryCardGameFeedback.textContent = "Amazing, you've completed the board!"
    memoryCardGameFeedback.classList.add("completeStateFeedback")
    memoryCardGameFeedback.style.display = "inline-block"
}

// ---------------------------------- WHACK-A-MOLE GAME ---------------------------------- //
// Description: Click moles appearing randomly before time runs out.

const wamInstructions = document.getElementById("wamInstructions")
const wamGridContainer = document.getElementById("wamGridContainer")
const wamReadyBtn = document.getElementById("wamReadyBtn")
const wamStartBtn = document.getElementById("wamStartBtn")
const wamStartBtn2 = document.getElementById("wamStartBtn2")
const wamScoreHolder = document.getElementById("wamScoreHolder")
const wamStopBtn = document.getElementById("wamStopBtn")

wamScore = 0
gameStarted = false
let wamInterval
let wamTimeout
// READY btn listener
wamReadyBtn.addEventListener("click", function(){
    wamReadyBtn.style.display = "none"
    wamScoreHolder.style.display = "inline-block"
    wamGridContainer.style.display = "grid"
    wamInstructions.style.display = "none"
    wamStartBtn.style.display = "inline-block"
})

// START btn listener
wamStartBtn.addEventListener("click", function(){
    wamStartBtn.style.display = "none"
    wamStopBtn.style.display = "inline-block"
    gameStarted = true
    const blocks = document.querySelectorAll(".wamBlocks")
    blocks.forEach(block =>{
        block.classList.add("wamPlaying")
    })
    assignMole()
})

// START(2) btn listener
wamStartBtn2.addEventListener("click", function(){
    wamStartBtn2.style.display = "none"
    wamStopBtn.style.display = "inline-block"
    gameStarted = true
    const blocks = document.querySelectorAll(".wamBlocks")
    blocks.forEach(block =>{
        block.classList.add("wamPlaying")
    })
    assignMole()
})
// STOP btn listener
wamStopBtn.addEventListener("click", function(){
    clearTimeout(wamTimeout)
    clearInterval(wamInterval)
    gameStarted = false
    const blocks = document.querySelectorAll(".wamBlocks")
    blocks.forEach(block => {
        block.textContent = ""
        block.classList.remove("wamPlaying")
    })
    wamStopBtn.style.display = "none"
    wamStartBtn2.style.display = "inline-block"
})

// function to randomly assign Mole
function assignMole(){
    // 1. retreive all blocks
    const blocks = document.querySelectorAll(".wamBlocks")
    // 2. clear all textContent within an Interval
    wamInterval = setInterval(() => {
        blocks.forEach(block => {
            block.textContent = ""
            block.classList.remove("wamCorrect")
            block.classList.remove("wamIncorrect")
            block.classList.remove("currentMole")
        })
        // 3. set a timeout for delay, randomly assign the Mole
        wamTimout = setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * blocks.length)
            const activeBlock = blocks[randomIndex]
            activeBlock.textContent = "🐽"
            activeBlock.classList.add("currentMole")
        }, 350)
    }, 1200)
}

// blocks listener to handle in game clicks
const blocks = document.querySelectorAll(".wamBlocks")
blocks.forEach(block => {
    block.addEventListener("click", function(){
        if (gameStarted === false){
            return
        } else if(block.classList.contains("currentMole")){
            block.classList.add("wamCorrect")
            wamScore++
            block.textContent = ""
        } else {
            block.classList.add("wamIncorrect")
        }
        document.getElementById("wamScoreHolder").textContent = "Score: " + wamScore
    })
})

// ---------------------------------- Typing Speed Test ---------------------------------- //
// Description: Measures user’s typing speed.

const tstSentenceDisplay = document.getElementById("tstSentenceDisplay")
const tstInput = document.getElementById("tstInput")
const tstResult = document.getElementById("tstResult")
const tstResetBtn = document.getElementById("tstResetBtn")

let tstCurrentSentence
let tstTimer = 0
let tstInterval
tstTimerStarted = false
let tstSentenceBank = ["The cat jumped onto the windowsill, stretched lazily, then watched the birds outside flutter around as the morning sun warmed its fur through the dusty glass pane.",
                       "After packing his bag with sandwiches and water, she set off along the trail, hoping to reach the top before sunset painted the hills in orange and gold.",
                       "The old radio crackled to life, playing a tune that reminded her of quiet evenings spent curled up with a good book and a cup of warm tea.",
                       "He forgot his umbrella again, and when the skies suddenly opened, he sprinted toward the cafe, dripping wet but laughing as thunder rolled in the distance.",
                       "With careful steps, the child balanced on the edge of the fountain, arms outstretched like wings, pretending to soar above the city square filled with music and chatter.",
                       "The baker woke before dawn, kneaded dough with sleepy hands, and placed fresh loaves in the oven, filling the street with the comforting smell of bread.",
                       "They found the old map tucked behind a dusty shelf, marked with faded ink and curious symbols, hinting at an adventure that had long been forgotten."]
                  
// function to randomly select a sentence
function tstSentenceSelector(){
    const randomIndex = Math.floor(Math.random() * tstSentenceBank.length)
    tstCurrentSentence = tstSentenceBank[randomIndex]
    tstSentenceDisplay.textContent = tstCurrentSentence
}
tstSentenceSelector()

// listner for userInput
tstInput.addEventListener("keydown", function(){
    if(!tstTimerStarted){
        tstTimerStarted = true
        tstInterval = setInterval(() => {
            tstTimer++
            console.log(tstTimer)
        }, 1000)
    }
})

// listener for userInput to compare userInput to currentSentence
tstInput.addEventListener("input", function(){
    if(tstInput.value.trim().toLowerCase() === tstCurrentSentence.trim().toLowerCase()){
        clearInterval(tstInterval)
        // Word Per Minute logic
        let tstWordCount = tstCurrentSentence.split(" ").length
        let tstTimeInMinutes = tstTimer / 60
        let tstWPM = tstWordCount / tstTimeInMinutes
        let tstRoundedWPM = Math.floor(tstWPM)
        
        tstResult.textContent = `You finished in ${tstTimer} seconds`
        tstResult.style.display = "inline-block"
        tstResult.textContent += `(${tstRoundedWPM} WPM)`
    }
})

// listener for RESET button
tstResetBtn.addEventListener("click", function(){
    tstTimerStarted = false
    tstTimer = 0
    clearInterval(tstInterval)
    tstResult.textContent = ""
    tstResult.style.display = "none"
    tstInput.value = ""
    const randomIndex = Math.floor(Math.random() * tstSentenceBank.length)
    tstCurrentSentence = tstSentenceBank[randomIndex]
    tstSentenceDisplay.textContent = tstCurrentSentence
    // console.log(tstTimer)
})

// ---------------------------------- Reaction Speed ---------------------------------- //
// Description: Tests how fast user reacts to visual stimuli.

const reactionSpeedClickBox = document.getElementById("reactionSpeedClickBox")
const reactionSpeedFeedback = document.getElementById("reactionSpeedFeedback")
const reactionSpeedInstructions = document.getElementById("reactionSpeedInstructions")
const reacionSpeedBeginBtn = document.getElementById("reacionSpeedBeginBtn")

reacionSpeedBeginBtn.addEventListener("click", function(){
    reacionSpeedBeginBtn.style.display = "none"
    reactionSpeedInstructions.style.display = "none"
    reactionSpeedClickBox.style.display = "flex"
})
//set original game state
let reactionSpeedGameState = "reactionSpeedWaiting"
reactionSpeedClickBox.classList.add("reactionSpeedWaiting")

//  CLICK BOX click listener 
reactionSpeedClickBox.addEventListener("click", function(){
    let reactionSpeedRandomDelay = Math.floor(Math.random() * 6000) + 1000
    // waiting phase
    if (reactionSpeedGameState === "reactionSpeedWaiting"){
        reactionSpeedFeedback.textContent = "Get Ready..."
        reactionSpeedClickBox.classList.remove("reactionSpeedWaiting")
        reactionSpeedClickBox.classList.add("reactionSpeedReady")
        reactionSpeedGameState = "reactionSpeedReady"

        // begin timeout
        reactionSpeedTimeout = setTimeout(function(){
            reactionSpeedFeedback.textContent = "Click!"
            reactionSpeedClickBox.classList.remove("reactionSpeedReady")
            reactionSpeedClickBox.classList.add("reactionSpeedNow")
            reactionSpeedGameState = "reactionSpeedNow"
            // store start time
            reactionSpeedStartTime = Date.now()
        }, reactionSpeedRandomDelay)
        console.log("Delay: " + reactionSpeedRandomDelay)
        // handle "now" phase  
        } 
        else if(reactionSpeedGameState === "reactionSpeedNow"){
            // store end time
            reactionSpeedFinishTime = Date.now()
            // set timeout to display result, then reset
            let reactionSpeedResult = (reactionSpeedFinishTime - reactionSpeedStartTime)
            let reactionSpeedResultInSeconds = (reactionSpeedResult / 1000)
            reactionSpeedFeedback.textContent = `${reactionSpeedResultInSeconds}s`
            // reset the game after 3 seconds
            reactionSpeedEndTimeout = setTimeout(function(){
                reactionSpeedFeedback.textContent = "Click to start."
                reactionSpeedClickBox.classList.remove("reactionSpeedNow")
                reactionSpeedClickBox.classList.add("reactionSpeedWaiting")
                reactionSpeedGameState = "reactionSpeedWaiting"
            }, 3000)
        }
        // handle premature click 
        else if(reactionSpeedGameState === "reactionSpeedReady"){
            clearTimeout(reactionSpeedTimeout)
            reactionSpeedFeedback.textContent = "Too soon!"
            reactionSpeedClickBox.classList.remove(
                "reactionSpeedReady", 
                "reactionSpeedWaiting"
            )
            reactionSpeedClickBox.classList.add("reactionSpeedTooSoon")
            reactionSpeedGameState = "reactionSpeedTooSoon"
            // end game timeout
            reactionSpeedTooSoonTimeout = setTimeout(function(){
            reactionSpeedFeedback.textContent = "Click to start."
            reactionSpeedClickBox.classList.remove("reactionSpeedTooSoon")
            reactionSpeedClickBox.classList.add("reactionSpeedWaiting")
            reactionSpeedGameState = "reactionSpeedWaiting"
        }, 1500)
    }
})

// ---------------------------------- MOVING TARGET ---------------------------------- //
// Description: User clicks a moving target to score points.

const mtInstructions = document.getElementById("mtInstructions")
const mtStartBtn = document.getElementById("mtStartBtn")
const mtGameArea = document.getElementById("mtGameArea")
const mtTarget = document.getElementById("mtTarget")
const mtBeginBtn = document.getElementById("mtBeginBtn")
const mtScoreHolder = document.getElementById("mtScoreHolder")
const mtEndGameResult = document.getElementById("mtEndGameResult")
const mtResetBtn = document.getElementById("mtResetBtn")

let mtCurrentScore = 0

// initial target position
let mtMaxX = 650
let mtMaxY = 300
let mtRandomX = Math.floor(Math.random() * mtMaxX)
let mtRandomY = Math.floor(Math.random() * mtMaxY)
mtTarget.style.left = mtRandomX + "px"
mtTarget.style.top = mtRandomY + "px"

// START BUTTON
mtStartBtn.addEventListener("click", function(){
    mtStartBtn.style.display = "none"
    mtInstructions.style.display = "none"
    mtGameArea.style.display = "flex"
    mtBeginBtn.style.display = "inline-block"
    mtScoreHolder.style.display = "flex"
})

// Counter Limit for 10 rounds
let mtRoundCount = 0

// BEGIN BUTTON
mtBeginBtn.addEventListener("click", function(){
    mtBeginBtn.style.display = "none"

    // Moving target logic
    mtInterval = setInterval(function(){
        let mtMaxX = 650
        let mtMaxY = 300
        let mtRandomX = Math.floor(Math.random() * mtMaxX)
        let mtRandomY = Math.floor(Math.random() * mtMaxY)
        mtTarget.style.left = mtRandomX + "px"
        mtTarget.style.top = mtRandomY + "px"
        mtTarget.style.display = "inline-block"
        mtTarget.classList.add("mtReady")
        mtTarget.classList.remove("mtMiss")

        // disappear before changing position
        mtTimeout = setTimeout(function(){
            mtTarget.style.display = "none"
            mtTarget.classList.remove("mtReady")
            // Limit the game to 10 targets
            function mtLimitRounds(){
                if(mtRoundCount >= 9){
                    clearInterval(mtInterval)
                    clearTimeout(mtTimeout)
                    mtScoreHolder.style.display = "none"
                    mtEndGameResult.style.display = "inline-block"
                    mtEndGameResult.innerHTML = `Game Over<br>Score: ${mtCurrentScore}`
                    mtEndGameTimeout = setTimeout(function(){
                        mtTarget.style.display = "none"
                    }, 300)
                    mtResetBtn.style.display = "inline-block"
                    return true
                }
                mtRoundCount++
                console.log(mtRoundCount)
                return false
            }
            if(mtLimitRounds()) return // call and check
        }, 500)
    }, 2500)
})

// CLICK handling
mtGameArea.addEventListener("click", function(e){
    if(e.target === mtGameArea && mtTarget.classList.contains("mtReady")){
        mtTarget.classList.remove("mtReady")
        mtTarget.classList.add("mtMiss")
    } else if(e.target === mtTarget){
        mtTarget.classList.remove("mtReady")
        mtTarget.classList.add("mtHit")
        mtCurrentScore += 3
        mtScoreHolder.textContent = `Score: ${mtCurrentScore}`
    }
})

// RESET BUTTON
mtResetBtn.addEventListener("click", function(){
    mtResetBtn.style.display = "none"
    mtEndGameResult.style.display = "none"
    mtEndGameResult.textContent = ""
    mtBeginBtn.style.display = "inline-block"
    mtRoundCount = 0
    mtCurrentScore = 0
    mtScoreHolder.textContent = "Score: 0"
    mtScoreHolder.style.display = "flex"
})

// What about: Unlimited rounds, if "friendly" is hit, game over