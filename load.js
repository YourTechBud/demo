const API = require('space-api').API
const api = new API('myproject', 'http://157.245.232.6:31005');
const db = api.DB("db");


const insert = async (index) => {
  var response = await api.call("greeter", "greet", {name: "Noorain"})
  if (response.status != 200) {
    console.log('Error:', response)
    return
  }
  console.log('inserted:', index, response.data)
  return
}

var index = 0
setInterval(() => {
  insert(index);
  index++
}, 100)
