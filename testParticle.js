class TestParticle
{
  constructor(name, pColor, pHeight, pWidth, posX, posY, xSpeed, ySpeed, startFrame)
  {
    this.name = name;
    this.pHeight = pHeight;
    this.pWidth = pWidth;
    this.posX = posX;
    this.posY = posY;
    if (xSpeed <= 0.1 && xSpeed >= -0.1)
    {xSpeed = 0.5;}
    if (ySpeed <= 0.1 && ySpeed >= -0.1)
    {ySpeed = 0.5;}
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.pColor = pColor;
    this.toRed = false;
    this.toGreen = false;
    this.toBlue = false;
    this.ranNum = 0;
    this.startFrame = startFrame;
  }

  movement()
  {
    if(this.posX <= 0 || this.posX + this.pWidth >= width)
    {
      this.xSpeed = this.xSpeed * -(random(2));
    }
    if(this.posY <= 0 || this.posY + this.pHeight >= height)
    {
      this.ySpeed = this.ySpeed * -(random(2));
    }
    this.posX += this.xSpeed;
    this.posY += this.ySpeed;
  }

  display()
  {
    noStroke();
    fill(this.pColor);
    rect(this.posX, this.posY, this.pWidth, this.pHeight, 45);
  }

  changeColor()
  { 
    this.ranNum = int(random(1,4));
    if(this.ranNum != 0)
    {
      if (this.ranNum == 1)
      {
        this.toRed = true;
        this.toGreen = false;
        this.toBlue = false;
      }
      else if (this.ranNum == 2)
      {
        this.toGreen = true;
        this.toBlue = false;
        this.toRed = false;

      }
      else if (this.ranNum == 3)
      {
        this.toBlue = true;
        this.toGreen = false;
        this.toRed = false;
      }
    }
    if(this.toRed)
    {
      this.pColor = lerpColor(this.pColor, color(255,0,0), 0.25);
    }
    else if(this.toGreen)
    {
      this.pColor = lerpColor(this.pColor, color(0, 255, 0), 0.25);
    }
    else if(this.toBlue)
    {
      this.pColor = lerpColor(this.pColor, color(0,0,255), 0.25);
    }
  }

  changeWidth(newWidth)
  {
    this.pWidth += newWidth;
  }

  changeHeight(newHeight)
  {
    this.pHeight += newHeight;
  }

  breakApart()
  {
    let tempParticles = [];
    let pieces = random(4);
    for (let i = 0; i < pieces; i++)
    {
        tempParticles[i] = new TestParticle("name", this.drawColor, this.pHeight / pieces, this.pWidth / pieces, this.posX - i, this.posY - i, -this.xSpeed, -this.ySpeed);
    }
    return tempParticles;
  }

  collisionDetected(prevParticle)
  {
    if (frameCount > this.startFrame + 60 && frameCount > prevParticle.startFrame + 60)
    {
      let d = dist(this.posX, this.posY, prevParticle.posX, prevParticle.posY);
      if (d > this.pWidth + this.pHeight)
      { return true;}
      else { return false;}
    }
    else
    {return false;}
  }

  //should display an image/shape that is changable
  //arrayName.splice(arrayIndex, 1);
  //break apart/collision?
}