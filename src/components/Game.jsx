import { useState, useEffect, useCallback } from 'react';
import { Header } from './Header';
import { GameArea } from './GameArea';
import { ConfirmationModal } from './ConfirmationModal';
import { ResultsModal } from './ResultsModal';
import { useSoundEffects } from '../hooks/useSoundEffects';

export const Game = () => {
  const sounds = useSoundEffects();
  const [isFlying, setIsFlying] = useState(false);
  const [multiplier, setMultiplier] = useState(0.1);
  const [balance, setBalance] = useState(40);
  const [betAmount, setBetAmount] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [crashPoint, setCrashPoint] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [lastWinAmount, setLastWinAmount] = useState(0);
  const [resultType, setResultType] = useState('win');

  const resetGameState = useCallback(() => {
    setIsFlying(false);
    setMultiplier(0.1);
    setGameOver(false);
    setCrashPoint(0);
    setShowConfirmation(false);
    setShowResults(false);
  }, []);

  const startGame = useCallback(() => {
    if (balance < betAmount) return;

    const minCrash = 1.2;
    const maxCrash = 10;
    const newCrashPoint = minCrash + Math.random() * (maxCrash - minCrash);
    
    setCrashPoint(newCrashPoint);
    setIsFlying(true);
    setMultiplier(0.1);
    setGameOver(false);
    setBalance(prev => prev - betAmount);
    setShowConfirmation(false);
    try {
      sounds.playFlight();
    } catch (error) {
      console.error('Error playing flight sound:', error);
    }
  }, [balance, betAmount, sounds]);

  const handlePlayClick = useCallback(() => {
    if (balance < betAmount) return;
    try {
      sounds.playClick();
    } catch (error) {
      console.error('Error playing click sound:', error);
    }
    setShowConfirmation(true);
  }, [balance, betAmount, sounds]);

  const handlePlayAgain = useCallback(() => {
    resetGameState();
  }, [resetGameState]);

  const cashOut = useCallback(() => {
    if (isFlying && !gameOver) {
      try {
        sounds.playWin();
        if (sounds.stopFlight) {
          sounds.stopFlight();
        }
      } catch (error) {
        console.error('Error playing win sound:', error);
      }
      const winAmount = Number((betAmount * multiplier).toFixed(2));
      setBalance(prev => prev + winAmount);
      setHighScore(prev => Math.max(prev, winAmount));
      setIsFlying(false);
      setLastWinAmount(winAmount);
      setResultType('win');
      setShowConfirmation(false);
      setShowResults(true);
    }
  }, [isFlying, gameOver, multiplier, betAmount, sounds]);

  useEffect(() => {
    let interval;
    if (isFlying && !gameOver) {
      interval = setInterval(() => {
        setMultiplier(prev => {
          const increment = 0.01;
          const nextMultiplier = prev + increment;

          if (nextMultiplier >= crashPoint) {
            try {
              sounds.playCrash();
              if (sounds.stopFlight) {
                sounds.stopFlight();
              }
            } catch (error) {
              console.error('Error playing crash sound:', error);
            }
            setGameOver(true);
            setIsFlying(false);
            setResultType('crash');
            setShowConfirmation(false);
            setShowResults(true);
            return prev;
          }
          return nextMultiplier;
        });
      }, 100);
    }
    return () => {
      clearInterval(interval);
      if (!isFlying && sounds.stopFlight) {
        try {
          sounds.stopFlight();
        } catch (error) {
          console.error('Error stopping flight sound:', error);
        }
      }
    };
  }, [isFlying, gameOver, crashPoint, sounds]);

  return (
    <div className="px-4 py-4 md:py-8 flex flex-col gap-8">
      <Header 
        balance={balance} 
        highScore={highScore} 
        betAmount={betAmount}
        onBetChange={(amount) => {
          try {
            sounds.playClick();
          } catch (error) {
            console.error('Error playing click sound:', error);
          }
          if (amount <= balance) {
            setBetAmount(amount);
          }
        }}
      />
      <GameArea 
        multiplier={multiplier} 
        isFlying={isFlying}
        onStart={handlePlayClick}
        canStart={balance >= betAmount}
        onCashOut={cashOut}
        betAmount={betAmount}
      />
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          try {
            sounds.playClick();
          } catch (error) {
            console.error('Error playing click sound:', error);
          }
          setShowConfirmation(false);
        }}
        onConfirm={startGame}
        betAmount={betAmount}
        playClick={sounds.playClick}
      />
      <ResultsModal
        isOpen={showResults}
        onClose={() => {
          try {
            sounds.playClick();
          } catch (error) {
            console.error('Error playing click sound:', error);
          }
          setShowResults(false);
          resetGameState();
        }}
        onPlayAgain={handlePlayAgain}
        multiplier={multiplier}
        winAmount={lastWinAmount}
        type={resultType}
        playClick={sounds.playClick}
      />
    </div>
  );
};