import React from 'react';

function Square(props) {
  return (
    <button 
    className="square"
    onClick={props.onClick}
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
    if (squares[i]) count += 1;
  }
  if (count === 9) return "tie";

  return null;
}

class UltimateBoard extends React.Component {

  constructor(props) {
    super(props);

    let board = Array(9).fill(null).map(() => Array(9))

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
    let board = Array(9).fill(null).map(() => Array(9))

    this.setState({
      boardArray: board,
      winnerArray: Array(9).fill(null),
      currentBoardToPlay: -1,
      isXNext: true,
      foundWinner: false,
      winner: null,
    })
  }

  renderSquare(i, j) {
    return <Square
      value={this.state.boardArray[i][j]}
      onClick={() => this.handleClick(i, j)}
    />
  }

    renderBoard(i) {
      return <div>
        <div className="board-row">
          {this.renderSquare(i, 0)}
          {this.renderSquare(i, 1)}
          {this.renderSquare(i, 2)}
        </div>

        <div className="board-row">
          {this.renderSquare(i, 3)}
          {this.renderSquare(i, 4)}
          {this.renderSquare(i, 5)}
        </div>

        <div className="board-row">
          {this.renderSquare(i, 6)}
          {this.renderSquare(i, 7)}
          {this.renderSquare(i, 8)}
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
            {this.renderBoard(0)}
            &nbsp;
            &nbsp;
            1
            {this.renderBoard(1)}
            &nbsp;
            &nbsp;
            2
            {this.renderBoard(2)}
          </div>
          <br></br>
          <div className="board-row">
            3
            {this.renderBoard(3)}
            &nbsp;
            &nbsp;
            4
            {this.renderBoard(4)}
            &nbsp;
            &nbsp;
            5
            {this.renderBoard(5)}
          </div>
          <br></br>
          <div className="board-row">
            6
            {this.renderBoard(6)}
            &nbsp;
            &nbsp;
            7
            {this.renderBoard(7)}
            &nbsp;
            &nbsp;
            8
            {this.renderBoard(8)}
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