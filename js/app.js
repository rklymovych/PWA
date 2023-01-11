window.addEventListener('load', async () => {
  try {
    if ('serviceWorker' in navigator) {
      let reg = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiseWorker success', reg);
    }
  } catch (error) {
    console.log('ServiseWorker not founf', error);
  }
})