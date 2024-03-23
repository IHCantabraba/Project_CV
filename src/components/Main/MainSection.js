import './MainSection_style.css'
import { CreateUl, CreateMap } from '../Object_Fucntions/funtions'
const hobbies = [
  'Sports',
  'Culture',
  'GeoSpatialData',
  'Programming',
  'ISR Tech.',
  'Forestry',
  'WebApps'
]
const articulosExperiencia = [
  {
    img: 'https://res.cloudinary.com/df7b0dj9r/image/upload/v1700500558/tracks_hzxl5u.png',
    text: '3 Years developing Geographical Information Systems and Misison Systems'
  },
  {
    img: 'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,h_200,w_250/v1711134887/code_dtjlnd.png',
    text: '6 Years Python programming On-promise Sw'
  },
  {
    img: 'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,h_200,w_250/v1711135416/gimbal_uebtao.png',
    text: '2 Years as Surveillance Operations team Leader'
  }
]
const articulosProjectos = [
  {
    img: 'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_250/v1711140116/on-promise_uvai17.png',
    name: 'Nombre proyecto',
    text: 'Sw on Pomise Fo Surveillance Operations Management'
  },
  {
    img: 'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_250/v1711140116/on-promise_uvai17.png',
    name: 'Nombre proyecto',
    text: 'Sw on Pomise Fo Surveillance Operations Management'
  },
  {
    img: 'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_250/v1711140116/on-promise_uvai17.png',
    name: 'Nombre proyecto',
    text: 'Sw on Pomise Fo Surveillance Operations Management'
  }
]

export function AddMainData() {
  /* crear el main */
  const main = document.createElement('main')
  /* Crear seccion */
  const section = createSection('section', 'section')

  /* SECCIÓN ABOUT ME */
  /* añadir el nombre de la sección */
  const h2 = createH2('about-inigo', 'About Inigo')

  /* Añadir imagen a la sección about me */
  const img = createImg(
    'inigo-logo',
    'https://res.cloudinary.com/df7b0dj9r/image/upload/v1703753748/pegatina_grsrlp.png'
  )
  /* crear una lista */
  const ul = CreateUl(hobbies)
  ul.id = 'main-ul'

  //// SECCIÓN EDUCACIÓN ////
  /* crear sección */
  const educationSec = createSection('section', 'section')
  /* Crear título de la seccion */
  const educationH2 = createH2('education-title', 'Education')
  const educationH3 = createH2('education-h2', 'Bachelor of Forestry')
  const educationPUniversity = createObj(
    'p',
    'education-P-year',
    ' Polytechnical School of Mieres'
  )
  const educationPyear = createObj('p', 'education-P-bachelor', '2015')
  const educationPmark = createObj('p', 'education-P-mark', '')
  const educationH2rel = createH2('education-h3-relevant', 'Relevant Courses')
  const educationPcourse1 = createObj(
    'p',
    'education-P-course1',
    'Echos In Sky Radar data Processing'
  )
  const educationPcourse2 = createObj(
    'p',
    'education-P-course2',
    'Python for ArcGis Advanced Level'
  )
  const educationPcourse3 = createObj(
    'p',
    'education-P-course3',
    ' Pandas Geospatial Data processing'
  )
  const educationPcourse4 = createObj(
    'p',
    'education-P-course4',
    ' RockTheCode - Web Development'
  )
  const educationPcourse5 = createObj(
    'p',
    'education-P-course5',
    ' -  -  -  -  -  -  -  -  -'
  )

  /* Añadir objetos a la seccion */
  educationSec.appendChild(educationH2)
  educationSec.appendChild(educationH3)
  educationSec.appendChild(educationPyear)
  educationSec.appendChild(educationPUniversity)
  educationSec.appendChild(educationPmark)
  educationSec.appendChild(educationH2rel)
  educationSec.appendChild(educationPcourse1)
  educationSec.appendChild(educationPcourse2)
  educationSec.appendChild(educationPcourse3)
  educationSec.appendChild(educationPcourse4)
  educationSec.appendChild(educationPcourse5)

  /* SECCIÓN EXPERIENCIAS */
  /* crear sección Experiencia */
  const expBtn = createBtn('exp-btn', 'Show Experience')

  /* creamos contenerdor */
  const articleDiv = createSection('section', 'article-div hide')
  createArticle(articulosExperiencia, articleDiv)

  /* event lister para añadir artículos */
  /*añadir una clase para hacer visibles los aetículos */
  expBtn.addEventListener('click', () => {
    console.log('clicked')
    articleDiv.classList.toggle('hide')
  })

  /* Añadir elementos al main y al body */
  section.appendChild(h2)
  section.appendChild(img)
  section.appendChild(ul)
  /* RECENT PROYECTS */
  /* crear sección */
  const sectionProject = createSection('section', 'section-projects')
  const projectsTitle = createObj('h2', 'project-title', 'Relevant Proyects')
  const articlesDiv = createObj('div', 'div-projects')

  sectionProject.appendChild(projectsTitle)
  createArticleProjects(articulosProjectos, articlesDiv)
  sectionProject.appendChild(articlesDiv)
  articlesDiv
  /* AÑADIR UN MAPA */
  /* crear boton para los breadcrumbs */
  const BreadCrumbsBtn = document.createElement('button')
  BreadCrumbsBtn.className = 'Tracking-btn'
  BreadCrumbsBtn.classList.toggle('hide')
  BreadCrumbsBtn.innerHTML = 'Show Tracking!'
  BreadCrumbsBtn.addEventListener('click', () => {
    if (BreadCrumbsBtn.classList.contains('hide')) {
      BreadCrumbsBtn.classList.remove('hide')
    } else {
      BreadCrumbsBtn.classList.toggle('hide')
    }
  })
  CreateMap()
  /* añadir la seccion al main */
  main.appendChild(section)
  main.appendChild(educationSec)
  main.appendChild(expBtn)
  main.appendChild(articleDiv)
  main.appendChild(sectionProject)
  main.appendChild(BreadCrumbsBtn)
  /* insertar el main en el body antes que el mapa */
  document.body.insertBefore(main, document.querySelector('#map'))
}

/* Crear contenedor artículo */
const createArticle = (articulos, articulosDIV) => {
  articulos.forEach((article) => {
    /* crear artículo */
    const articleCont = document.createElement('article')
    articleCont.className = 'experience-articles'
    const articleImg = document.createElement('img')
    articleImg.className = 'Work'
    articleImg.src = article.img
    const articleText = document.createElement('p')
    articleText.className = 'article-text'
    articleText.innerHTML = article.text
    articleCont.appendChild(articleImg)
    articleCont.appendChild(articleText)
    articulosDIV.appendChild(articleCont)

    // ' 6 Años de Experiencia en Desarrollo de Sistemas de Informacion Cartográfica'
  })
}

/* crear contenedor projectos */

const createArticleProjects = (articulos, articulosDIV) => {
  articulos.forEach((article) => {
    /* crear artículo */
    const articleCont = document.createElement('article')
    articleCont.className = 'projectoe-articles'
    const articleImg = document.createElement('img')
    articleImg.className = 'WorkingPrject'
    articleImg.src = article.img
    const projectName = createH2('project-name', article.name)
    const articleText = document.createElement('p')
    articleText.className = 'article-text'
    articleText.innerHTML = article.text
    articleCont.appendChild(articleImg)
    articleCont.appendChild(projectName)
    articleCont.appendChild(articleText)
    articulosDIV.appendChild(articleCont)
  })
}
/* crear contenedor de sección */
const createSection = (type, classNm) => {
  const newSectiom = document.createElement(type)
  newSectiom.className = classNm
  return newSectiom
}
/* Crear  Imagen */
const createImg = (id, src) => {
  const newImg = document.createElement('img')
  newImg.id = newImg
  newImg.setAttribute('src', src)
  return newImg
}
/* Crear Boton */

const createBtn = (classNm, text) => {
  const newBtn = document.createElement('button')
  newBtn.className = classNm
  newBtn.innerHTML = text
  return newBtn
}

const createH2 = (id, text) => {
  const h2 = document.createElement('h2')
  h2.id = id
  h2.innerHTML = text
  return h2
}

const createObj = (type, id, text = '') => {
  const obj = document.createElement(type)
  obj.id = id

  if (!text == '') {
    obj.innerHTML = text
  }
  return obj
}
