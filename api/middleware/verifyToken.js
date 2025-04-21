import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not Authenticated!" });
    };

    jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid!" });
        };

        /* this req.id is for verification of the user. if user tries delete a 
           post it will 1st check the user id of that post, if that user id is 
           equal to the req.id then it will allow the user to delete the post.
        */
        req.userId = payload.id;

        next();
    })
}