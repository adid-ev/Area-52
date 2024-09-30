import React, {useEffect, useState} from "react";
import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from "./Footer";
import '../Game.css';
import { isDraw, isWinner } from "../winner";

import{
    no_player,
    player_1,
    player_2,
    num_circles,
    game_state_playing,
    game_state_win,
    game_state_draw
} from "../Constant";

const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(16).fill(no_player));
    const [currentPlayer, setCurrentPlayer] = useState(player_1);
    const [gameState, setGameState] = useState(game_state_playing);
    const [winPlayer, setWinPlayer] = useState(no_player);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        console.log('init game')
        setGameBoard(Array(16).fill(no_player));
        setCurrentPlayer(player_1);
    }

    const initBoard = () => {
        const circles = [];
        for (let i = 0; i < num_circles; i++){
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const circleCLick = (id) => {
        console.log("Circle Clicked: " + id);

        if (gameBoard[id] !== no_player) return;
        if (gameState !== game_state_playing) return;

        if (isWinner(gameBoard, id, currentPlayer)){
            setWinPlayer(currentPlayer);
            setGameState(game_state_win);
        }
        
        if (isDraw(gameBoard, id, currentPlayer)){
            setWinPlayer(no_player);
            setGameState(game_state_draw);
        }

        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            }) 
        })

        setCurrentPlayer(currentPlayer === player_1 ? player_2 : player_1);

        console.log(currentPlayer);
        console.log(gameBoard);
    }
    const renderCircle = id => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClick={circleCLick}/>
    }
    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
            <div className="gameBoard">
                {initBoard()}
            </div>
            <Footer onClickEvent = {initGame}/>
        
        </>
    )
}

export default GameBoard;