const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  mongoose
    .connect(process.env.MONGODBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    })
    .catch((err) => {
      console.log(err);
    });
});
