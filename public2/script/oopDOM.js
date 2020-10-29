class Player {
    constructor(name) {
        this.name = name
    }
    getName = () => {
        return this.name
    }
}

class PlayerHuman extends Player {
    constructor() {
        super()
    }

    playerChoice = (choice) => {
        console.log(game.startResult)
        if (game.startResult === null) {
            const playerChoice = choice.classList[1]
            const computerChoice = comp.getComputerChoice()
            game.getResult(playerChoice, computerChoice)
            choice.style.backgroundColor = '#d8d8d8'
            choice.style.padding = '5px'
            game.reset = choice

            game.turning()

            setTimeout(() => {
                switch(computerChoice) {
                    case 'rock':
                        game.compRock.classList.add('mix')
                        game.changeComputerValue = 'rock'
                        break
                    case 'paper':
                        game.compPaper.classList.add('mix')
                        game.changeComputerValue = 'paper'
                        break
                    default:
                        game.compScis.classList.add('mix')
                        game.changeComputerValue = 'scissor'
                }
                game.endResult(game.startResult)
            }, 1200);
        } else if (game.startResult) {
            alert('Tekan Refresh dulu !!')
        }
    }
}


class Comp extends Player {
    constructor() {
        super()
    }

    getComputerChoice = () => {
        const computer = Math.random()
    
        if (computer < 0.34) return 'rock'
        if (computer >= 0.34 && computer < 0.67) return 'scissor'
        return 'paper'
    }
}

class Game {
    constructor(player, comp) {
        this.player = player
        this.comp = comp
        this.startResult = null
        this.reset = ''
        this.changeComputerValue = ''

    this.resultDisplay = document.getElementById('gameResult')
    this.computerChoice = document.querySelectorAll('.computer')
    this.compRock = document.querySelector('.compRock')
    this.compPaper = document.querySelector('.compPaper')
    this.compScis = document.querySelector('.compScissor')
    }

    setStartResult = (result) => this.startResult = result

    getResult = (player, computer) => {
        if (player === computer) this.startResult = 'DRAW';
        else if (player === 'rock' && computer === 'scissor') this.startResult = 'WINNER' 
        else if (player === 'rock' && computer === 'paper') this.startResult = 'LOSER' 
        else if (player === 'paper' && computer === 'rock') this.startResult = 'WINNER'
        else if (player === 'paper' && computer === 'scissor') this.startResult = 'LOSER' 
        else if (player === 'scissor' && computer === 'paper') this.startResult = 'WINNER'
        else if (player === 'scissor' && computer === 'rock') this.startResult = 'LOSER' 

    }

    turning = () => {
        const start = new Date().getTime();
        let i = 0
    
        setInterval(() => {
            if (new Date().getTime() - start >= 1000) {
                clearInterval
                return
            }
            this.computerChoice[i++].classList.add('mix')
            if (i == this.computerChoice.length) {
                i = 0
            }
        }, 50)
        setTimeout(() => {
            setInterval(() => {
                if (new Date().getTime() - start >= 1200) {
                    clearInterval
                    return
                }
                this.computerChoice[i++].classList.remove('mix')
                if (i == this.computerChoice.length) {
                    i = 0
                }
            }, 50);
        }, 50)
    }

    endResult = (result) => {
        switch(result) {
            case 'DRAW':
                this.resultDisplay.innerHTML = 'DRAW';
                this.resultDisplay.style.color = 'white'
                this.resultDisplay.style.fontSize = '150%'
                this.resultDisplay.style.backgroundColor = '#1A6932'
                this.resultDisplay.style.padding = '10%'
                break
            case 'WINNER':
                this.resultDisplay.innerHTML = 'PLAYER WIN';
                this.resultDisplay.style.color = 'white'
                this.resultDisplay.style.fontSize = '120%'
                this.resultDisplay.style.backgroundColor = '#4c9653'
                this.resultDisplay.style.padding = '10%'
                break
            case 'LOSER':
                this.resultDisplay.innerHTML = 'COM WIN';
                this.resultDisplay.style.color = 'white'
                this.resultDisplay.style.fontSize = '150%'
                this.resultDisplay.style.backgroundColor = '#4c9653'
                this.resultDisplay.style.padding = '10%'
                break
            default:
                this.resultDisplay.innerHTML = 'VS';
                this.resultDisplay.style.backgroundColor = '#9b835f'
                this.resultDisplay.style.fontSize = '40pt'
                this.resultDisplay.style.color = 'red'
                this.resultDisplay.style.fontWeight = 'bolder'
        }
    }

    refresh = () => {
        this.reset.style.backgroundColor = '#9b835f'
        this.reset.style.padding = '0px'
        const startResult = null
        if (this.changeComputerValue == 'rock') {
            this.compRock.classList.remove('mix')
        } else if (this.changeComputerValue == 'paper') {
            this.compPaper.classList.remove('mix')
        } else {
            this.compScis.classList.remove('mix')
        }

        this.setStartResult(startResult)
        this.endResult(startResult)
    }

}

const player = new PlayerHuman('jhon')
const comp = new Comp('computer')
const game = new Game(player,comp)

const playerChoice = document.querySelectorAll('.player')
playerChoice.forEach((choice) => {
    choice.addEventListener('click', () => {
        player.playerChoice(choice)
    })
})

this.refresh = document.querySelector('.refresh')
refresh.addEventListener('click', () => {
    game.refresh()
})