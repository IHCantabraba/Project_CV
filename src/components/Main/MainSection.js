import './MainSection_style.css'
import { CreateUl, CreateMap } from '../Object_Fucntions/funtions'
const hobbies = [
  'Sports',
  'Culture',
  'GeoSpatialData',
  'Programming',
  'ISR Technology',
  'Forestry',
  'WebApps'
]

export function AddMainData() {
  /* crear el main */
  const main = document.createElement('main')

  /* Crear seccion */
  const section = document.createElement('section')
  section.className = 'section'
  /* SECCIÓN ABOUT ME */
  /* añadir el nombre de la sección */
  const h2 = document.createElement('h2')
  h2.innerHTML = 'About Inigo'
  h2.id = 'about-inigo'
  /* Añadir imagen a la sección about me */
  const img = document.createElement('img')
  img.id = 'inigo-logo'
  img.setAttribute(
    'src',
    'https://res.cloudinary.com/df7b0dj9r/image/upload/v1703753748/pegatina_grsrlp.png'
  )
  /* crear una lista */
  const ul = CreateUl(hobbies)
  ul.id = 'main-ul'
  /* SECCIÓN EXPERIENCIAS */
  /* crear sección Experiencia */
  const expBtn = document.createElement('button')
  expBtn.className = 'exp-btn'
  expBtn.innerHTML = 'Experiencia'
  /* event lister para añadir artículos */
  /* creamos contenerdor */
  const articleDiv = document.createElement('section')
  articleDiv.className = 'article-div hide'
  /* crear artículo */
  const article = document.createElement('img')
  article.id = 'Work'
  article.src =
    'https://res.cloudinary.com/df7b0dj9r/image/upload/v1700500558/tracks_hzxl5u.png'
  articleDiv.appendChild(article)
  /*añadir una clase para hacer visibles los aetículos */
  expBtn.addEventListener('click', () => {
    console.log('clicked')
    articleDiv.classList.toggle('hide')
  })

  /* Añadir elementos al main y al body */
  section.appendChild(h2)
  section.appendChild(img)
  section.appendChild(ul)

  main.appendChild(section)
  main.appendChild(expBtn)
  /* AÑADIR UN MAPA */

  // const mapDiv = document.createElement('div')
  // mapDiv.id = 'map'
  // main.appendChild(mapDiv)

  CreateMap()

  main.appendChild(articleDiv)
  document.body.insertBefore(main, document.querySelector('#map'))
}
