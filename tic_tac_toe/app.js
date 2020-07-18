class Player {
    constructor(playSymbol) {
        this.isTurn = false;
        this.playSymbol = playSymbol;
        this.winCount = 0;
    }
    placeSymbol(event) {
        $(event.currentTarget).text(this.playSymbol);
    }
}

class Game {
    constructor() {
        this.players = [];
        this.movesMade = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
        ];
        this.currentPlayer = {};
    }
    generatePlayer() {
        const player1 = new Player('X');
        const player2 = new Player('O');
        this.players.push(player1);
        this.players.push(player2);
    }
    startGame() {
        this.clearField();
        this.generatePlayer();
        this.resetCounters();
        this.players[0].isTurn = true;
        $('#p1-turn-text').addClass('current-turn');
    }
    clearField() {
        $('.game-field').empty();
        this.movesMade = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
        ];
    }
    resetCounters() {
        $('#p1-win-count').text(this.players[0].winCount);
        $('#p2-win-count').text(this.players[1].winCount);
    }
    turnCheck() {
        for(let i = 0; i < this.players.length; i++) {
            if(this.players[i].isTurn === true) {
                return i;
            }
        }
    }
    changeTurn() {
        console.log('changeturn ran')
        for(let i = 0; i < this.players.length; i++) {
            if(this.players[i].isTurn === true) {
                this.players[i].isTurn = false;
                if(i === 1) {
                    console.log('-------', i)
                    $('#p1-turn-text').addClass('current-turn');
                    $('#p2-turn-text').removeClass('current-turn');
                } else {
                    console.log('-------', i)
                    $('#p1-turn-text').removeClass('current-turn');
                    $('#p2-turn-text').addClass('current-turn');
                }
            } else {
                this.players[i].isTurn = true;
            }
        }
    }
    storePlay(event) {
        const $clickedSquarePos = $(event.currentTarget).attr('id');
        const $symbolEntered = $(event.currentTarget).text();
        switch($clickedSquarePos) {
            case 'top-left':
                this.movesMade[0][0] = $symbolEntered;
                // console.log(this.movesMade[0][0])
                break;
            case 'top-center':
                this.movesMade[0][1] = $symbolEntered;
                // console.log(this.movesMade[0][1])
                break;
            case 'top-right':
                this.movesMade[0][2] = $symbolEntered;
                // console.log(this.movesMade[0][2])
                break;
            case 'middle-left':
                this.movesMade[1][0] = $symbolEntered;
                // console.log(this.movesMade[1][0])
                break;
            case 'middle-center':
                this.movesMade[1][1] = $symbolEntered;
                // console.log(this.movesMade[1][1])
                break;
            case 'middle-right':
                this.movesMade[1][2] = $symbolEntered;
                // console.log(this.movesMade[1][2])
                console.log(this.movesMade)
                break;
            case 'bottom-left':
                this.movesMade[2][0] = $symbolEntered;
                // console.log(this.movesMade[2][0])
                break;
            case 'bottom-center':
                this.movesMade[2][1] = $symbolEntered;
                // console.log(this.movesMade[2][1])
                break;
            case 'bottom-right':
                this.movesMade[2][2] = $symbolEntered;
                // console.log(this.movesMade[2][2])
                break;
            }
        }
        winCheck() {
            if(this.horizontalCheck() === true) {
                this.gameOver();
            } else if(this.verticalCheck() === true) {
                this.gameOver();
            } else if((this.leftRight() === true) || (this.rightLeft() === true)) {
                this.gameOver();
            } else {
                this.changeTurn();
            }

        /////This my old winCheck func and I felt it was too hardcoded. Maybe I over-complicated it but my goal was to make it more modular
        //////////////////////////////////
        // for(let i = 0; i < this.movesMade.length; i++) {
        //     console.log(`the wincheck() loop has run ${i} time(s)`)
        //     if((this.movesMade[i][0] === this.movesMade[i][1]) && (this.movesMade[i][0] === this.movesMade[i][2])) {
        //         this.gameOver();
        //     } else if((this.movesMade[0][i] === this.movesMade[1][i]) && (this.movesMade[0][i] === this.movesMade[2][i])) {
        //         this.gameOver();
        //     } else if((i === 0) || (i === 2)) {
        //         if(i === 0) {
        //             if((this.movesMade[i][0] === this.movesMade[i + 1][1]) && (this.movesMade[i][0] === this.movesMade[i + 2][2])) {
        //                 this.gameOver();
        //             }
        //         } else if(i === 2) {
        //             if((this.movesMade[0][i] === this.movesMade[1][i - 1]) && (this.movesMade[0][i] === this.movesMade[2][i - 2])) {
        //                 this.gameOver();
        //             }
        //         }
        //     } 
        // } this.changeTurn();
        ////////////////////////////////////////////////////
        
    }
    horizontalCheck() {
        // for(let i = 0; i < this.movesMade.length; i++) {
        //     let count = 1;
        //     for(let j = 0; j < this.movesMade.length - 1; j++) {
        //         if(this.movesMade[i][j] === this.movesMade[i][j + 1]) {
        //             count++;
        //             if(count === 3) {
        //                 return true;
        //             }
        //         } 
        //     }
        //     return false;
        // }
        for(let i = 0; i < this.movesMade.length; i++) {
            let count = 1;
            for(let j = 0; j < this.movesMade.length - 1; j++) {
                if(this.movesMade[i][j] === this.movesMade[i][j + 1]) {
                    count++;
                    console.log(`movesMade[${i}][${j}] : ${this.movesMade[i][j]} matches movesMade[${i}][${j + 1}] : ${this.movesMade[i][j + 1]}`)
                    console.log(`count is: ${count}`)
                    if(count === 3) {
                        return true;
                    }
                }
            }
        }
    }
    verticalCheck() {
        for(let i = 0; i < this.movesMade.length; i++) {
            let count = 1;
            for(let j = 0; j < this.movesMade.length - 1; j++) {
                if(this.movesMade[j][i] === this.movesMade[j + 1][i]) {
                    count++;
                    if(count === 3) {
                        return true;
                    }
                }
            }
            // return false;
        }
    }
    leftRight() {
        let count = 1;
        for(let i = 0; i < this.movesMade.length - 1; i++) {
            if(this.movesMade[i][i] === this.movesMade[i + 1][i + 1]) {
                count++;
                if(count === 3) {
                    return true;
                }
            }
        }
        return false; 
    }
    rightLeft() {
        let count = 1;
        let secondInd = 2;
        for(let i = 0; i < this.movesMade.length - 1; i++) {
            if(this.movesMade[i][secondInd] === this.movesMade[i + 1][secondInd - 1]) {
                count++;
                if(count === 3) {
                    return true;
                }
            }
            secondInd--;
        }
        return false;
    }
    gameOver() {
        let $lastPlayer = "";
        for(let i = 0; i < this.players.length; i++) {
            if(this.players[i].isTurn === true) {
                $lastPlayer = this.players[i];
                this.players[i].winCount++;
                console.log(this.players[i].winCount)
            }
        }
        $('#winner-text').text(`GAME OVER: ${$lastPlayer.playSymbol} has won!`)
        setTimeout(() => {
                $('#modal').css('display', 'block');
            }, 250);
    }
}

$(() => {
    const currentGame = new Game();
    currentGame.startGame();
    $('.game-field').on('click', (event) => {
        currentGame.players[currentGame.turnCheck()].placeSymbol(event);
        currentGame.storePlay(event);
        currentGame.winCheck();
    });
    $('.modbtn').on({
        'mouseover' : (event) => {
            $(event.currentTarget).css({
                'background-color' : 'rgba(255, 255, 255, 0.6)',
                'color' : 'rgba(0, 0, 0, 0.8)'
            });
        },
        'mouseleave' : (event) => {
            $(event.currentTarget).css({
                'background-color' : 'transparent',
                'color' : 'whitesmoke'
                
            })
        }
    })
    $('#play-again').on({
        'click' : () => {
            $('#modal').css('display', 'none');
            currentGame.clearField();
            currentGame.resetCounters();
        },
    })
    $('#restart').on({
        'click' : () => {
            $('#modal').css('display', 'none');
            currentGame.players = [];
            currentGame.startGame();
        }
    })
})