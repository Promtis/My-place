const createTimer = elementTime => {
    let interval = null;
    let seconds = 0;

    const start = () => {
      if (!interval)
      seconds = 0;
      elementTime.innerText = seconds; 
      interval = setInterval(tick, 1000);
    };

    const stop = () => {
      clearInterval(interval);
      interval = null;
    };

    const tick = () => {
      seconds++;
      elementTime.innerText = seconds;
    };

    const getSeconds = () => seconds;

    return {
      start,
      stop,
      getSeconds,
    }
  };

