export default function calcWinner(history, square) {
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
        console.log(`in calcWinner:`, square[a])
        return square[a]
      }
    }

    if (history[9]){
        return "tie"
      }
  
    return null
  }
