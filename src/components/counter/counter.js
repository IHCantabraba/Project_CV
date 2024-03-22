export function setupCounter(element) {
  let counter = localStorage.getItem('counterNumber') || '0'
  if (counter === '0') {
    counter = '1'
  }
  const setCounter = (count) => {
    counter = count
    element.innerHTML = Number(counter) + 1
  }
  localStorage.setItem('counterNumber', Number(counter) + 1)

  setCounter(counter)
}
