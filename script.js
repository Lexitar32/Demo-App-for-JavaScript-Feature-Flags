const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get User Function
async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);

        createUserCard(data);

        let showRepoResponse = JSON.parse(localStorage.getItem("Show-Repository-Feature"));

        // Show User Repository once it is switched on
        if (showRepoResponse === true) {
            getRepos(username);
        }
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('No profile with this username');
        }
    }
}

// Get Repository Function
async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch (err) {
        createErrorCard('Problem fetching repos')
    }
}

// Structure of Show User
function createUserCard(user) {
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
}

// Error Message Card
function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

// Adding Repository to card
function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if (user) {
        getUser(user)

        search.value = ''
    }
})


// Auto Text Writer Feature
const text = "You can search for your github profile...";

let index = 0;

function writeText() {
    document.getElementById('mainHeader').innerText = text.slice(0, index);

    index++;

    if (index > text.length) {
        index = 0;
    }
}

window.onload = function () {
    let autoTextResponse = JSON.parse(localStorage.getItem("Auto-Text-Feature"));

    // Display Auto Text Writer if it is switched on
    if (autoTextResponse === true) {
        setInterval(() => {
            writeText();
        }, 200);
    }
};