export default class Enemy{
    constructor(x,y,imageNumber){
        this.x=x
        this.y=y
        this.width = 75
        this.height = 60

        this.image = new Image()
        this.image.src = `media/enemy${imageNumber}.png`
        this.type = 99

    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }



    move(xVelocity, yVelocity) { //make the enemies move
        this.x += xVelocity;
        this.y += yVelocity;
      }
    


}