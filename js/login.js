const url = `https://reqres.in/api/login`;
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  if (!email || !password) {
    alert('Please Fill Empty Section');
    return;
  }

  const user = {
    email,
    password,
  };

  if (email && password) {
    login(url, user);
  }
});

const login = async (url, user) => {
  try {
    let res = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    let data = await res.json();

    if (data.token) {
      alert('Login Successful');
      localStorage.setItem('token', JSON.stringify(data.token));
      location.replace('data.html');
    }
  } catch (error) {
    alert(error);
  }
};
