import React, {Fragment, useState} from "react";

function Square({value, handleClick}) {
  return (
    <button className="square" onClick={handleClick}>{value}</button>
    )
}

let calcWinner = (history, square) => {
  let winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let i = 0; i < winLines.length; i++){
    let [a, b, c] = winLines[i]

    if(square[a] && square[a] === square[b] && square[b] === square[c]){
      return square[a]
    }
    else if (history[9] && history[9].find(el => el === null) === undefined){
      return "tie"
    }
  }

  return null
}

function Board({history, player, square, onPlay}) {
  let status
  let winner = calcWinner(history, square)

  let handleClick = (num) => {
    if(square[num] || calcWinner(history, square)){
      return
    }

    let squareAnswer = square.slice();

    if(player){
      squareAnswer[num] = "X"
    }
    else{
      squareAnswer[num] = "O"
    }
    
    onPlay(squareAnswer)
  }

  if(winner === null){
    status = `Player ` + (player ? 'X' : 'O') + `'s turn`
  }
  else if(winner){
    if(winner === 'tie'){
      status = `It's a Cat Game! (aka: a tie)`
    }
    else{
      status = `The winner is ${winner}!`
    }
  }


  return (
    <Fragment>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={square[0]} handleClick={() => handleClick(0)} />
          <Square value={square[1]} handleClick={() => handleClick(1)}/>
          <Square value={square[2]} handleClick={() => handleClick(2)}/>
        </div>
        <div className="board-row">
          <Square value={square[3]} handleClick={() => handleClick(3)}/>
          <Square value={square[4]} handleClick={() => handleClick(4)}/>
          <Square value={square[5]} handleClick={() => handleClick(5)}/>
        </div>
        <div className="board-row">
          <Square value={square[6]} handleClick={() => handleClick(6)}/>
          <Square value={square[7]} handleClick={() => handleClick(7)}/>
          <Square value={square[8]} handleClick={() => handleClick(8)}/>
        </div>
        <br></br>
    </Fragment>
  );
};


export default function Game() {
  const [currentMove, setCurrentMove] = useState(0)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [turn, setTurn] = useState([`X`])
  let currSquare = history[currentMove]
  let player = currentMove % 2 === 0

  function handlePlay(squareAnswer){
    let nextHistory = [...history.slice(0, currentMove + 1), squareAnswer]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove)
  }

  let moves = history.map((squares, index) => {
    let desc

    if(index > 0){
      desc = `Move ${index} is ${turn[index - 1]}`
      if(player && turn.length === index){
        setTurn([...turn.slice(0), 'X'])
      }
      else if(!player && turn.length === index){
        setTurn([...turn.slice(0), 'O'])
      }
    }
    else{
      return
    }
    
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{desc}</button>
      </li>
    )
  })

  return(
    <Fragment>
      <div id="game-page">
        <h1>Tic-Tac-Toe</h1>

        <div className="directions">
          <h2>How to Play</h2>
          <p>
            The object of Tic Tac Toe is to get three in a row. There is a three by three game board below to play on. 
          </p>
          <p>
            The first player is known as X and the second is O. Players alternate placing Xs and Os on the game board until either oppent has three in a row or all nine squares are filled.
          </p>
          <p>
            ** If you forget who's turn it is, just look above the board and we'll tell you!
          </p>
          <p>
            X always goes first, and in the event that no one has three in a row, the stalemate is called a cat game.
          </p>
        </div>

        <div className="game">
          <h2>The Game</h2>
          <div className="game-board">
            <Board history={history} player={player} square={currSquare} onPlay={handlePlay} />

              <button className='reset' onClick={() => {
                jumpTo(0)
                setHistory([Array(9).fill(null)])
              }
            }>Reset Board</button>
          </div>

          <div className="turn-list">
            <div>Turn List</div>
            <ol>{moves}</ol>
          </div>

        </div>
      </div>
    </Fragment>
  )
}