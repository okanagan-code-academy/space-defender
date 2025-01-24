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