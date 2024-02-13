import { Cell } from "./Cell";
import { Checker } from "./Checker";
import { Colors } from "./Colors";


export class Board {
    public cells: Cell[][] = []
    public turn: Colors = Colors.LIGHT
    
    public initCells(){
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(j, i, null, Colors.DARK, false, this))
                    
                } else {
                    row.push(new Cell(j, i, null, Colors.LIGHT, false, this))
                }
            }
            this.cells.push(row);
    }
    }

    public getCell(x: number, y: number): Cell{
        return this.cells[y][x]
    }

    public initCheckers(){
        for (let i = 0; i < this.cells.length; i++){
            if (i < 3){
                for (let j = 0; j < this.cells[i].length; j++){
                    if ((i + j) % 2 !== 0){
                        this.getCell(j, i).checker = new Checker(Colors.DARK)
                    }
                }
            } 
            if (i >= 5) {
                for (let j = 0; j < this.cells[i].length; j++){
                    if ((i + j) % 2 !== 0){
                        this.getCell(j, i).checker = new Checker(Colors.LIGHT)
                    }
                }
            }
        }  
        
    }

    public getCheckersQty(){
        let checkersQty = 0
        for (let row of this.cells){
            row.forEach(cell => cell.checker && checkersQty ++)
        }
        return checkersQty
    }

    public getBoardCopy(){
        const nextBoard = new Board()
        nextBoard.cells = this.cells
        return nextBoard
    }

    public setTurn(turn: Colors){
        this.turn = turn
    }

}