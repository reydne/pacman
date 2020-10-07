
/*
Esse código é uma adaptação de https://www.youtube.com/watch?v=gz9kNwwglsc&t=8172s&ab_channel=Kaelinator
 * 2D map of the field;
 * 0 = BARRIER
 * 1 = BISCUIT
 * 3 = CHERRY
 * 4 = GHOST
 * 5 = PAC-MAN
 */
const FIELD = [
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  "0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0",
  "0,1,1,1,1,1,1,1,0,4,1,4,0,1,1,1,1,3,1,0",
  "0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0",
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
];

var field = [];
var ghosts = [];

var pacman;
var score;
var endScore;

function setup() {
  createCanvas(500, 535);
  score = 0;
  field = generateField();
}

function draw() {
  background(51);
  drawHUD(); // campos & pontuação

  /* atualiza e desenha os fantamas */
  for (var j = 0; j < ghosts.length; j++) {
    ghosts[j].update();
    ghosts[j].draw();
  }

  pacman.update();
  pacman.draw();
  handleInput(); 
}

/**
 *  lida com a entrada do usuário
 */
function handleInput() {

  if (keyIsDown(UP_ARROW)) {

    pacman.move(0, -1, true);
  } else if (keyIsDown(DOWN_ARROW)) {

    pacman.move(0, 1, true);
  } else if (keyIsDown(LEFT_ARROW)) {

    pacman.move(-1, 0, true);
  } else if (keyIsDown(RIGHT_ARROW)) {

    pacman.move(1, 0, true);
  }
}

/**
 * desenha todas as peças, exceto os tipos FANTASMA e PACMAN
 * empates pontuação
 */
function drawHUD() {

  /* campo */
  for (var i = 0; i < field.length; i++) {

    if (field[i].intact) {

      if (field[i].type != "GHOST" && field[i].type != "PACMAN")
        field[i].draw();
    }
  }

  /* Pontuação */
  noStroke();
  fill(255);
  textSize(30);
  textAlign(LEFT);
  text(score, 5, height - 5);
}

function endGame(won) {

  textSize(60);
  textAlign(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(5);

  if (won) {

    text("Você ganhou!", width / 2, height / 2);
  } else {

    text("Você perdeu!", width / 2, height / 2);
  }
  textSize(50);
  text("Pressione f5", width / 2, height / 2 + 50);

  noLoop();
}

/**
 * preenche arrays de campo e fantasma
 * inicializa o Pac-man
 * com base na constante FIELD
 */
function generateField() {

  var f = []; // retorna array

  var ghostId = 0; // tratamento do comportamento do fantasma
  for (var i = 0; i < FIELD.length; i++) { // loop por cada corda string

    var row = FIELD[i].split(",");
    for (var j = 0; j < row.length; j++) { // percorrer os números na string

      var type = TYPES[row[j]];
      var tile = new Tile(j, i, type, -1);

      switch (type) {

        case "PACMAN":
          pacman = tile;
          f.push(new Tile(j, i, "OPEN"));
          break;

        case "GHOST":
          var behavior = (ghostId % 2); // todos os outros fantasmas serão agressivos
          ghosts.push(new Tile(j, i, type, behavior));
          f.push(new Tile(j, i, "OPEN"));
          ghostId++;
          break;

        case "BARRIER":
          f.push(tile);
          break;

        case "CHERRY":
          endScore += 10; // vale 10 pontos
          f.push(tile);
          break;

        case "BISCUIT":
          endScore++; // vale 1 ponto
          f.push(tile);
          break;
      }

    }
  }
  return f;
}
