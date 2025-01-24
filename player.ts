class BaseSprite {
    sprite: Sprite = null
    image: Image = null
    maxSpeed: number = 100
    rotationRate: number = 2*Math.PI

    constructor(image: Image) {
        this.image = image
    }
    
    createSprite(position: Vector2): Sprite {
        return null 
    }

}
class PlayerSprite extends BaseSprite {
    fireRate: number = 50
    private canShoot: boolean = true
    constructor(image: Image) {
        super(image)   
    }
    createSprite(position: Vector2) : Sprite {
        let playerSprite: Sprite = sprites.create(this.image, SpriteKind.Player)
        this.sprite = playerSprite
        playerSprite.setPosition(position.x, position.y)
        sprites.setDataNumber(playerSprite, "rotationRate", 2 * Math.PI)
        sprites.setDataImage(playerSprite, "image", this.image)
        sprites.setDataNumber(playerSprite, "currentAngle", 0)
        sprites.setDataNumber(playerSprite, "speed", 0.0)

        let projectileManager: ProjectileManager = new ProjectileManager(playerSprite, SpriteKind.Projectile, SpriteSheet.projectileImage, 125, this.fireRate)

        let currentAngle: number = 0.0

        
        forever(function () {
            currentAngle = sprites.readDataNumber(playerSprite, "currentAngle")
            this.calculateRotation(currentAngle)
            this.calculateMovement(currentAngle)
            this.shootProjectile(projectileManager, currentAngle)
        })
        
    
        return playerSprite
    }
    calculateRotation(angle: number): void {
        let rotationRate: number = sprites.readDataNumber(playerSprite, "rotationRate")
        if (controller.right.isPressed()) {
            angle += rotationRate * fixedDeltaTime
        } else if (controller.left.isPressed()) {
            angle -= rotationRate * fixedDeltaTime
        }

        sprites.setDataNumber(this.sprite, "currentAngle", angle)
        sprites.setDataNumber(this.sprite, "fireRate", 200)
        this.sprite.setImage(sprites.readDataImage(playerSprite, "image"))
        rotsprite.rotSprite(playerSprite, sprites.readDataNumber(this.sprite, "currentAngle"))
    }
    calculateMovement(angle: number) : void {
        let currentSpeed: number = sprites.readDataNumber(playerSprite, "speed")

        if (controller.up.isPressed()) {
            currentSpeed = Math.lerp(currentSpeed, 100, 1 - Math.exp(-fixedDeltaTime))
            spriteutils.setVelocityAtAngle(this.sprite, angle, currentSpeed)
        } else if (controller.down.isPressed()) {
            currentSpeed = Math.lerp(currentSpeed, -100, 1 - Math.exp(-fixedDeltaTime))
            spriteutils.setVelocityAtAngle(this.sprite, angle, currentSpeed)
        } else {
            currentSpeed = Math.lerp(currentSpeed, 0, 1 - Math.exp(-fixedDeltaTime))
            spriteutils.setVelocityAtAngle(this.sprite, angle, currentSpeed)
        }
        sprites.setDataNumber(this.sprite, "speed", currentSpeed)
    }
    shootProjectile(projectileManager: ProjectileManager, angle: number): void {
        if(!this.canShoot)
            return
        if (controller.A.isPressed()) {
            this.canShoot = false
            projectileManager.shoot(angle)
            
            timer.after(this.fireRate, function(): void {
                this.canShoot = true
            })
        }
    }
    
}