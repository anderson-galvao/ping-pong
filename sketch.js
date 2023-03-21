//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//Variáveis raquete
let comprimentoRaquete = 10;
let alturaRaquete = 100;

//Variáveis minha Raquete
let xRaquete = 5;
let yRaquete = 150;

//Variáveis raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYRaqueteOponente;
let chanceDeErrar = 0;

//Velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//GitHub
let colidiu = false;

//Variáveis do placar
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do jogo
let trilha;
let ponto;
let raquetada;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBolinha();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentoRaquete();
  movimentaRaqueteOponente()
  //movimentaRaqueteOponenteManual();
  //verificaColisaoRaquete(xRaquete,yRaquete);
  //verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  verificaColisaoGithub(xRaquete,yRaquete);
  verificaColisaoGithub(xRaqueteOponente,yRaqueteOponente);
  marcaPontos();
  mostraPlacar();
}

function mostraRaquete(x,y){
  rect(x,y,comprimentoRaquete,alturaRaquete);
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function movimentoRaquete() {
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentaRaqueteOponenteManual() {
  /*yRaqueteOponente = yBolinha - 50;*/
  if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function verificaColisaoBolinha() {
  if(xBolinha + raio > width || xBolinha - raio < 0){
     velocidadeXBolinha *= -1;
     }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

/*function verificaColisaoRaquete(x,y){
  if ((xBolinha - raio) < (x + comprimentoRaquete)
      && (yBolinha - raio) < (y + alturaRaquete)
      && (yBolinha + raio) > (y)) {
    velocidadeXBolinha *= -1;
  }
}*/

function verificaColisaoGithub(x,y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function marcaPontos() {
  if(xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
    xBolinha = 17
  }
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
    xBolinha = 583
  }
}

function mostraPlacar() {
  stroke(255);
  textAlign(CENTER);
  fill(color(245, 147, 66))
  rect(130,5,40,30)
  rect(430,5,40,30)
  textSize(20)
  fill(255);
  text(meusPontos, 150, 27);
  text(pontosDoOponente, 450, 27);
}

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}