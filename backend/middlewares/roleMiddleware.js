
const roleMiddleware = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        // console.log(roles)
        // console.log(req.user)
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            })
        }
        next();
    }
}
export default roleMiddleware