import React, { FC, useState } from 'react';
import { Board } from '../models/Board';
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';
import WonMessageComponent from './WonMessageComponent';
import { Colors } from '../models/Colors';

interface BoardComponentProps {
    board: Board;
    setBoard: (board: Board) => void
    restart: () => void
}

const BoardComponent: FC<BoardComponentProps> = ({board, setBoard, restart}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [currentPlayer, setCurrentPlayer] = useState(board.turn)
    const [winner, setWinner] = useState<string | null>(null)
    function handleMove(target: Cell){
        if (target.checker || currentPlayer !== selectedCell?.checker?.color || !selectedCell.canMove(target)) return
        const initialCheckersQty = board.getCheckersQty()
        const beatenChecker = selectedCell.canEat(target)
        if (beatenChecker){
            beatenChecker.checker = null
        }
        target.checker = selectedCell.checker
        if ((target.checker.color === Colors.LIGHT && target.y === 0) || (target.checker.color === Colors.DARK && target.y === board.cells.length - 1)){
            target.checker.isQueen = true
        }
        selectedCell.checker = null
        updateBoard()
        let eatableCheckersQty = 0
        if (board.getCheckersQty() < initialCheckersQty){
            
            for (let y = 0; y < board.cells.length; y++){
                for (let x = 0; x < board.cells[y].length; x++){
                    if (target.canEat(board.getCell(x, y))) {
                        eatableCheckersQty ++
                    }
                }
            }
            
        }
        
        if (eatableCheckersQty === 0) {
            setCurrentPlayer(currentPlayer === Colors.LIGHT ? Colors.DARK : Colors.LIGHT)
        }
        
        
        if (!board.cells.find(row => row.find(cell => cell.checker?.color === Colors.DARK))){
            setWinner('white')
            setCurrentPlayer(Colors.LIGHT)

        }
        if (!board.cells.find(row => row.find(cell => cell.checker?.color === Colors.LIGHT))){
            setWinner('black')
            setCurrentPlayer(Colors.LIGHT)
        }

    }

    function updateBoard(){
        setBoard(board.getBoardCopy())
    }

    return (
        <>
        {winner && <WonMessageComponent restart={restart} winner={winner} setWinner={setWinner}/>}
        <div className="board">
            {board.cells.map((row, index) => 
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent handleMove={handleMove} cell={cell} selectedCell={selectedCell} setSelectedCell={setSelectedCell}/>
                        )}
                </React.Fragment>
            )}
        </div>
        <h2>Current player: {currentPlayer}</h2>
        </>
    );
};

export default BoardComponent;