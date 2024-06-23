# Jogo da Velha (Tic-Tac-Toe)

Este é um Jogo da Velha feito em Javascript que funciona em linha de comando, no terminal. O jogo consiste em duas pessoas jogarem uma contra a outra ou o usuario escolher jogar contra o computador, no jogo da velha, vence quem conseguir uma sequencia de 3 simbolos iguais na horizontal, vertical ou diagonal primeiro, vence a partida o jogo é jogado em um tabuleiro 3x3.
Alem do Javascript tambem é utilizada a biblioteca readline para que o usuario possa interagir com o seu teclado no terminal.

## Como jogar

1. Clone o repositório.
2. Navegue até a pasta src no diretorio do projeto.
3. Instale as dependências.
4. Execute o script para iniciar o jogo.
5. Selecione se voce vai jogar contra o computador ou contra uma outra pessoa
6. Insira os nomes dos jogadores quando solicitado.
    6.1. Se voce escolheu jogar em 2 jogares. Alternadamente, insira as jogadas no formato "linha e coluna" (por exemplo, "0 0" para a posicao superior esquerda).
    6.2. Se voce escolheu jogar sozinho. Faca a primeira jogada e apos, o computador vai pensar qual a melhor estrategia contra voce e selecionar a posicao que ele queira, e assim sucessivamente
7. O jogo só terminará até que haja um vencedor ou um empate.
8. Após o fim do jogo, você será perguntado se deseja jogar novamente.

## Requisitos

- Node.js instalado na máquina.
Caso não tiver o Node.js instalado clique [aqui](https://nodejs.org/) para baixá-lo.


## Instruções de instalação e execução

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/jogo-da-velha.git
    cd jogo-da-velha
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Execute o jogo:

    ```bash
    node index.js
    ```
