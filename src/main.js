import apiKey from '../config/keys.js';

const uri = 'https://api.pexels.com/v1/search?query=water&per_page=50';
const header = new Headers();
const key = apiKey.key;
header.append('Authorization', key);

const req = new Request(uri, {
  method: 'GET',
  headers: header
});

const indexElement = document.getElementById('index');
let currentPage = 1;
let elementNum = 10;

function photoList(items, wrapper, elementNum, page) {
  wrapper.innerHTML = '';
  page--;

  let start = elementNum * page;
  let end = start + elementNum;
  let pageItems = items.slice(start, end);

  for (let i = 0; i < pageItems.length; i++) {
    let item = pageItems[i].src.tiny;
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.innerHTML = `<img src=${item} />`; 

    wrapper.appendChild(itemElement);
  };
};

fetch(req)
  .then(res => res.json())
  .then(json => {
    const photoArr = json.photos;
    photoList(photoArr, indexElement, elementNum, currentPage)
  })
  .catch(err => console.log(err));