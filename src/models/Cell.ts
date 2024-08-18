import { Board } from "./Board"
import { Checker } from "./Checker"
import { Colors } from "./Colors"

export class Cell {
    x: number
    y: number
    id: string
    checker: Checker | null
    color: Colors;
    isAvailable: boolean;
    board: Board
    constructor(x: number, y: number, checker: Checker | null, color: Colors, isAvailable: boolean, board: Board){
        this.x = x
        this.y = y
        this.id = `${x}-${y}`
        this.checker = checker
        this.color = color
        this.isAvailable = isAvailable
        this.board = board
    }

    public isEnemy(target: Cell){
        return target.checker && target.checker.color !== this.checker?.color
    }

    public isEmpty(){
        return !this.checker
    }

    public queenCanEat(target: Cell): Cell | false {
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)
        if (absY !== absX){
            return false
        }

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1
        let obstacles: Cell[] = []
        for(let i = 1; i < absY; i++){
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()){
                obstacles.push(this.board.getCell(this.x + dx * i, this.y + dy * i))
            }
        }
        if (obstacles.length === 1 && !obstacles.find(cell => !this.isEnemy(cell))) {
            return obstacles[0]
        }
        return false
    }

    public canEat(target: Cell): Cell | false {
        if (target.checker) return false
        if (this.checker?.isQueen) return this.queenCanEat(target) 
        else {
            const deltaX = target.x - this.x
            const deltaY = target.y - this.y
            if (deltaY === -2) {
                if (deltaX === 2){
                    return this.isEnemy(this.board.getCell(target.x - 1, target.y + 1)) ? this.board.getCell(target.x - 1, target.y + 1) : false
                }
                else if (deltaX === -2){
                    return this.isEnemy(this.board.getCell(target.x + 1, target.y + 1)) ? this.board.getCell(target.x + 1, target.y + 1) : false
                }
            }
            else if (deltaY === 2){
                if (deltaX === 2){
                    return this.isEnemy(this.board.getCell(target.x - 1, target.y - 1)) ? this.board.getCell(target.x - 1, target.y - 1) : false
                }
                else if (deltaX === -2){
                    return this.isEnemy(this.board.getCell(target.x + 1, target.y - 1)) ? this.board.getCell(target.x + 1, target.y - 1) : false
                }
            }
            return false
        }
        
    }

    public canMove(target: Cell): Cell | false{
        const deltaX = target.x - this.x
        const deltaY = target.y - this.y

        if (this.checker?.isQueen){
            const absX = Math.abs(target.x - this.x)
            const absY = Math.abs(target.y - this.y)
            if (absY !== absX){
                return false
            }

            const dy = this.y < target.y ? 1 : -1
            const dx = this.x < target.x ? 1 : -1

            for(let i = 1; i < absY; i++){
                if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()){
                    return this.canEat(target)
                }
            }
            return target
        }
        else if (!target.checker?.isQueen){
            if (deltaY === -1){
                if (Math.abs(deltaX) === 1 && this.checker?.color === Colors.LIGHT) return target
            }
            else if (deltaY === 1){
                if (Math.abs(deltaX) === 1 && this.checker?.color === Colors.DARK) return target
    
            }
            else if (Math.abs(deltaY) > 1) return this.canEat(target)
        }
        return false
    }
}