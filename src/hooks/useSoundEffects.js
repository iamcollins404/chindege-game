import useSound from 'use-sound';

export const useSoundEffects = () => {
  // Using a continuous engine sound for flight
  const [playFlight, { stop: stopFlight }] = useSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', { 
    volume: 0.2,
    loop: true,
    interrupt: true
  });
  
  // Clapping sound for success
  const [playWin] = useSound('https://assets.mixkit.co/active_storage/sfx/157/157-preview.mp3', { 
    volume: 0.4,
    interrupt: true
  });
  
  // Crash/explosion sound
  const [playCrash] = useSound('https://assets.mixkit.co/active_storage/sfx/1680/1680-preview.mp3', { 
    volume: 0.4,
    interrupt: true
  });

  // Click/UI sound
  const [playClick] = useSound('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', { 
    volume: 0.3,
    interrupt: true
  });

  return {
    playFlight,
    stopFlight,
    playWin,
    playCrash,
    playClick
  };
};