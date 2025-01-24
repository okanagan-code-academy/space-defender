namespace Overlaps{
    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Asteroid, function(sprite: Sprite, otherSprite: Sprite): void {
        sprite.destroy()
        VFXSprites.createExplosion(SpriteSheet.explosionAnimation, new Vector2(otherSprite.x, otherSprite.y), 4)
        otherSprite.destroy()
    })
}

function createPlayer(): Sprite {
    let playerSprite: Sprite = sprites.create(SpriteSheet.shipImage, SpriteKind.Player)
    sprites.setDataNumber(playerSprite, "rotationRate", 2*Math.PI)
    sprites.setDataImage(playerSprite, "image", SpriteSheet.shipImage)
    sprites.setDataNumber(playerSprite, "currentAngle", 0)
    sprites.setDataNumber(playerSprite, "speed", 0.0)
    return playerSprite
}
function createAsteroid(){
    let asteroidSprite: Sprite = sprites.create(SpriteSheet.asteroidImages._pickRandom(), SpriteKind.Asteroid)
    let randomPosition: Vector2 = Vector2.ZERO

    if(Math.random() <= 0.5){
        randomPosition
        randomPosition = randomPosition.add(Vector2.DOWN.scale(Math.randomRange(0, userconfig.ARCADE_SCREEN_HEIGHT)))
        if(Math.random() <= 0.5){
            randomPosition = randomPosition.add(Vector2.RIGHT.scale(userconfig.ARCADE_SCREEN_WIDTH))
        }
    } else {
        randomPosition = randomPosition.add(Vector2.RIGHT.scale(Math.randomRange(0, userconfig.ARCADE_SCREEN_WIDTH)))
        if (Math.random() <= 0.5) {
            randomPosition = randomPosition.add(Vector2.DOWN.scale(userconfig.ARCADE_SCREEN_HEIGHT))
        }
    }

    asteroidSprite.setPosition(randomPosition.x, randomPosition.y)
    spriteutils.setVelocityAtAngle(asteroidSprite, spriteutils.angleFrom(asteroidSprite, spriteutils.pos(userconfig.ARCADE_SCREEN_WIDTH / 2 + Math.randomRange(-50, 50), userconfig.ARCADE_SCREEN_HEIGHT / 2 + Math.randomRange(-50, 50))), Math.randomRange(75, 125))
    timer.after(500, function(): void {
        asteroidSprite.setFlag(SpriteFlag.AutoDestroy, true)
    })
}

let playerSprite: Sprite = createPlayer()

let fixedDeltaTime: number = 0.0125

game.onUpdateInterval(1250, function(): void {
    createAsteroid()
})

forever(function () {
    let currentAngle: number = sprites.readDataNumber(playerSprite, "currentAngle")
    let rotationRate: number = sprites.readDataNumber(playerSprite, "rotationRate")
    if (controller.right.isPressed()) {
        currentAngle += rotationRate * fixedDeltaTime
    } else if (controller.left.isPressed()) {
        currentAngle -= rotationRate * fixedDeltaTime
    }
    sprites.setDataNumber(playerSprite, "currentAngle", currentAngle)
    sprites.setDataNumber(playerSprite, "fireRate", 200)
    playerSprite.setImage(sprites.readDataImage(playerSprite, "image"))
    rotsprite.rotSprite(playerSprite, sprites.readDataNumber(playerSprite, "currentAngle"))
})
forever(function(): void {
    if(controller.A.isPressed()){
        let currentFireRate: number = sprites.readDataNumber(playerSprite, "fireRate")
        let projectileSprite: Sprite = sprites.create(SpriteSheet.projectileImage, SpriteKind.Projectile)
        let playerAngle: number = sprites.readDataNumber(playerSprite, "currentAngle")
        spriteutils.placeAngleFrom(projectileSprite, playerAngle, 10, playerSprite)
        spriteutils.setVelocityAtAngle(projectileSprite, playerAngle, 200)
        projectileSprite.lifespan = 1000
        pause(currentFireRate)
    }
})
forever(function () {
    let currentAngle: number = sprites.readDataNumber(playerSprite, "currentAngle")
    let currentSpeed: number = sprites.readDataNumber(playerSprite, "speed")

    if (controller.up.isPressed()) {
        currentSpeed = Math.lerp(currentSpeed, 100, 1 - Math.exp(-fixedDeltaTime))
        spriteutils.setVelocityAtAngle(playerSprite, currentAngle, currentSpeed)
    } else if (controller.down.isPressed()) {
        currentSpeed = Math.lerp(currentSpeed, -100, 1 - Math.exp(-fixedDeltaTime))
        spriteutils.setVelocityAtAngle(playerSprite, currentAngle, currentSpeed)
    } else {
        currentSpeed = Math.lerp(currentSpeed, 0, 1 - Math.exp(-fixedDeltaTime))
        spriteutils.setVelocityAtAngle(playerSprite, currentAngle, currentSpeed)
    }
    sprites.setDataNumber(playerSprite, "speed", currentSpeed)
})

