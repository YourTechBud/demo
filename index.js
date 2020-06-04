var {API, cond} = require('space-api')
var express = require("express");
var app = express();

const api = new API('myproject', 'http://gateway.space-cloud.svc.cluster.local:4122');
const db = api.DB("db");

app.use(express.json());

app.get("/user/:userId", async (req, res) => {
  const response = await db.get("user_app_mapping").where(cond('user_id', '==', req.params.userId)).apply()
  console.log('Get response:', response)
  res.send(JSON.stringify(response.data))
})

app.post("/event/add-user", async (req, res) => {
  // Get the number from the body

  console.log('Received:', JSON.stringify(req.body))

  var status = 0
  switch (req.body.data.doc.department) {
    case 'sales': {
      const response = await db.insert("user_app_mapping").doc({ user_id: req.body.data.doc.id, app: 'salesforce' }).apply()
      status = response.status
      break;
    }
    case 'engineering': {
      var response = await db.insert("user_app_mapping").doc({ user_id: req.body.data.doc.id, app: 'space-cloud' }).apply()
      response = await db.insert("user_app_mapping").doc({ user_id: req.body.data.doc.id, app: 'aws' }).apply()
      status = response.status
      console.log('Error:', response)
      break;
    }
    case 'marketing': {
      const response = await db.insert("user_app_mapping").doc({ user_id: req.body.data.doc.id, app: 'mailchimp' }).apply()
      status = response.status
      break;
    }
    default:
      status = -1
      break;
  }

  if (status == -1) {
    res.status(500).send(JSON.stringify({ error: 'invalid app' }))
  } else if (status != 200) {
    res.status(500).send(JSON.stringify({ error: 'Unable to insert in database' }))
  } else {
    res.status(200).send(JSON.stringify({}))
  }
});

var server = app.listen(8080, () => {
  console.log("app running on port:", server.address().port);
});