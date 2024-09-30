import React from "react";
import {
    game_state_playing,
    game_state_win,
    game_state_draw
} from "../Constant";

const Header = ({gameState, currentPlayer, winPlayer}) => {

    const renderLabel = () => {
        switch(gameState){
            case game_state_playing:
                return <div>Player {currentPlayer}'s Turn</div>
            case game_state_win:
                return <div>Player {winPlayer} Wins!</div>
            case game_state_draw:
                return <div>Game is a Draw!</div>
            default:

        }
    }

    return (
        <div className="panel header">
            <div className="header-text">{renderLabel()}</div>
        </div>
    )
}

export default Header;