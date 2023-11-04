const url = `https://masaiverse-event-json-server-sabiransari1.onrender.com`;

window.addEventListener('load', () => {
  const token = JSON.parse(localStorage.getItem('token')) || null;

  if (!token) {
    location.replace('login.html');
    return;
  }

  fetchData(url);
});

let userData = null;
const tbody = document.getElementById('tbody');

// fetchData
const fetchData = async (url) => {
  try {
    let res = await fetch(`${url}/users`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });

    let data = await res.json();
    filterDataFunc(data);
  } catch (error) {
    // alert(error);
    console.log(error);
  }
};

// filterDataFunc
const filterDataFunc = (data) => {
  tbody.innerHTML = null;

  let guestsNo = data.length;
  let studentsNoArr = data.filter((item) => item.profession == 'Student');
  let professionalsNo = data.length - studentsNoArr.length;

  let totalAge = null;
  for (let i = 0; i < data.length; i++) {
    totalAge += Number(data[i].age);
  }

  let AverageAgeGuestsNo = (totalAge / 100) * guestsNo;

  tbody.append(
    getTable(
      guestsNo,
      studentsNoArr.length,
      professionalsNo,
      AverageAgeGuestsNo
    )
  );
};

// getTable
const getTable = (
  guestsNo,
  studentsNo,
  professionalsNo,
  AverageAgeGuestsNo
) => {
  let tr = document.createElement('tr');

  let guestsNox = document.createElement('td');
  guestsNox.innerText = guestsNo;

  let studentsNox = document.createElement('td');
  studentsNox.innerText = studentsNo;

  let professionalsNox = document.createElement('td');
  professionalsNox.innerText = professionalsNo;

  let AverageAgeGuestsNox = document.createElement('td');
  AverageAgeGuestsNox.innerText = AverageAgeGuestsNo;

  tr.append(guestsNox, studentsNox, professionalsNox, AverageAgeGuestsNox);

  return tr;
};
