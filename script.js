function c(q) { console.dir(q)}



function addCard(data) {
  const cards = document.querySelector('.cards')
  const tmpl = document.querySelector('#tmpl-card')
  const card = tmpl.content.cloneNode(true)
  const fieldName = card.querySelector('.card__name')
  const fieldOwner = card.querySelector('.card__owner')
  const fieldStars = card.querySelector('.card__stars')

  fieldName.textContent = `Name: ${data}`
  fieldOwner.textContent = `Owner: ${data}`
  fieldStars.textContent = `Stars: ${data}`

  cards.prepend(card)

}

function addDropdownRepo(name) {
  const dropdown = document.querySelector('.dropdown')
  const tmpl = document.querySelector('#dropdown-item')
  const dropdownItem = tmpl.content.cloneNode(true)
  
  dropdownItem.querySelector('.dropdown__item').textContent = name

  dropdown.append(dropdownItem)

}


addCard('data')
addCard('data2')
addCard('data2')
addCard('data2')
addCard('data2')

addDropdownRepo('name')
addDropdownRepo('name')
addDropdownRepo('name')
addDropdownRepo('name')
addDropdownRepo('name')