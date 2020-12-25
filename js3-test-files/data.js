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
const houseDataArray = [];
const killedLords = [];

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

async function fetchedHouseData() {
  houseIdList.forEach(async (id) => {
    const houseData = await fetchData(
      `https://anapioficeandfire.com/api/houses/${id}`
    );

    const {name, currentLord} = houseData;
    houseDataArray.push({...houseData, id});
    let currentLordData;
    if (currentLord === '') {
      currentLordData = {
        name: 'Dead',
      };
    } else {
      currentLordData = await fetchData(currentLord);
    }

    const createHouseDiv = document.createElement('div');
    createHouseDiv.setAttribute('class', 'got-house');
    const createHouseTitle = document.createElement('h1');
    createHouseTitle.setAttribute('class', 'got-house__title');
    getTheHouseListDiv.appendChild(createHouseDiv);
    createHouseTitle.innerText = name;
    createHouseDiv.appendChild(createHouseTitle);
    const currentLordNameSpanElement = document.createElement('span');
    currentLordNameSpanElement.setAttribute('class', 'got-house__current-lord');
    currentLordNameSpanElement.id = id;
    currentLordNameSpanElement.innerText = currentLordData.name;
    createHouseDiv.appendChild(currentLordNameSpanElement);
  });
}

function getRandomElement(array) {
  const randomId = Math.floor(Math.random() * array.length);
  return array[randomId];
}

async function killLordRandomly() {
  const randomHouseId = getRandomElement(houseIdList);
  const houseData = houseDataArray.find((house) => house.id === randomHouseId);

  let randomSwornMember;
  randomSwornMember = getRandomElement(houseData.swornMembers);
  if (!killedLords.includes(randomSwornMember)) {
    killedLords.push(randomSwornMember);
  }
  const swornMemberData = await fetchData(randomSwornMember);

  const lordElement = document.getElementById(randomHouseId);
  lordElement.innerText = swornMemberData.name;
}

window.addEventListener('load', fetchedHouseData);
killLordButton.addEventListener('click', killLordRandomly);
