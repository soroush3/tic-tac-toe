import React from 'react';

function Square(props) {
  return (
    <button 
    className="square-small"
    onClick={props.onClick}
    id={props.id}
    >
      {props.value}
    </button>
  );
}

function checkWinner(squares) {
  const possible3 = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6]
  ]
  for (let i = 0; i < possible3.length; ++i) {
    const [a,b,c] = possible3[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // check for tie
  let count = 0;
  for (let i = 0; i < squares.length; ++i) {
    if (squares[i] === 'X' || squares[i] === 'O') count += 1;
  }
  if (count === 9) return "tie";

  return null;
}

class UltimateBoard extends React.Component {

  constructor(props) {
    super(props);

    const board = Array(9).fill(null).map(() => Array(9))

    this.state = {
      boardArray: board,
      winnerArray: Array(9).fill(null),
      currentBoardToPlay: -1,
      isXNext: true,
      foundWinner: false,
      winner: null,
    }

  }

  restartGameClick = () => {
    const board = Array(9).fill(null).map(() => Array(9))

    this.setState({
      boardArray: board,
      winnerArray: Array(9).fill(null),
      currentBoardToPlay: -1,
      isXNext: true,
      foundWinner: false,
      winner: null,
    })
  }

  renderSquare(i, j, id) {
    return <Square
      value={this.state.boardArray[i][j]}
      onClick={() => this.handleClick(i, j)}
      id={id}
    />
  }

  renderBoard(i) {
    return <div className="row-container">
      <div className="board-row">
        {this.renderSquare(i, 0, 'square_0')}
        {this.renderSquare(i, 1, 'square_1')}
        {this.renderSquare(i, 2, 'square_2')}
      </div>

      <div className="board-row">
        {this.renderSquare(i, 3, 'square_3')}
        {this.renderSquare(i, 4, 'square_4')}
        {this.renderSquare(i, 5, 'square_5')}
      </div>

      <div className="board-row">
        {this.renderSquare(i, 6, 'square_6')}
        {this.renderSquare(i, 7, 'square_7')}
        {this.renderSquare(i, 8, 'square_8')}
      </div>
    </div>
  }

  handleClick(i, j) {
    if (!this.state.foundWinner && !this.state.winnerArray[i] && !this.state.boardArray[i][j]
          && (this.state.currentBoardToPlay === -1 || this.state.currentBoardToPlay === i))
    {
      let newBoard = this.state.boardArray;
      newBoard[i][j] = this.state.isXNext ? 'X' : 'O';

      let winnerOfBoard = checkWinner(newBoard[i]);
      let newWinnerArray = this.state.winnerArray;
      newWinnerArray[i] = winnerOfBoard;

      let winnerOfGame = checkWinner(newWinnerArray);

      let nextBoardToPlay = newWinnerArray[j] === null ? j : -1;

      this.setState(
        {
          boardArray: newBoard,
          isXNext : !this.state.isXNext,
          winnerArray: newWinnerArray,
          winner: winnerOfGame,
          foundWinner: winnerOfGame !== null? true : false,
          currentBoardToPlay: nextBoardToPlay,
        }
      )
    }
    
  }

  render() {
    let status;
    if (this.state.winner) {
      status = 'Player ' + this.state.winner + ' has won!';
    } else if (this.state.movesLeft === 0 && !this.state.winner) {
      status = 'Tie Game!'
    } else {
      let boardNumber = this.state.currentBoardToPlay;
      let whichBoard = "";
      if (boardNumber === -1) {
        whichBoard = ' to play on any remaining board.'
      } else {
        whichBoard = ' to play on board number ' + boardNumber + '.';
      }
      status = 'Next Player: ' + (this.state.isXNext ? 'X' : 'O') + 
                whichBoard;
    }

    return(
      <>
        <div className="center">Ultimate Tic-Tac-Toe</div>

        <br />
        <div className="status"> {status} </div>
        <br></br>
        <div className="board-row">
          0
          {this.state.winnerArray[0] === null ?
            <div className={"" + ((this.state.currentBoardToPlay === -1 || this.state.currentBoardToPlay === 0) && !this.state.foundWinner ? "outline" : "")}>
              {this.renderBoard(0)}
              </div> : <div className="large-letter"> {this.state.winnerArray[0]} </div>}
          
          &nbsp;
          &nbsp;
          1
          {this.state.winnerArray[1] === null ?
            <div className={"" + ((this.state.currentBoardToPlay === -1 || this.state.currentBoardToPlay === 1) && !this.state.foundWinner ? "outline" : "")}>
              {this.renderBoard(1)}
              </div> : <div className="large-letter"> {this.state.winnerArray[1]} </div>}
          &nbsp;
          &nbsp;
          2
          {this.state.winnerArray[2] === null ?
            <div className={"" + ((this.state.currentBoardToPlay === -1 || this.state.currentBoardToPlay === 2) && !this.state.foundWinner ? "outline" : "")}>
              {this.renderBoard(2)}
              </div> : <div className="large-letter"> {this.state.winnerArray[2]} </div>}
        </div>
        <br></br>
        <div className="board-row">
          3
          {this.state.winnerArray[3] === null ?
            <div className={"" + ((this.state.currentBoardToPlay === -1 || this.state.currentBoardToPlay === 3) && !this.state.foundWinner ? "outline" : "")}>
              {this.renderBoard(3)}
              </div> : <div className="large-letter"> {this.state.winnerArray[3]} </div>}
          &nbsp;
          &nbsp;
          4
          {this.state.winnerArray[4] === null ?
            <div className={"" + ((this.state.currentBoardToPlay === -1 || this.state.currentBoardToPlay === 4) && !this.state.foundWinner ? "outline" : "")}>
              {this.renderBoard(4)}
              </div> : <div className="large-letter"> {this.state.winnerArray[4]} </div>}
          &nbsp;
          &nbsp;
          5
          {this.state.winnerArray[5] === null ?
            <div className={"" + ((this.state.currentBoardToPlay === -1 || this.state.currentBoardToPlay === 5) && !this.state.foundWinner ? "outline" : "")}>
              {this.renderBoard(5)}
              </div> : <div className="large-letter"> {this.state.winnerArray[5]} </div>}
        </div>
        <br></br>
        <div className="board-row">
          6
          {this.state.winnerArray[6] === null ?
            <div className={"" + ((this.state.currentBoardToPlay === -1 || this.state.currentBoardToPlay === 6) && !this.state.foundWinner ? "outline" : "")}>
              {this.renderBoard(6)}
              </div> : <div className="large-letter"> {this.state.winnerArray[6]} </div>}
          &nbsp;
          &nbsp;
          7
          {this.state.winnerArray[7] === null ?
            <div className={"" + ((this.state.currentBoardToPlay === -1 || this.state.currentBoardToPlay === 7) && !this.state.foundWinner ? "outline" : "")}>
              {this.renderBoard(7)}
              </div> : <div className="large-letter"> {this.state.winnerArray[7]} </div>}
          &nbsp;
          &nbsp;
          8
          {this.state.winnerArray[8] === null ?
            <div className={"" + ((this.state.currentBoardToPlay === -1 || this.state.currentBoardToPlay === 8) && !this.state.foundWinner ? "outline" : "")}>
              {this.renderBoard(8)}
              </div> : <div className="large-letter"> {this.state.winnerArray[8]} </div>}
        </div>

        <div style={{textAlign: "center"}}>
        <button 
        style={{marginTop: "30px"}}
        onClick={this.restartGameClick}
        > 
        Restart Game
        </button>
      </div>
      </>
    )
  }

}



export default UltimateBoard;