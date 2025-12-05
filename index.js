const boxes = document.querySelectorAll(".box")
const resetBtn = document.querySelector("#reset-btn")
const newGameBtn = document.querySelector("#new-btn")
const msgContainer = document.querySelector(".msg-container")
const msg = document.querySelector("#msg")

let turnO = true //player X, player O
let count = 0 // TO track draw

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5], 
    [6, 7, 8]
]

const resetGame = () => {
    turnO = true
    count = 0
    enableBoxes()
    msgContainer.classList.add("hide")
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            // player O
            box.innerText = "O"
            turnO = false
        } else {
            // player X
            box.innerText = "X"
            turnO = true
        }
        box.disabled = true
        count++

        let isWinner = checkWinner()

        if(count === 9 && !isWinner) {
            gameDraw()
        }
    })
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`
    msgContainer.classList.remove("hide")
    disabledBoxes()
}

const disabledBoxes = () => {
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].disabled = true
    }
}

const enableBoxes = () => {
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].disabled = false
        boxes[i].innerText = ""
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`
    msgContainer.classList.remove("hide")
    disabledBoxes()
}

const checkWinner = () => {
    for(let i = 0; i < winningPatterns.length; i++) {
        let pattern = winningPatterns[i]
        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3val = boxes[pattern[2]].innerText

        if(pos1Val !== "" && pos2Val !== "" && pos3val !== "") {
            if(pos1Val === pos2Val && pos2Val === pos3val) {
                showWinner(pos1Val)
                return true
            }
        }
    }
    return false
}

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)
