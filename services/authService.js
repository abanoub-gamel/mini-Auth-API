const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

async function loginService(email, password) {
  const query = `
        SELECT id, name, email, password, role
        FROM users
        WHERE email = $1
    `;

  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    throw new AppError("Invalid email or password",401);
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password",401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  return token;
}

async function registerService(name, email, password) {
  const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, role
    `;
 try {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(query, [name, email, hashedPassword]);

  return result.rows[0];

} catch (error) {

  if (error.code === "23505") {
    throw new AppError("Email already exists", 409);
  }
  throw error ; 
}

}





module.exports = { loginService, registerService };
