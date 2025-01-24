class Vector2 {
    x: number = 0
    y: number = 0
    static ZERO = new Vector2(0, 0)
    static ONE = new Vector2(1, 1)
    static UP = new Vector2(0, -1)
    static DOWN = new Vector2(0, 1)
    static RIGHT = new Vector2(1, 0)
    static LEFT = new Vector2(-1, 0)

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    static getRandomDirection(): Vector2 {
        return [Vector2.RIGHT, Vector2.UP, Vector2.LEFT, Vector2.DOWN]._pickRandom()
    }
    length(): number {
        let lengthSquared: number = Math.pow(this.x, 2) + Math.pow(this.y, 2)
        return Math.sqrt(lengthSquared)
    }
    add(vector2: Vector2): Vector2 {
        return new Vector2(this.x + vector2.x, this.y + vector2.y)
    }
    subtract(vector2: Vector2): Vector2 {
        return new Vector2(vector2.x - this.x, vector2.y - this.y)
    }
    normalize(): Vector2 {
        let length: number = this.length()
        return this.scale(1 / length)
    }
    scale(scalar: number): Vector2 {
        return new Vector2(scalar * this.x, scalar * this.y)
    }
    lerp(vector1: Vector2, t: number): Vector2 {
        let resultVector: Vector2 = Vector2.ZERO
        resultVector.x = Math.lerp(this.x, vector1.x, t)
        resultVector.y = Math.lerp(this.y, vector1.y, t)
        return resultVector
    }
    dot(vector1: Vector2): number {
        return this.x * vector1.x + this.y * vector1.y
    }
}

class Explosions {
    animation: Image[]
    lifeSpan: number
    scale: number

    constructor(animation: Image[], lifeSpan: number, scale: number) {
        this.animation = animation
        this.lifeSpan = lifeSpan
        this.scale = scale
    }
}