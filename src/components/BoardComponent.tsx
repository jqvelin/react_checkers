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
        if (selectedCell?.object?.color !== currentPlayer) return
        const data = selectedCell.canMoveTo(target)
        if (!data.canMove) return
        if (data.canMove && data.beatenChecker){
            target.object = selectedCell.object
            data.beatenChecker.object = null
        } else {
            target.object = selectedCell.object
        }

        if ((selectedCell.object.color === Colors.LIGHT && target.y === 0) || (selectedCell.object.color === Colors.DARK && target.y === board.cells.length - 1)){
            target.object.isQueen = true
        }

        setCurrentPlayer(currentPlayer === Colors.LIGHT ? Colors.DARK : Colors.LIGHT)
        updateBoard()
        selectedCell.object = null
        
        if (!board.cells.find(row => row.find(cell => cell.object?.color === Colors.DARK))){
            setWinner('white')
            setCurrentPlayer(Colors.LIGHT)

        }
        if (!board.cells.find(row => row.find(cell => cell.object?.color === Colors.LIGHT))){
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
        </>
    );
};

export default BoardComponent;