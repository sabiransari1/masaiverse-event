const url = `https://masaiverse-event-json-server-sabiransari1.onrender.com`;
const main = document.getElementById('main');
const limit = 5;
let page = 1;
const sortage = document.getElementById('sortage');
const filterprofession = document.getElementById('filterprofession');
const pervious = document.getElementById('pervious');
const showpage = document.getElementById('showpage');
const next = document.getElementById('next');
let userData = null;

window.addEventListener('load', () => {
  const token = JSON.parse(localStorage.getItem('token')) || null;

  if (!token) {
    location.replace('login.html');
    return;
  }

  fetchData(url);
});

showpage.innerText = page;

const paramObj = {
  _limit: limit,
  _page: page,
};

const queryparams = new URLSearchParams(paramObj);

// fetchData
const fetchData = async (url, queryparams = {}) => {
  try {
    let res = await fetch(`${url}/users?${queryparams}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });

    let data = await res.json();
    userData = data;

    getData(data);
  } catch (error) {
    alert(error);
  }
};

// getData
const getData = (data) => {
  main.innerHTML = null;

  data.forEach((item) => {
    main.append(
      getCard(
        item.id,
        'http://jaggerbathroom.com/wp-content/uploads/2017/08/demo-user.png',
        item.name,
        item.age,
        item.place,
        item.batch_name,
        item.profession
      )
    );
  });
};

// getCard
const getCard = (id, img, name, age, place, batch_name, profession) => {
  let cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'cardDiv');

  let imgx = document.createElement('img');
  imgx.setAttribute('src', img);

  let namex = document.createElement('h3');
  namex.innerText = `Name: ${name}`;

  let agex = document.createElement('p');
  agex.innerText = `Age: ${age}`;

  let placex = document.createElement('p');
  placex.innerText = `Place: ${place}`;

  let batch_namex = document.createElement('p');
  batch_namex.innerText = `Batch: ${batch_name}`;

  let professionx = document.createElement('p');
  professionx.innerText = `Profession: ${profession}`;

  let editx = document.createElement('button');
  editx.innerText = 'Edit';

  let deletex = document.createElement('button');
  deletex.innerText = 'Delete';
  deletex.addEventListener('click', () => {
    deleteFunc(url, id);
  });

  cardDiv.append(
    imgx,
    namex,
    agex,
    placex,
    batch_namex,
    professionx,
    editx,
    deletex
  );

  return cardDiv;
};

// sort
sortage.addEventListener('change', () => {
  let order = sortage.value;

  order && (paramObj._order = order);
  order && (paramObj._sort = 'age');

  if (!order) {
    fetchData(url, queryparams);
    return;
  }

  const queryparams = new URLSearchParams(paramObj);

  fetchData(url, queryparams);
});

// filter
filterprofession.addEventListener('change', () => {
  let filter = filterprofession.value;

  filter && (paramObj.profession = filter);

  if (!filter) {
    fetchData(url, queryparams);
    return;
  }

  const queryparams = new URLSearchParams(paramObj);

  fetchData(url, queryparams);
});

// pagination
pervious.addEventListener('click', () => {
  page--;

  if (page == 0) {
    page = 1;
  }

  showpage.innerText = page;

  const queryparams = new URLSearchParams(paramObj);

  fetchData(url, queryparams);
});

next.addEventListener('click', () => {
  page++;
  showpage.innerText = page;

  if (userData.length == 0) {
    page = 1;
    const queryparams = new URLSearchParams(paramObj);

    fetchData(url, queryparams);

    return;
  }

  const queryparams = new URLSearchParams(paramObj);

  fetchData(url, queryparams);
});

// delete func
const deleteFunc = async (url, id) => {
  try {
    let res = await fetch(`${url}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });

    let data = await res.json();
    alert('User Deleted Successfully');

    fetchData(url, queryparams);
  } catch (error) {
    alert(error);
  }
};

// edit func
