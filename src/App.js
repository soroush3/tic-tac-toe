import './App.css';
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

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.restartGameClick = this.restartGameClick.bind(this);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      foundWinner: false,
      winner: null,
      movesLeft: 9
    }
  }

  handleClick(i) {
    if (this.state.winner === null && this.state.squares[i] === null) {
      const newSquares = this.state.squares.slice();
      newSquares[i] = this.state.isXNext ? 'X' : 'O';
      this.setState({
        squares: newSquares,
        isXNext: !this.state.isXNext
      });
      this.setState({
        movesLeft: this.state.movesLeft - 1,
      })
      const freshWinner = checkWinner(newSquares);
      if (freshWinner) {
        this.setState({
          foundWinner: true,
          winner: freshWinner,
        })
      }

    }
  }

  renderSquare(i) {
    return <Square 
    value={this.state.squares[i]} 
    onClick= {() => this.handleClick(i)}
    />
  }

  restartGameClick() {
    // restart the game
    const newSquares = Array(9).fill(null);
    this.setState({
      squares: newSquares,
      isXNext: true,
      foundWinner: false,
      winner: null,
      movesLeft: 9
    })
  }

  render() {
    let status;
    if (this.state.winner) {
      status = 'Player ' + this.state.winner + ' has won!';
    } else if (this.state.movesLeft === 0 && !this.state.winner) {
      status = 'Tie Game!'
    } else {
      status = 'Next Player: ' + (this.state.isXNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status"> {status} </div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>

        <div>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>

        <div>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        <div style={{textAlign: "center"}}>
          <button 
          style={{marginTop: "30px"}}
          onClick={this.restartGameClick}
          > 
          Restart Game
          </button>
        </div>
      </div>
    )
  }

}

function App() {
  return (
    <> 
    <div className="center"> Tic-Tac-Toe </div>
    <br></br>
    <div className="center">
      <Board />
    </div>
    </>
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
  return null;
}

export default App;
