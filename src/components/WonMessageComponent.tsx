import React, { FC } from 'react';

interface WonMessageComponentProps {
    winner: string
    setWinner: (arg: string | null) => void;
    restart: () => void;
}

const WonMessageComponent: FC<WonMessageComponentProps> = ({winner, restart, setWinner}) => {
    return (
        <div className="won-message">
            Game over! Winner: {winner}
            <button onClick={() => {restart(); setWinner(null)}}>Start new</button>
        </div>
    );
};

export default WonMessageComponent;