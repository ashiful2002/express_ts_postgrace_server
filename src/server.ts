import app from "./app";
import config from "./config";

const port = config.port;

app.listen(port, () => {
  console.log(`${"http://localhost:5500"} app listening on port ${port}`);
});
