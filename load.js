const API = require('space-api').API
const api = new API('unotech', 'http://localhost:4122');
const db = api.DB("db");


const insert = async (index) => {
  const name = `name-${index}`
  const email = `email-${index}`
  const department = (index % 2 == 0) ? 'marketing' : 'sales'

  var response = await db.insert("users").doc({ name, email, department }).apply()
  if (response.status != 200) {
    console.log('Error:', response)
    return
  }
  console.log('inserted:', index)
  return
}

var index = 0
setInterval(() => {
  insert(index);
  index++
}, 50)
