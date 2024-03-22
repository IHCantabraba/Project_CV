import './style.css'
import { AddHeaderData, followAnchors } from '../src/components/Header/header'
import { AddMainData } from '../src/components/Main/MainSection'
import { AddFooterData } from '../src/components/Footer/footer'
import { AddModalView, MODAL } from '../src/components/Modal/modal'

// const modal = document.body.classList.contains('modal')
// if (modal) {

const init = () => {
  if (!MODAL) {
    AddModalView()
  } else {
    console.log('removing modal div')
    AddHeaderData()
    AddMainData()
    AddFooterData()
    followAnchors()
  }
}
init()
