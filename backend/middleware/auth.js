const jwt = require('jsonwebtoken');

// on export un medlleware classic
module.exports = (req, res, next) => {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'A156rt12345Ay11515QG335mOt153de955247PasSe1853459foRt');

        const idUSERS = decodedToken.idUSERS; 

        if (req.body.idUSERS && req.body.idUSERS !== idUSERS) { 
            throw 'User Id non valable !'; 
        } else { 
            next();
        }
    }catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }
};