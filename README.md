| [Home]() | [Time](https) | [Descrição](/artefatos/) | [Links]() |
|-|-|-|-|

### Descrição do domínio

O domínio ao qual esse sistema multiagente será construído é um videogame de caça ao labirinto. Onde o jogador controla o personagem (Pac-Man) homônimo através de um labirinto fechado. O objetivo do jogo é comer todos os pontos colocados no labirinto, evitando quatro fantasmas coloridos - Blinky (vermelho), Pinky (rosa), Inky (ciano) e Clyde (laranja) - que o perseguem. Quando todos os pontos são comidos, o jogador avança para o próximo nível. Se Pac-Man fizer contato com um fantasma, ele perderá uma vida;

### Descrição do ambiente

Para esse projeto o ambiente deve ser um labirinto contendo obstáculos e alimentos. Esse ambiente, portanto, se caracteriza como determinístico, uma vez que o próximo estado do ambiente é completamente determinado pelo estado atual e ações executadas pelos agentes. É semi-dinâmico porque o ambiente não muda com a passagem do tempo, porém a performance do agente sim. Se caracteriza como discreto porque existe um conjunto finito de estados. E, por fim, acessível, uma vez que os agentes fantasmas têm acesso completo ao estado do ambiente.

### Objetivo
Por se tratar de um sistema multiagente, esse sistema tem duas categorias de agentes: agentes chamados de pac-man e agentes chamados de fantasmas. O objetivo desse sistema é simular um jogo de arcade chamado Pac-man. Dito isto, os objetivos de cada agentes são:

  Pac-man: Percorrer todo o labirinto capturando todos os alimentos disponíveis no ambiente, podendo desviar dos obstáculos e desviar dos fantasmas.

  Fantasmas: Percorrer o ambiente, desviar dos obstáculos em busca de capturar o Pac-man. 


## Time
|![Reydne](https://user-images.githubusercontent.com/28721925/95084810-c7466b80-06f4-11eb-85d4-b1e5bdce4099.jpg) <br>Reydne Bruno<br>rbs8@cin.ufpe.br|![Moisés](https://user-images.githubusercontent.com/28721925/95085952-438d7e80-06f6-11eb-9fe2-d7dbd88a1393.jpg) <br>Moisés Neves<br><mnc3@cin.ufpe.br>| ![Ricardo](https://user-images.githubusercontent.com/28721925/95084749-b1d14180-06f4-11eb-8202-164dc415c329.jpg) <br>Ricardo Rodriges<br><rjrlf@cin.ufpe.br>
|-|-|-|

## Descrição do Sistema 
### Pac-Man
  O pac-man originalmente é um jogo de arcade lançado inicialmente no ano de 1980. Esse jogo tem como objetivo simular um labirinto com agentes de perseguição.   
(Referências: https://en.wikipedia.org/wiki/List_of_Pac-Man_video_games)

### Componentes do Sistema 
  O sistema sistema contido nesse repositório tem os seguintes componentes:  


## Links Úteis
- [Implementação Pac-Man em P5](https://www.youtube.com/watch?v=gz9kNwwglsc&t=8172s&ab_channel=Kaelinator)
- [Referencial sobre Pac-Man](https://en.wikipedia.org/wiki/List_of_Pac-Man_video_games)

