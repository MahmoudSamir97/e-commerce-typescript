export function debounce(func: () => void, timeout = 100) {
  let timer: number;

  return () => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func();
    }, timeout);
  };
}
