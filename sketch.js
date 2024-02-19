

let testParticles = [];
let maxParticles = 500;
let particleCount = 0;

let wave = [];
let waveStack = 4;
let waveDirection = [];
let waveHCount = 32;
let waveVCount = 40;

let prevMouseX = 0;
let prevMouseY = 0;

function setup() 
{
  createCanvas(1200, 800);

  for (let i = 0; i < waveHCount; i++)
  {
    wave[i] = [];
    waveDirection[i] = [];
    for (let v = 0; v < waveVCount; v++)
    {
      wave[i][v] = [];
      waveDirection[i][v] = 1;
      for (let c = 0; c < waveStack; c++)
      {
        wave[i][v][c]= new TestParticle("wave" + i + v + c, color(0, 0, 255 - 8 * c), 5, width/waveHCount - width/(20*waveHCount)*c, 
        i*width/waveHCount + width/(40*waveHCount)*c, v * height/waveVCount, 0, 0, 0);
      }
    }
  }
}

function draw() 
{
  background(0, 0, 175);

  for(let h = 0; h < waveHCount; h++)
  {
    for(let v = 0; v < waveVCount; v++)
    {
      for(let c = 0; c < waveStack; c++)
      {
        wave[h][v][c].display();
        wave[h][v][c].changeHeight(waveDirection[h][v])
      }

      if(wave[h][v][0].pHeight > height/waveVCount || wave[h][v][0].pHeight < 5)
      {
        waveDirection[h][v] *= -1;
      }
    }
  }

  if (mouseIsPressed)
  {
    particleGenerator();
  }
  if(particleCount > 0)
  {
    for(let i = 0; i < particleCount; i++)
    {
      testParticles[i].display();
      testParticles[i].movement();
      testParticles[i].changeColor();
      /*if (testParticles[i].posX >= width - testParticles[i].pWidth || 
          testParticles[i].posX <= 0 || testParticles[i].posY >= height - testParticles[i].pHeight ||
          testParticles[i].posY <= 0)
          {
            testParticles.splice(i, 1);
            i--;
            particleCount--;
          }*/
    }
    deleteParticles();
  }
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  //fill(0,0,0);
  //text(particleCount, width/2, height/2);
}

function particleGenerator()
{
  if (particleCount < maxParticles)
  {
    testParticles[particleCount] = new TestParticle(particleCount, color(255, 0, 0), 5, 5,  mouseX, mouseY, mouseX - prevMouseX, mouseY - prevMouseY, frameCount);
    particleCount++;
  }
}

function deleteParticles()
{
  for (let i = 1; i < particleCount; i++)
  {
    for (let j = 0; j < particleCount; j++)
    {
      if(testParticles[i].collisionDetected(testParticles[j]))
      {  
        testParticles.splice(j, 1);
        testParticles.splice(i, 1);
        particleCount -= 2;
      }
    }
  }
}