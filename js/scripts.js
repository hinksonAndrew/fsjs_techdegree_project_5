const url = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');


/**
 * This gets the response from the randomuser api and converts to json
 * @param {url} url 
 */
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch(err) {
    gallery.insertAdjacentHTML('beforeend', `
    <h2>WARNING!!!! WARNING!!!!</h2>
    <h3>Complete core meltdown!!!!!</h3>
    <h4>Just kidding...something did go wrong but maybe just try a refresh.</h4>
    `);
    throw err;
  }
}

/**
 * gets json from getJSON and returns the results array with the people requested
 * @param {url} url 
 */
async function getPeople(url) {
  const peopleJSON = await getJSON(url);
  return results = await peopleJSON.results;
}

/**
 * Gets the results from the request and creates the card for each individual.
 * Returns data when finished with map.
 * @param {data} data 
 */
function generateHTML(data) {
  data.map(person => {
    gallery.insertAdjacentHTML('beforeend', `
      <div class="card click">
        <div class="card-img-container click">
          <img class="card-img click" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container click">
          <h3 id="name" class="card-name cap click">${person.name.first} ${person.name.last}</h3>
          <p class="card-text click">${person.email}</p>
          <p class="card-text cap click">${person.location.city}, ${person.location.state}</p>
        </div>
      </div>
    `)
  });
  return data;
}

/**
 * Formats given phonenumber to proper format
 * @param {telephoneNumber} text 
 */
function formatTelephone(text) {
  const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
  return text.replace(regex, '($1) $2-$3');
}

/**
 * formats given DOB to proper format 
 * @param {dateOfBirth} text 
 */
function formatDOB(text) {
  const regex = /^(\d{4})\D*(\d{2})\D*(\d{2}).*$/;
  return text.replace(regex, '$2/$3/$1');
}

/**
 * Only one person is passed in and a modal is created for them. Also adds functionality
 * to the close button so control is given back to site.
 * @param {data} data 
 */
function generateModal(data) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  body.appendChild(modalContainer);
  modalContainer.insertAdjacentHTML('beforeend', `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src="${data.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="modal-text">${data.email}</p>
        <p class="modal-text cap">${data.location.city}</p>
        <hr>
        <p class="modal-text">${formatTelephone(data.phone)}</p>
        <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.state}, ${data.location.postcode}</p>
        <p class="modal-text">Birthday: ${formatDOB(data.dob.date)}</p>
      </div>
    </div>
  `);

  const modal = document.querySelector('.modal-container');
  const btn = document.querySelector('button');
  btn.addEventListener('click', (e) => {
    modal.remove();
  })
}

/**
 * This goes through the various functions required to build site. It waits on a response
 * then creates an event listener on each card on the site.
 */
getPeople(url)
  .then(generateHTML)
  .then((data) => {
    const card = document.querySelectorAll('.card');
    for(let i = 0; i < data.length; i++) {
      card[i].addEventListener('click', () => generateModal(data[i]));
    }
  });