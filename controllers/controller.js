    const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const pool = require("../db");

function getUsers(req, res) {
    res.status(200).json({
    message: "Users",
    user : req.user

    }); 
}




 async function login(req, res) {
    const { email, password } = req.body;

   
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    
    const query = `
        SELECT id, name, email, password, role
        FROM users
        WHERE email = $1
    `;

    const result = await pool.query(query, [email]);

    
    if (result.rows.length === 0) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    
    const user = result.rows[0];

    
    const isMatch = await bcrypt.compare(password, user.password);

    
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET
    );

   
    return res.status(200).json({
        message: "Login successful",
        token: token
    });
}


async function register(req, res) {
    
  const {name , email , password} = req.body ;
 
  if (!email|| !password || !name){
     return res.status(400).json({
      message:"invalid"
    });
 
  }



  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, role
`;



try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        query,
        [name, email, hashedPassword]
    );



  




  
  
    return res.status(201).json({
    message: "User registered successfully",
    user: result.rows[0]
});
  

}catch (error) {
          

    if (error.code === "23505") {
        return res.status(409).json({
            message: "Email already exists"
        });
    }
    return res.status(500).json({
      message: "Internal server error"
    });
}


}



   



 module.exports ={ getUsers , login , register};