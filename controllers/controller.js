

const { loginService ,registerService } = require("../services/authService");

function getUsers(req, res) {
  res.status(200).json({
    message: "Users",
    user: req.user,
  });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const token = await loginService(email, password);

    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    next(error);
  }
}






async function register(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const user = await registerService(name, email, password);

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    next(error);
  }
}


   
  



module.exports = { getUsers, login, register };
