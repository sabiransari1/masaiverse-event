const url = `https://masaiverse-event-json-server-sabiransari1.onrender.com`;
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value;
  const age = form.age.value;
  const place = form.place.value;
  const batch = form.batch.value;
  const profession = form.profession.value;

  if (!name || !age || !place || !batch || !profession) {
    alert('Please Fill Empty Section');
    return;
  }

  const user = {
    name,
    age,
    place,
    batch_name: batch,
    profession,
  };

  if (name && age && place && batch && profession) {
    userPost(url, user);
  }
});

const userPost = async (url, user) => {
  try {
    let res = await fetch(`${url}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    let data = await res.json();

    if (Object.keys(data).length) {
      alert('User Register Successfully');
    } else {
      alert('Something went wrong, Please try again');
    }
  } catch (error) {
    alert(error);
  }
};
