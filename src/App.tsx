import { useEffect, useState } from 'react';
import './sass/App.scss'
import { Board } from './models/Board';
import BoardComponent from './components/BoardComponent';

const App = () => {
  const [board, setBoard] = useState(new Board())

  useEffect(() => restart(), [])

  function restart(){
    const nextBoard = new Board()
    nextBoard.initCells()
    nextBoard.initCheckers()
    setBoard(nextBoard)
  }

  return (
    <div className='main-layout'>
      <h1>Checkers</h1>
      <BoardComponent restart={restart} setBoard={setBoard} board={board}/>
    </div>
  );
};

export default App;