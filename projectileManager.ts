class ProjectileManager {
    owner: Sprite
    projectileKind: number
    projectileImage: Image
    projectileSpeed: number
    fireRate: number

    constructor(owner: Sprite, projectileKind: number, projectileImage: Image, projectileSpeed: number, fireRate: number) {
        this.owner = owner
        this.projectileKind = projectileKind
        this.projectileImage = projectileImage
        this.projectileSpeed = projectileSpeed
        this.fireRate = fireRate
    }
    shoot(angle: number): void {
        let projectileSprite: Sprite = sprites.create(this.projectileImage, this.projectileKind)
        spriteutils.placeAngleFrom(projectileSprite, angle, 10, this.owner)
        spriteutils.setVelocityAtAngle(projectileSprite, angle, this.projectileSpeed)
        timer.after(500, function (): void {
            projectileSprite.setFlag(SpriteFlag.AutoDestroy, true)
        })
    }

}