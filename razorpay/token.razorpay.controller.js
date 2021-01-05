const Razorpay = require("razorpay");
const shortid = require("shortid");
var instance = new Razorpay({
  key_id: "rzp_test_fFhVXzu4VxWtSr",
  key_secret: "NSqUOkxHzL03EWh9r9r8LO5e"
});

let fetchToken = async (req, res) => {
  try {
    const { customer_id, token_id } = req.params;
    const result = await instance.customers.fetchToken(customer_id, token_id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};

let deleteToken = async (req, res) => {
  try {
    const { customer_id, token_id } = req.body;
    const result = await instance.customers.deleteToken(customer_id, token_id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};

module.exports = {
  fetchToken,
  deleteToken
};
