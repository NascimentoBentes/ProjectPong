// variaveis da bolinha
let xBola = 300;
let yBola = 200;
let diametro = 20;
let raio = diametro / 2;

// variaveis do movimento da bolinha
let velocidadeXBola = 6;
let velocidadeYBola = 6;

// variaveis da minha raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let colisaoRetanguloBola = false;

// variaveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let yVelocidadeOponente;

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3")
}

function setup(){
    createCanvas(600, 400);
    trilha.loop();
}

function draw(){
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiplacar();
    marcarPonto();
    bolaNaoFicaPresa();
}

function mostraBolinha(){
    //desenha a bola no cenário
    circle(xBola, yBola, diametro);
}

function movimentaBolinha(){
    // cria o movimento da bola no cenário
    xBola += velocidadeXBola;
    yBola += velocidadeYBola;
}

function verificaColisaoBorda(){
    // reconhece as bordas pra bola não passar
    if(xBola + raio > width || xBola - raio < 0){
        velocidadeXBola *= -1;
    }
    if (yBola + raio > height || yBola - raio < 0){
        velocidadeYBola *= -1;
    }
}

function mostraRaquete(x, y){
    // cria a minha raquete no cenário
    rect(x, y, raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete(){
    // define as teclas pra mover a minha raquete
    if (keyIsDown(UP_ARROW)){
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)){
        yRaquete += 10;
    }
}

function verificaColisaoRaquete(x, y){
    // usando a biblioteca feita por outra pessoa e colisão entre bola e raquete
    colisaoRetanguloBola = collideRectCircle(x , y, raqueteComprimento, raqueteAltura, xBola, yBola, raio);
    if (colisaoRetanguloBola){
        velocidadeXBola *= -1;
        raquetada.play();
    }
}

function movimentaRaqueteOponente(){
    // define as teclas pra mover a raquete do oponente
    if(keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if(keyIsDown(83)){
        yRaqueteOponente += 10;
    }
}

function incluiplacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(30, 144, 255));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(30, 144, 255));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcarPonto(){
    if(xBola > 590){
        meusPontos += 1;
        ponto.play();
    }
    if(xBola < 10){
        pontosDoOponente += 1;
        ponto.play();
    }
}

function bolaNaoFicaPresa(){
    if(xBola - raio < 0){
        xBola = 23;
    }
}