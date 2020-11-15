/*
  This list gives the ids of all the great houses that we want to look up.
  It should be inserted into the html above all the other files to ensure it is available
*/
const houseIdList = [
  7, // Eyrie
  17, // Baratheon
  169, // Greyjoy
  229, // Lannister
  362, // Stark
  378, // Targaryen
  395, // Tully
  398, // Tyrell
];

// data.forEach((element) => {
//   getTheHouseListDiv.innerHTML = `<div class="got-house">
//   <h1 class="got-house__title">${element.name}</h1>
//   <span class="got-house__current-lord">${element.currentLord.name}</span>
// </div>`;

function main() {
  const killLordButton = document.getElementById('kill-random-lord-button');
  const getTheHouseListDiv = document.getElementById('got-house-list');
  const getTheHouseDiv = document.querySelector('.got-house');

  function fetchedHouseData() {
    fetch('https://anapioficeandfire.com/api/houses/')
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        data.forEach((element) => {
          console.log(element);
          const createHouseDiv = document.createElement('div');
          createHouseDiv.setAttribute('class', 'got-house');
          const createHouseTitle = document.createElement('h1');
          createHouseTitle.setAttribute('class', 'got-house__title');
          getTheHouseListDiv.appendChild(createHouseDiv);
          createHouseTitle.innerText = element.name;
          createHouseDiv.appendChild(createHouseTitle);
        });
      })
      .catch((error) => {
        console.log('err', error);
      });
  }

  fetchedHouseData();
  function displayLordData() {
    fetch('https://anapioficeandfire.com/api/characters/`${houseIdList}`')
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        for (let i = 0; i <= houseIdList.length; i++) {
          const currentLordNameSpanElement = document.createElement('span');
          currentLordNameSpanElement.setAttribute(
            'class',
            'got-house__current-lord'
          );
          currentLordNameSpanElement.innerText = element.name;
          getTheHouseDiv.appendChild(currentLordNameSpanElement);
        }
      })
      .catch((error) => {
        console.log('err', error);
      });
  }
  displayLordData();

  function killLord() {}
  function killLordWhenButtonClicked() {
    killLordButton.addEventListener('click');
  }
}

window.onload = main;
