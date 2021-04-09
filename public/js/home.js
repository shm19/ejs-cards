const url = new URL(window.location.href);
const previousBtn = document.querySelector('#pre-btn');
const nextBtn = document.querySelector('#next-btn');
const searchBtn = document.querySelector('#search-btn');
const inp = document.querySelector('#search-inp');

let page = +url.searchParams.get('page');

document.querySelector('#page-num').innerText = page ? page : 1;
previousBtn.addEventListener('click', () => {
  if (!page) {
    url.searchParams.set('page', 1);
    window.location.href = url.href;
  } else if (page > 1) {
    page--;
    url.searchParams.set('page', page);
    window.location.href = url.href;
  }
});
nextBtn.addEventListener('click', () => {
  page = page ? page + 1 : 2;
  url.searchParams.set('page', page);
  window.location.href = url.href;
});
searchBtn.addEventListener('click', e => {
  e.preventDefault();
  let newUrl = new URL(window.location.href);
  newUrl.pathname = '/search';
  newUrl.searchParams.set('tittle', inp.value);
  window.location.href = newUrl.href;
});
