//calls for the game and manufacturer 
const gameList = document.querySelector(".game-list")

//calls for image, title and high score 
const gameImage = document.querySelector("img#detail-image")
const gameTitle = document.querySelector("h2#detail-title")
const gameHighScore = document.querySelector("span#detail-high-score")

//calls for html elements to create a high score form
const gameScoreForm = document.querySelector("#high-score-form")
const gameScoreInput = document.querySelector("#score-input")


//allows function to call on what is only being clicked on at the time
let currentGame 


//call to server
fetch("http://localhost:3000/games")
.then(response => response.json())
.then(pbData => {
    pbData.forEach(game => makeGameList(game))

    displayGame(pbData[0])
    
    addHighScore()
})

//adds gamers to page
//make sure to add function to the fetch
function makeGameList(game) {
    const displayPlayerElement = document.createElement("h5")
    displayPlayerElement.textContent = `${game.name} (${game.manufacturer_name})`
    gameList.append(displayPlayerElement)

    displayPlayerElement.addEventListener("click", () => displayGame(game))
}

//adds image, title and high score of game that we added 
//click event listener for in the last step
//make sure to add function to the fetch
function displayGame(game){
    currentGame = game 

    gameImage.src = currentGame.image 
    gameTitle.textContent = currentGame.name 
    gameHighScore.textContent = currentGame.high_score

}

//adds SUBMIT EVENT  and will persist through refresh

function addHighScore() {
    gameScoreForm.addEventListener("submit", (event) => {
        event.preventDefault()

        currentGame.high_score = gameScoreInput.value 
        displayGame(currentGame)

        gameScoreForm.reset()
    })
}