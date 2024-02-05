import React, { FC } from 'react';
import { Colors } from '../models/Colors';
import { Cell } from '../models/Cell';

interface CellComponentProps {
    cell: Cell
    selectedCell: Cell | null
    setSelectedCell: (cell: Cell | null) => void
    handleMove: (cell: Cell) => void
}

const CellComponent: FC<CellComponentProps> = ({cell, selectedCell, setSelectedCell, handleMove}) => {
    return (
        <div onClick={() => {setSelectedCell(cell); setSelectedCell(cell); handleMove(cell)}} className={['cell', `cell-${cell.color === 'light' ? Colors.LIGHT : Colors.DARK}`, (selectedCell?.object && selectedCell === cell) ? 'selected' : ''].join(' ')}>
            {cell.object && <div className={['checker', cell.object.color === Colors.LIGHT ? 'checker-light' : 'checker-dark', cell.object.isQueen ? 'queen' : ''].join(' ')}></div>}
        </div>
    );
};

export default CellComponent;