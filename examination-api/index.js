const express = require("express");
const app = express();

app.use(express.json());

function isValidCitizenId(citizen_id) {
  if (citizen_id.length !== 13) return false;

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(citizen_id[i]) * (13 - i);
  }

  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === parseInt(citizen_id[12]);
}

app.post("/triangle-area", (req, res) => {
  const { base, height } = req.body;

  if (!base || !height) {
    return res
      .status(400)
      .json({ error: "Please provide both base and height." });
  }

  const area = 0.5 * base * height;
  res.json({ area });
});

app.post("/validate-citizen-id", (req, res) => {
  const { citizen_id } = req.body;

  if (!citizen_id) {
    return res.status(400).json({
      success: false,
      error_code: "001",
      error_msg: "citizen_id require",
    });
  }

  const isValid = isValidCitizenId(citizen_id);

  if (isValid) {
    return res.status(200).json({
      success: true,
      error_code: "200",
      error_msg: "",
    });
  } else {
    return res.status(400).json({
      success: false,
      error_code: "001",
      error_msg: "citizen_id invalid",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
