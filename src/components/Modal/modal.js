import './modal_style.css'
import { AddHeaderData, followAnchors } from '../Header/header'
import { AddMainData } from '../Main/MainSection'
import { AddFooterData } from '../Footer/footer'
import { setupCounter } from '../counter/counter'

export let MODAL
export function AddModalView() {
  const mainDiv = document.createElement('div')
  mainDiv.id = 'mainDiv'
  const modal = document.createElement('div')
  const image = document.createElement('img')
  image.setAttribute(
    'src',
    'https://res.cloudinary.com/df7b0dj9r/image/upload/v1710955450/antifaz_nyigd1.png'
  )
  image.alt = 'antifaz'
  image.id = 'antifaz-image'
  modal.id = 'modal-div'
  const text = document.createElement('h2')
  text.id = 'modal-text'
  text.innerHTML = 'Are you ready?'
  const button = document.createElement('button')
  button.id = 'modal-button'
  button.innerHTML = 'Sure!'
  modal.appendChild(image)
  modal.appendChild(text)
  modal.appendChild(button)
  mainDiv.appendChild(modal)

  button.addEventListener('click', function (event) {
    if (event) {
      RemoveModal()
      MODAL = true
      AddHeaderData()
      let counter = document.querySelector('#count')
      setupCounter(counter)
      AddMainData()
      AddFooterData()
      followAnchors()
    }
  })
  document.body.appendChild(mainDiv)
}
const RemoveModal = () => {
  document.querySelector('#mainDiv').remove()
  const mapa = document.querySelector('#map')
  mapa.classList.toggle('map-hiden')
}
