export class Vector {
    row: number;
    column: number;

    constructor(column: number, row: number) {
        this.row = row;
        this.column = column;
    }

    isEqual(vector: Vector) : boolean {
        return (vector.row == this.row) && (vector.column == this.column)
    }

    scalar(n: number) : Vector{
        return new Vector(n*this.column, n*this.row)
    }

    sum(vector: Vector) : Vector{
        return new Vector(this.column + vector.column, this.row + vector.row)
    }
    
    scalarProduct(vector: Vector) : number {
        return (this.row)*(vector.row) + (this.column)*(vector.column)
    }
}
