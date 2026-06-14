import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    try {
        // console.log(req.headers)
        const authHeader = req.headers.authorization


        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "toke not found"
            })
        }
        const token = authHeader.split(' ')[1];
        // console.log(token)

        const decoded = jwt.verify(token, process.env.jwt_secret)
        // console.log(decoded)
        req.user = decoded;
        next();

    } catch (err) {
        console.error(err.message);
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        })

    }
}

export default authMiddleware;