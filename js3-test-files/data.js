// data.forEach((element) => {
//   getTheHouseListDiv.innerHTML = `<div class="got-house">
//   <h1 class="got-house__title">${element.name}</h1>
//   <span class="got-house__current-lord">${element.currentLord.name}</span>
// </div>`;

function main() {
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

  const killLordButton = document.getElementById('kill-random-lord-button');
  const getTheHouseListDiv = document.getElementById('got-house-list');

  function fetchedHouseData() {
    houseIdList.forEach((houseId) => {
      fetch(`https://anapioficeandfire.com/api/houses/${houseId}`)
        .then((response) => {
          const data = response.json();
          return data;
        })
        .then((data) => {
          const createHouseDiv = document.createElement('div');
          createHouseDiv.setAttribute('class', 'got-house');
          const createHouseTitle = document.createElement('h1');
          createHouseTitle.setAttribute('class', 'got-house__title');
          getTheHouseListDiv.appendChild(createHouseDiv);
          createHouseTitle.innerText = data.name;
          createHouseDiv.appendChild(createHouseTitle);
          const currentLordNameSpanElement = document.createElement('span');
          currentLordNameSpanElement.setAttribute(
            'class',
            'got-house__current-lord'
          );
          fetchLordData(houseId, currentLordNameSpanElement, data);
          createHouseDiv.appendChild(currentLordNameSpanElement);
        })
        .catch((error) => {
          console.log('err', error);
        });
    });
  }
  fetchedHouseData();

  function fetchLordData(id, lordName, swornData) {
    fetch(`https://anapioficeandfire.com/api/characters/${id}`)
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        lordName.innerText = data.name;
        if (data.name.length === 0) {
          const randomChoiceOfSworn = Math.floor(
            Math.random() * swornData.swornMembers.length
          );
          fetch(`${swornData.swornMembers[randomChoiceOfSworn]}`)
            .then((response) => {
              const data = response.json();
              return data;
            })
            .then((res) => {
              lordName.innerText = res.name;
            });
        }
      })
      .catch((error) => {
        console.log('err', error);
      });
  }

  function killLord() {
    const currentLordNames = document.querySelector('.got-house__current-lord');

    const randomKill = Math.floor(Math.random() * currentLordNames.length);
    houseIdList.forEach((id) => {
      fetch(`https://anapioficeandfire.com/api/houses/${id}`)
        .then((response) => {
          const data = response.json();
          return data;
        })
        .then((result) => {
          const randomSelect = Math.floor(
            Math.random() * result.swornMembers.length.name
          );
          currentLordNames.innerText = randomSelect;
        });
    });
  }
  killLordButton.addEventListener('click', killLord);
}

window.onload = main;
