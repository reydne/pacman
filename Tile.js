/**
  * todos os diferentes tipos de peças
  */
const TYPES = [
  "BARRIER",
  "BISCUIT",
  "OPEN",
  "CHERRY",
  "GHOST",
  "PACMAN"
];

const TILE_SPEED = 0.2; // velocidade de movimento do ladrilho

const DIMENSIONS = 20;  // tamanho do campo

const SIZE = 25;  // tamanho de cada telha
const HALF_SIZE = SIZE / 2;
const THIRD_SIZE = SIZE / 3;
const QUARTER_SIZE = SIZE / 4;

/**
 * compõe o campo
 * as telhas podem ser movidas
 * os ladrilhos podem restringir o movimento
 */
function Tile(x, y, type, behavior) {

  this.x = x;
  this.y = y;
  this.type = type;

  this.destination = (-1, -1);
  this.moving = false;

  this.intact = true;

  this.speed = 0.2;

  this.behavior = behavior; // apenas fantasmas;  0 = agressivo, 1 = indiferente
}

/**
 *  lida com movimento, alimentação e IA
 */
Tile.prototype.update = function() {

  if (!this.intact) // não há necessidade de atualizar
    return;

  /* movimento */
  if (this.moving) {

    console.log(this.x, this.y, "antes de lerp");
    console.log(this.destination.x, this.destination.y);

    this.x = lerp(this.x, this.destination.x, this.speed);
    this.y = lerp(this.y, this.destination.y, this.speed);

    console.log(this.x, this.y, "depois de lerp");

    var distanceX = Math.abs(this.x - this.destination.x);
    var distanceY = Math.abs(this.y - this.destination.y);

    if (distanceX < 0.1 && distanceY < 0.1) { // arredondar para a posição mais próxima

      this.x = this.destination.x;
      this.y = this.destination.y;

      this.moving = false; // feito de mudança
    }
  }

  /* eating */
  if (this.type == "PACMAN") { // apenas PACMAN pode comer!

    // Bloco para o qual o Pac-man está se movendo
    var destinationTile = getTile(Math.floor(this.x), Math.floor(this.y));

    if (destinationTile.intact) {

      switch (destinationTile.type) {

        case "BISCUIT":
          score++;  // Vale 1 ponto
          destinationTile.intact = false;
          break;

        case "CHERRY":
          score += 10;  // vale 10 pontos
          destinationTile.intact = false;
          break;
      }
    }

    if (score == endScore) // verifique se o Pac-man ganhou
      endGame(true);

  } else if (this.type == "GHOST") {
    /* AI fantasmas */

    var distance = dist(pacman.x, pacman.y, this.x, this.y);

    if (distance < 0.3) // se Pac-man tocou em um FANTASMA
      endGame(false);

    /* movimentos */
    if (this.moving) // não pode se mover várias vezes ao mesmo tempo
      return;

    /* movimentos possíveis relativos */
    var possibleMoves = [

      getTile(this.x - 1, this.y),  // left
      getTile(this.x + 1, this.y),  // right
      getTile(this.x, this.y - 1),  // top
      getTile(this.x, this.y + 1),  // bottom
    ];

    /* classificar por distância do Pac-man */
    possibleMoves.sort(function (a, b) {

      var aD = dist(a.x, a.y, pacman.x, pacman.y);
      var bD = dist(b.x, b.y, pacman.x, pacman.y);

      return aD - bD;
    });

    if (this.behavior === 0) {  // se eles são agressivos

      for (var i = 0; i < possibleMoves.length; i++) {

        if (this.move(possibleMoves[i].x, possibleMoves[i].y, false)) { // tentativa de mover
          break;
        }
      }
    } else {
      // mova-se com indiferença
      var index = Math.floor(random(4));
      this.move(possibleMoves[index].x, possibleMoves[index].y, false);
    }

  }
};

Tile.prototype.draw = function() {

  switch (this.type) {

    case "BARRIER":

      strokeWeight(5);
      stroke(0);
      fill("#191970");
      rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
      break;

    case "BISCUIT":

      ellipseMode(CORNER);
      noStroke();
      fill(255);
      ellipse(this.x * SIZE + THIRD_SIZE, this.y * SIZE + THIRD_SIZE, THIRD_SIZE);
      break;

    case "CHERRY":

      ellipseMode(CORNER);
      stroke(255);
      strokeWeight(2);
      fill("#FF2222");
      ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
      break;

    case "GHOST":

      fill("#FF00EE");
      stroke(0);
      strokeWeight(1);

      /* desenhe um triângulo */
      beginShape();
      vertex(this.x * SIZE + HALF_SIZE, this.y * SIZE + QUARTER_SIZE);
      vertex(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + (QUARTER_SIZE * 3));
      vertex(this.x * SIZE + (QUARTER_SIZE * 3), this.y * SIZE + (QUARTER_SIZE * 3));
      endShape(CLOSE);
      break;

    case "PACMAN":

      ellipseMode(CORNER);
      stroke("#FFFF00");
      strokeWeight(5);
      fill("#FFFF33");
      ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
      break;

  }

};

/**
 * Calcula o movimento para usar dentro da função de atualização 
 * Retorna se é um movimento válido ou não
 */
Tile.prototype.move = function(x, y, relative) {

  var destinationX, destinationY;

  if (relative) { // em relação ao azulejo

    destinationX = this.x + x;
    destinationY = this.y + y;
  } else {

    destinationX = x;
    destinationY = y;
  }

  if (this.moving) // não há necessidade de recalcular tudo
    return false;

  var destinationTile = getTile(destinationX, destinationY);

  var type = destinationTile.type;

  if ((type == "BARRIER" && this.type != "BARRIER") ||   // apenas algumas peças podem
      (type == "GHOST" && this.type == "GHOST"))         // mover para outras peças certas
    return false;

  this.moving = true; // começar o movimento próxima atualização
  this.destination = createVector(destinationX, destinationY);

  return true;
};

/**
 * retorna a peça com coordenadas (x, y)
 */
function getTile(x, y) {

  return field[y * DIMENSIONS + x];
}
