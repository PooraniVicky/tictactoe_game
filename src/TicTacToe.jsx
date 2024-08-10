import React, { useReducer } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Grid, Paper, Typography } from '@mui/material';

const initialState = {
    board: Array(9).fill(null),
    xIsNext: true,
    winner: null,
    openDialog: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'make_move':
            if (state.board[action.index] || state.winner) {
                return state;
            }
            const boardCopy = [...state.board];
            boardCopy[action.index] = state.xIsNext ? 'X' : 'O';
            const winner = calculateWinner(boardCopy);
            const isBoardfull = boardCopy.every(cell => cell !== null);
            return {
                ...state,
                board: boardCopy,
                xIsNext: !state.xIsNext,
                winner: winner,
                openDialog: !!winner || isBoardfull
            };
        case 'reset':
            return { ...initialState, board: Array(9).fill(null) };
        case 'close_dialog':
            return { ...state, openDialog: false };
        default:
            throw new Error('Unhandled action type');
    }
}

function calculateWinner(board) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
}

function TicTacToe() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div className='game'>
            <Typography variant="h3" component="h1" align="center" color="grey" gutterBottom>
                Tic-Tac-Toe Game
            </Typography>
            <div style={{ marginBottom: 10 }}>
                <Typography variant="h4" component="h2" color="white">
                    Player 1 : X
                </Typography>
                <Typography variant="h4" component="h2" color="white">
                    Player 2 : O
                </Typography>
            </div>
            
            <Grid container spacing={1} justifyContent='center' sx={{ maxWidth: { xs: 300, sm: 400 }, margin: 'auto' }}>
                {state.board.map((cell, index) => (
                    <Grid item xs={4} key={index}>
                        <Paper className='cell' elevation={3} onClick={() => dispatch({ type: 'make_move', index })}>
                            {cell}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Button 
                variant='contained' 
                onClick={() => dispatch({ type: 'reset' })} 
                sx={{ marginTop: 2 }}
            >
                Reset Game
            </Button>
            <Dialog open={state.openDialog} onClose={() => dispatch({ type: 'close_dialog' })}>
                <DialogTitle>
                    {state.winner ? `${state.winner} wins!` : 'Draw'}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => dispatch({ type: 'reset' })} color='primary'>
                        Restart
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TicTacToe;
