    const express = require("express");
    const {getUsers,login , register} = require("../controllers/controller");
    const { logger, authMiddleware , adminMiddleware } = require("../middleware/middleware");
    const router = express.Router();


    router.get("/users",logger , authMiddleware , adminMiddleware,  getUsers );

    router.post("/login", login);

    router.post("/register", register);
    
    module.exports = router;