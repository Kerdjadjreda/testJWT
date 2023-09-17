const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
require("dotenv").config();
app.use(express.json());

const users = [
    {
        id: "1",
        username: "bob",
        password: "1234",
        isAdmin: true,
    },
    {
        id: "2",
        username: "anna",
        password: "0000",
        isAdmin: false,
    },
];


const secretKey = process.env.JWT_SECRET_KEY;
const refreshedSecretKey = process.env.JWT_REFRESHED_SECRET_KEY;

// je crée un tableau vide qui contiendra le nouveau token
let refreshTokens = []

const generateAccessToken = (user)=>{
    return jwt.sign({id:user.id, isAdmin: user.isAdmin}, secretKey, { expiresIn: "5m" });
}
const generateRefreshedToken = (user) => {
    return jwt.sign({id:user.id, isAdmin: user.isAdmin}, refreshedSecretKey, { expiresIn: "15m" });
}


app.post("/api/refresh", (req,res)=>{
    const refreshToken = req.body.token

    // si je n'ai pas pu rafraichir le token, je gère l'erreur
    if(!refreshToken) return res.status(401).json("Vous n'êtes pas connecté.");
    
    //Si le tableau ne contient pas le nouveau token, je gère l'erreur
    if(!refreshTokens.includes(refreshToken)) {
         return res.status(401).json("Vous n'êtes pas connecté."); 
        }
    jwt.verify(refreshToken, refreshedSecretKey, (err,user)=>{
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshedToken(user)

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken, refreshToken: newRefreshToken
        });
    });    
});


app.post("/api/login", (req,res)=> {
    const {username, password} = req.body;
    const user = users.find(u=>{
        return u.username === username && u.password === password;
    });
    if(user){
       const accessToken = generateAccessToken(user);
       const refreshToken = generateRefreshedToken(user);
       refreshTokens.push(refreshToken);
        res.json({
            username:user.username,
            isAdmin:user.isAdmin,
            accessToken,
            refreshToken
        })
    }else{
        res.status(400).json("Username or password incorrect !")
    }
    
});

const verify = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {

        const token = authHeader.split(" ")[1];
        jwt.verify(token, secretKey, (err,user) => {
            if(err) {
                return res.status(403).json("Token invalide");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("Vous n'êtes pas connecté");
    }
}
app.delete("/api/users/:userId", verify, (req,res)=> {
    if(req.user.id === req.params.userId || req.user.isAdmin) {
        res.status(200).json("Utilisateur supprimé")
    } else{
        res.status(403).json("Vous n'avez pas la permission de faire cela.")
    }
});


app.listen(5000, ()=> console.log("backend server is running!"));