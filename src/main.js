import app from "./app.js";

const { API_PORT: PORT } = process.env;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
