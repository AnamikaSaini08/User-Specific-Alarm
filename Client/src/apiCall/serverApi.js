const serverUrl = 'http://localhost:4004';
function registerUser(body){
    const registerUrl = `${serverUrl}/register`
    const response = fetch(registerUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      response.then(x=> console.log('x----->',x)).then(y=> console.log('y---->',y));
}