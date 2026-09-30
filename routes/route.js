    const express = require("express");
    const {getUsers,login , register} = require("../controllers/controller");
    const { logger, authMiddleware , adminMiddleware } = require("../middleware/middleware");
    const router = express.Router();
    const { registerValidation , loginValidation } = require("../middleware/validation");


    router.get("/users",logger , authMiddleware , adminMiddleware,  getUsers );

    router.post("/login",loginValidation ,login);

    router.post("/register",registerValidation ,register);
    
    module.exports = router;