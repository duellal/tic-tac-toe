import React, {Fragment, useState} from "react";

function Square({value, handleClick}) {
  return (
    <button className="square" onClick={handleClick}>{value}</button>
    )
}

let calcWinner = (square) => {
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
  }
  
  return null
}

export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null))
  const [player1, setPlayer1] = useState(true)
  let winner = calcWinner(square)
  let status

  let handleClick = (num) => {
    console.log(`calcWinner(square) true?`, calcWinner(square))

    if(square[num] || calcWinner(square)){
      return
    }

    let squareAnswer = square.slice();

    if(player1){
      squareAnswer[num] = "X"
    }
    else{
      squareAnswer[num] = "O"
    }
    
    setSquare(squareAnswer)
    setPlayer1(!player1)
  }

  if(winner === null){
    status = `Player ` + (player1 ? 'X' : 'O') + `'s turn`
  }
  else if(winner){
    status = `The winner is ${winner}!`
  }
  else{
    status = 'There is a tie!'
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
      <button onClick={() => setSquare(Array(9).fill(null))}>Reset Board</button>
    </Fragment>
  );
};