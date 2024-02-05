import { Board } from "./Board"
import { Checker } from "./Checker"
import { Colors } from "./Colors"

export class Cell {
    x: number
    y: number
    object: Checker | null
    color: Colors;
    isAvailable: boolean;
    board: Board
    constructor(x: number, y: number, object: Checker | null, color: Colors, isAvailable: boolean, board: Board){
        this.x = x
        this.y = y
        this.object = object
        this.color = color
        this.isAvailable = isAvailable
        this.board = board
    }

    public isEnemy(target: Cell){
        if (!target.object) return false
        return target.object && target.object.color !== this.object?.color
    }

    public isEmpty(){
        return !this.object
    }

    public isEmptyDiagonal(target: Cell):boolean {
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)
        if (absY !== absX){
            return false
        }

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for(let i = 1; i < absY; i++){
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()){
                return false
            }
        }
        return true
    }

    public canMoveTo(target: Cell): {canMove: boolean, beatenChecker: Cell | null} {
        if (target.object) return {
            canMove: false,
            beatenChecker: null
        }

        const dx = target.x - this.x
        const dy = target.y - this.y

        if (!this.object?.isQueen){
            if ((this.object?.color === Colors.LIGHT && dy === -1) || (this.object?.color === Colors.DARK && dy === 1)){ 
                if (Math.abs(dx) === 1) return {
                    canMove: true,
                    beatenChecker: null
                } // Common behavior
            }
            if (dy === -2) { // Making two steps up (eating forward if light turn / eating backward if dark turn)
                if (dx === 2 && this.isEnemy(this.board.getCell(target.x - 1, target.y + 1))) return {
                        canMove: true,
                        beatenChecker: this.board.getCell(target.x - 1, target.y + 1)
                    }
                
                if (dx === -2 && this.isEnemy(this.board.getCell(target.x + 1, target.y + 1))) return {
                        canMove: true,
                        beatenChecker: this.board.getCell(target.x + 1, target.y + 1)
                    }
                }
            
            if (dy === 2) { // Making two steps down (eating forward if dark turn / eating backward if light turn)
                if (dx === 2 && this.isEnemy(this.board.getCell(target.x - 1, target.y - 1))) return {
                        canMove: true,
                        beatenChecker: this.board.getCell(target.x - 1, target.y - 1)
                    }
                
                if (dx === -2 && this.isEnemy(this.board.getCell(target.x + 1, target.y - 1))) return {
                        canMove: true,
                        beatenChecker: this.board.getCell(target.x + 1, target.y - 1)
                    

                }
            }
        }

        if (this.object?.isQueen){
            if (this.isEmptyDiagonal(target)) return {
                canMove: true,
                beatenChecker: null
            }
            else {
                if (dy < 0) { // Making two steps up (eating forward if light turn / eating backward if dark turn)
                    if (dx > 0 && this.isEnemy(this.board.getCell(target.x - 1, target.y + 1))) return {
                        canMove: true,
                        beatenChecker: this.board.getCell(target.x - 1, target.y + 1)
                    }
                
                    if (dx < 0 && this.isEnemy(this.board.getCell(target.x + 1, target.y + 1))) return {
                            canMove: true,
                            beatenChecker: this.board.getCell(target.x + 1, target.y + 1)
                        }
                    }
                
                if (dy > 0) { // Making two steps down (eating forward if dark turn / eating backward if light turn)
                    if (dx > 0 && this.isEnemy(this.board.getCell(target.x - 1, target.y - 1))) return {
                        canMove: true,
                        beatenChecker: this.board.getCell(target.x - 1, target.y - 1)
                    }
                
                    if (dx < 0 && this.isEnemy(this.board.getCell(target.x + 1, target.y - 1))) return {
                        canMove: true,
                        beatenChecker: this.board.getCell(target.x + 1, target.y - 1)
                    }
                }
            }
            
        }
        
        return {
            canMove: false,
            beatenChecker: null
        }
    }
    
    /* public canEatMore({canMove, beatenChecker}: {canMove: boolean, beatenChecker: Cell | null}){
        for (let y = 0; y < this.board.cells.length; y++){
            for (let x = 0; x < this.board.cells[y].length; x++){
                if (this.canMoveTo(this.board.getCell(x, y)).canMove && beatenChecker) return true
            }
        }
    } */

}