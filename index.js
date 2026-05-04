console.log("Welcome to Tic Tac Toe")

// Sounds
let music = new Audio("")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")

// Game state
let turn = "X"
let isgameover = false

// Change turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X"
}

// Check win
const checkWin = () => {
  let boxtest = document.getElementsByClassName("boxtest")

  let wins = [
    [0, 1, 2, "translate(0, 5vw) rotate(0deg)", "30vw"],
    [3, 4, 5, "translate(0, 15vw) rotate(0deg)", "30vw"],
    [6, 7, 8, "translate(0, 25vw) rotate(0deg)", "30vw"],
    [0, 3, 6, "translate(5vw, 0) rotate(90deg)", "30vw"],
    [1, 4, 7, "translate(15vw, 0) rotate(90deg)", "30vw"],
    [2, 5, 8, "translate(25vw, 0) rotate(90deg)", "30vw"],
    [0, 4, 8, "translate(0, 0) rotate(45deg)", "42.5vw"],
    [2, 4, 6, "translate(30vw, 0) rotate(135deg)", "42.5vw"],
  ]

  wins.forEach(e => {
    if (isgameover) return

    let a = boxtest[e[0]]
    let b = boxtest[e[1]]
    let c = boxtest[e[2]]

    if (!a || !b || !c) return

    if (
      a.innerText !== "" &&
      a.innerText === b.innerText &&
      b.innerText === c.innerText
    ) {
      document.getElementsByClassName("info")[0].innerText =
        a.innerText + " Won!"

      isgameover = true
      gameover.play()

      // Show GIF safely
      let img = document.querySelector(".imgbox img")
      if (img) {
        img.style.width = "180px"
      }

      let line = document.querySelector(".line")
      if (line) {
        line.style.transform = e[3]
        line.style.width = e[4]
      }
    }
  })
}

// Game logic
let boxes = document.getElementsByClassName("box")

Array.from(boxes).forEach(element => {
  let boxtest = element.querySelector(".boxtest")

  if (!boxtest) return

  element.addEventListener("click", () => {
    if (boxtest.innerText === "" && !isgameover) {
      boxtest.innerText = turn
      audioTurn.play()

      checkWin()

      if (!isgameover) {
        turn = changeTurn()
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn
      }
    }
  })
})

// Reset button
let reset = document.getElementById("reset")
if (reset) {
  reset.addEventListener("click", () => {
    let boxtest = document.getElementsByClassName("boxtest")
    Array.from(boxtest).forEach(e => {
      e.innerText = ""
    })

    turn = "X"
    isgameover = false
    document.getElementsByClassName("info")[0].innerText =
      "Turn for X"

    let img = document.querySelector(".imgbox img")
    if (img) {
      img.style.width = "0px"
    }

    let line = document.querySelector(".line")
    if (line) {
      line.style.width = "0"
      line.style.transform = "translate(0, 0) rotate(0deg)"
    }
  })
}
