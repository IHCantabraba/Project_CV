import '../Header/header_style.css'
import { CreateUl } from '../Object_Fucntions/funtions'
const listOptions = ['About Inigo', 'Education', 'Experience', 'Projects']

export function AddHeaderData() {
  /* adding title */
  const title = document.createElement('h1')
  title.innerHTML = "Inigo's CV"

  const divVisitas = document.createElement('div')
  divVisitas.id = 'vistas'

  const visits = document.createElement('h2')
  visits.innerHTML = 'Vistas:'
  divVisitas.appendChild(visits)
  const count = document.createElement('h3')
  count.id = 'count'
  count.innerHTML = '0'
  divVisitas.appendChild(count)
  const header = document.createElement('header')
  header.appendChild(title)
  header.appendChild(divVisitas)
  /* Adding UL */
  const ul = CreateUl(listOptions)
  header.appendChild(ul)
  document.body.insertBefore(header, document.querySelector('#map'))
}
/* smooth scroll when header list clicked */
export function followAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      console.log(anchor)
      e.preventDefault()
      anchor.scrollIntoView({
        behavior: 'smooth'
      })
      console.log('scrolled')
    })
  })
}
