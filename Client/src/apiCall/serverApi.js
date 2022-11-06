const serverUrl = 'http://localhost:4004';
async function registerUser(body){
    const registerUrl = `${serverUrl}/user/register`;
    const response = await fetch(registerUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    console.log('response', response.json());
    // response.then(x=> console.log('x----->',x)).then(y=> console.log('y---->',y));
}

async function login(body){
    const loginUrl = `${serverUrl}/user/login`;
    const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    return response.json();
    // console.log('response', response.json());
    // return response;
}

const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    // return response;
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return response.json()
    }
  }
module.exports = {registerUser, login, fetchData}