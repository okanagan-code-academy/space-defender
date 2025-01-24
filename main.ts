let fixedDeltaTime: number = 0.0125
namespace Overlaps{
    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Asteroid, function(sprite: Sprite, otherSprite: Sprite): void {
        sprite.destroy()
        VFXSprites.createExplosion(SpriteSheet.explosionAnimation, new Vector2(otherSprite.x, otherSprite.y), 4)
        otherSprite.destroy()
    })
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
function createPowerUp(){
    
}


// let playerSprite: Sprite = 
let playerObject: PlayerSprite = new PlayerSprite(SpriteSheet.shipImage)
let playerSprite: Sprite = playerObject.createSprite(new Vector2(100, 100))

game.onUpdateInterval(1250, function(): void {
    createAsteroid()
})


