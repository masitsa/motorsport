//initialize express app
const app = require("./app");

//initialize app port
const port = process.env.PORT || 5002;

//Run app on port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});