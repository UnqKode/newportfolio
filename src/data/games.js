// Real, verified GameDistribution.com embeds (checked live before adding - each
// entry's `gdId` was confirmed to resolve to the named game). Iframes are never
// created until a game is actually opened (see GamesApp.js), so nothing here
// costs any load until a visitor double-clicks a game.
const gd = (id) => `https://html5.gamedistribution.com/${id}/?gd_sdk_referrer_url=https://www.itsdevmanas.xyz/games`;

export const games = [
  { id: "snake", exeName: "Snake.exe", title: "Snake Classic", iconKey: "waves", color: "#16a34a", src: gd("2609b48eea7d40ebb414a1211dfed2af") },
  { id: "2048", exeName: "2048.exe", title: "2048", iconKey: "hash", color: "#f59e0b", src: gd("e4834283bce2457980b6cb1da52c1430") },
  { id: "tetris", exeName: "Tetris.exe", title: "Tetris", iconKey: "blocks", color: "#0ea5e9", src: gd("647536adcfa040668029eae70c72ce33") },
  { id: "tictactoe", exeName: "TicTacToe.exe", title: "Tic Tac Toe", iconKey: "grid3x3", color: "#a855f7", src: gd("7a353037e58643d3ba71c2e20d9781d0") },
  { id: "breakout", exeName: "Breakout.exe", title: "Brick Breaker", iconKey: "grid2x2", color: "#ef4444", src: gd("5f328ff269d34a94aeb25a69477f58a2") },
  { id: "pong", exeName: "Pong.exe", title: "Pong", iconKey: "circledot", color: "#64748b", src: gd("f9fd5940e65f485e81e6f77e359bbb85") },
  { id: "minesweeper", exeName: "Minesweeper.exe", title: "Minesweeper", iconKey: "bomb", color: "#78716c", src: gd("fa1e3fe036e94cd2b25b2f502937c212") },
  { id: "memory", exeName: "Memory.exe", title: "Memory Match", iconKey: "puzzle", color: "#ec4899", src: gd("4070010b5b374265b1295940133b3756") },
  { id: "whackamole", exeName: "WhackAMole.exe", title: "Whack a Mole", iconKey: "hammer", color: "#a16207", src: gd("130ad5176d834d0c87b572101a8c0538") },
  { id: "spaceinvaders", exeName: "SpaceInvaders.exe", title: "Space Invaders", iconKey: "rocket", color: "#22c55e", src: gd("dabff1f68f094a1d98ad075a2412ac75") },
  { id: "chess", exeName: "Chess.exe", title: "Chess", iconKey: "crown", color: "#eab308", src: gd("23ada7a4947d45da80d471400396bc41") },
  { id: "connectfour", exeName: "ConnectFour.exe", title: "Four in a Row", iconKey: "grid3x3", color: "#3b82f6", src: gd("af6816ecd68849a582e996889197f9d9") },
  { id: "sudoku", exeName: "Sudoku.exe", title: "Sudoku", iconKey: "hash", color: "#14b8a6", src: gd("d460edf318754839a8ab30502e12ba18") },
  { id: "bubbleshooter", exeName: "BubbleShooter.exe", title: "Bubble Shooter", iconKey: "circledot", color: "#8b5cf6", src: gd("b34a92d49e9348d591116bb98fe9dab1") },
  { id: "solitaire", exeName: "Solitaire.exe", title: "Klondike Solitaire", iconKey: "spade", color: "#059669", src: gd("96c578f96c3342b691b17faa51b69579") },
  { id: "8ballpool", exeName: "8BallPool.exe", title: "8 Ball Pool", iconKey: "target", color: "#1f2937", src: gd("d02120780e594158ab61869028223cf1") },
  { id: "fruitslicing", exeName: "FruitNinja.exe", title: "Fruit Slicing", iconKey: "sword", color: "#dc2626", src: gd("2da1f019d9954a2c94ab30f6646e043d") },
  { id: "basketball", exeName: "Basketball.exe", title: "Basketball Stars", iconKey: "target", color: "#f97316", src: gd("69d78d071f704fa183d75b4114ae40ec") },
  { id: "wordsearch", exeName: "WordSearch.exe", title: "Word Search", iconKey: "grid3x3", color: "#0891b2", src: gd("ad5d6826df06457fb3da5d9649f8c900") },
];
