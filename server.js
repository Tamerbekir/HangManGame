import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

// Add CORS middleware to allow your client origin
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // Adjust origin as needed

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5500', // Set your client’s origin here
    methods: ['GET', 'POST']
  }
});

// Your existing game state and socket events
let gameState = {
  userWord: '',
  underScoreWord: [],
  selectedLetters: [],
  wrongGuessCount: 0,
  bodyParts: []
};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('setWord', ({ userWord, wordWithUnderscore }) => {
    gameState.userWord = userWord;
    gameState.underScoreWord = wordWithUnderscore;
    gameState.selectedLetters = [];
    gameState.wrongGuessCount = 0;
    gameState.bodyParts = [];

    io.emit('gameStart', { wordWithUnderscore });
  });

  socket.on('makeGuess', ({ updatedWord, wrongGuessCount, bodyParts }) => {
    gameState.underScoreWord = updatedWord;
    gameState.wrongGuessCount = wrongGuessCount;
    gameState.bodyParts = bodyParts;

    io.emit('updateWord', { updatedWord, wrongGuessCount, bodyParts });
  });

  socket.on('resetGame', () => {
    gameState = {
      userWord: '',
      underScoreWord: [],
      selectedLetters: [],
      wrongGuessCount: 0,
      bodyParts: []
    };

    io.emit('resetGame');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
