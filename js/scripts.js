const url = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');

async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch(err) {
    throw err;
  }
}

async function getPeople(url) {
  const peopleJSON = await getJSON(url);
  const results = await peopleJSON.results;
  generateHTML(results);
}

function generateHTML(data) {
  data.map(person => {
    const section = document.createElement('section');
    gallery.appendChild(section);
    section.innerHTML = `
      <div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="card-text">${person.email}</p>
          <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
      </div>
    `;
  });
}

function generateModal(data) {

}

getPeople(url);

gallery.addEventListener('click', (event) => {
  if (event.target.className === 'card') {
    console.log('hit');
  }
});