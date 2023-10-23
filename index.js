const express = require("express");
const app = express();
const db = require("@cyclic.sh/dynamodb");
const cors = require("cors");

/*This is a built-in middleware function in Express. 
It parses incoming requests with JSON payloads and is based on body-parser.*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cors({
//   origin: 'https://tiny-cyan-turkey-tutu.cyclic.app/'
// }));

//Domino Abfangen
app.post("/domino", async (req, res) => {
  const dominoController = require("./src/domino/dominoController");
  const item = await dominoController.parseCall(req.body);
  res.json(item).end();
});

//Taboo Abfangen
app.post("/taboo", async (req, res) => {
  const tabooController = require("./src/taboo/tabooController");
  await tabooController.parseCall(req.body);
  const item = {
    content: 'done taboo'
  };
  res.json(item).end();
});

//Kreuzwort abfangen
app.post("/kreuzwort", async (req, res) => {
  const kreuzwortController = require("./src/kreuzwort/kreuzwortController");
  await kreuzwortController.parseCall(req.body);
  const item = {
    content: 'done kreuzwort'
  };
  res.json(item).end();
});

//wwm abfangen
app.post("/wwm", async (req, res) => {
  const wwmController = require("./src/wwm/wwmController");
  await wwmController.parseCall(req.body);
  const item = {
    content: 'done wwm'
  };
  res.json(item).end();
});

//Contributor abfangen
app.get("/contributor", async (req, res) => {
  //TODO
  res.json(item).end();
});

app.post("/db/:col/:key", async (req, res) => {
  console.log(req.body);

  const col = req.params.col;
  const key = req.params.key;
  console.log(
    `from collection: ${col} delete key: ${key} with params ${JSON.stringify(
      req.params
    )}`
  );
  const item = await db.collection(col).set(key, req.body);
  console.log(JSON.stringify(item, null, 2));
  res.json(item).end();
});

// Delete an item
app.delete("/db/:col/:key", async (req, res) => {
  const col = req.params.col;
  const key = req.params.key;
  console.log(
    `from collection: ${col} delete key: ${key} with params ${JSON.stringify(
      req.params
    )}`
  );
  const item = await db.collection(col).delete(key);
  console.log(JSON.stringify(item, null, 2));
  res.json(item).end();
});

// Get a single item
app.get("/db/:col/:key", async (req, res) => {
  const col = req.params.col;
  const key = req.params.key;
  console.log(
    `from collection: ${col} get key: ${key} with params ${JSON.stringify(
      req.params
    )}`
  );
  const item = await db.collection(col).get(key);
  console.log(JSON.stringify(item, null, 2));
  res.json(item).end();
});

// Get a full listing
app.get("/db/:col", async (req, res) => {
  const col = req.params.col;
  console.log(
    `list collection: ${col} with params: ${JSON.stringify(req.params)}`
  );
  const items = await db.collection(col).list();
  console.log(JSON.stringify(items, null, 2));
  res.json(items).end();
});

// Catch all handler for all other request.
app.use("*", (req, res) => {
  res.json({ msg: "no route handler found" }).end();
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`index.js listening on ${port}`);
});
