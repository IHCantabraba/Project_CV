import './footer_styles.css'

const iconLinks = {
  linkedin:
    'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710779361/linkedin_uf74bs.png',
  instagram:
    'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710780057/instagram_iqbner.png'
}

export function AddFooterData() {
  /* crear el footer */
  const footer = document.createElement('footer')
  const iconsDiv = document.createElement('div')
  iconsDiv.id = 'icons-div'

  const footerDiv = document.createElement('div')
  footerDiv.id = 'footer-div'

  /* crear texto footer */
  const h3 = `<h3> &copy Created By Iñigo Hidalgo Cantabrana </h3>`
  footerDiv.innerHTML = h3
  Object.keys(iconLinks).forEach((element) => {
    const link = document.createElement('a')
    link.href =
      'linkedin.com?url=www.linkedin.com/in/i%C3%B1igo-hidalgo-cantabrana-ba3a759a'
    link.target = '_blank'
    const linkdinLogo = document.createElement('img')
    linkdinLogo.setAttribute('src', iconLinks[element])
    link.appendChild(linkdinLogo)
    iconsDiv.appendChild(link)
  })
  footerDiv.appendChild(iconsDiv)
  footer.appendChild(footerDiv)
  document.body.appendChild(footer)
}
