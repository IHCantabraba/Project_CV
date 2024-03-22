export function setupCounter(element) {
  let counter = localStorage.getItem('counterNumber')

  const setCounter = (count) => {
    counter = count
    element.innerHTML = Number(counter) + 1
  }
  localStorage.setItem('counterNumber', counter)
  setCounter(counter)
}
