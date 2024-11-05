const app = require("./app");
const PORT = process.env.PORT || 5040;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
