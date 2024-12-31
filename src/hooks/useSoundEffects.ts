import useSound from 'use-sound';

export const useSoundEffects = () => {
  const [playFlight, { stop: stopFlight }] = useSound('/sounds/flight.mp3', { 
    volume: 0.5,
    loop: true 
  });
  
  const [playWin] = useSound('/sounds/win.mp3', { 
    volume: 0.7 
  });
  
  const [playCrash] = useSound('/sounds/crash.mp3', { 
    volume: 0.7 
  });

  const [playClick] = useSound('/sounds/click.mp3', { 
    volume: 0.5 
  });

  return {
    playFlight,
    stopFlight,
    playWin,
    playCrash,
    playClick
  };
};