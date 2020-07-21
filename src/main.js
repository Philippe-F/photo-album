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
const pageElement = document.getElementById('numbers');
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

function paginateItems(items, wrapper, elementsPerPage) {
  wrapper.innerHTML = '';
  const pageCount = Math.ceil(items.length / elementsPerPage);

  for (let i = 1; i < pageCount + 1; i++) {
    let button = pageButton(i, items);
    wrapper.appendChild(button);
  };
};

function pageButton(page, items) {
  const btn = document.createElement('button');
  btn.innerText = page;

  if (currentPage == page) btn.classList.add('active');

  btn.addEventListener('click', function() {
    currentPage = page;
    photoList(items, indexElement, elementNum, currentPage);

    const currentBtn = document.querySelector('.pages button.active');
    currentBtn.classList.remove('active');

    btn.classList.add('active');
  });

  return btn;
};

fetch(req)
  .then(res => res.json())
  .then(json => {
    const photoArr = json.photos;
    photoList(photoArr, indexElement, elementNum, currentPage),
    paginateItems(photoArr, pageElement, elementNum)
  })
  .catch(err => console.log(err));