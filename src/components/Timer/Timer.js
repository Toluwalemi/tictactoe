import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import { WebSocketContext } from "../../WebSocket";
import { otherSide } from "../../shared/utility";
import useTimer from "../../hooks/useTimer";

const Timer = ({ side }) => {
  const ws = useContext(WebSocketContext);
  const { toPlay, gameStarted, gameOver } = useSelector((state) => state.game);
  const [time, start, pause, reset] = useTimer(10);

  useEffect(() => {
    gameStarted && reset();
  }, [gameStarted, reset]);

  useEffect(() => {
    if (time === 0 && gameStarted) {
      ws.fixWinner(otherSide(side));
      reset();
    }
  }, [gameStarted, ws, side, time, reset]);

  useEffect(() => {
    gameStarted && toPlay === side ? start() : pause();
    gameOver && pause();
  }, [gameStarted, gameOver, start, pause, reset, toPlay, side, time]);
  return <div>{time}</div>;
};

export default Timer;
