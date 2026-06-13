import jwt from 'jsonwebtoken';

const generateToken = (user) => {

    return jwt.sign({
        id: user.id,
        role: user.role
    },
        process.env.jwt_secret,
        {
            expiresIn: '1d'
        }
    )
}
export default generateToken