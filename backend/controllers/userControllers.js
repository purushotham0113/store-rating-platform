import db from "../config/db.js"
import bcrypt from 'bcrypt'

const getMe = async (req, res) => {
    try {
        const [users] = await db.query('select id,name,email,role from users where id = ?', [req.user.id])

        return res.status(200).json({
            success: true,
            message: "Successfully fetched user Details",
            user: users[0]
        })

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const [users] = await db.query('select id,name,email,password from users where id = ?', [req.user.id])
        const user = users[0];

        const isMatched = await bcrypt.compare(currentPassword, user.password)

        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.query('update users set password = ? where id = ?', [hashedPassword, req.user.id])
        // console.log(users)

        return res.status(200).json({
            success: true,
            message: "Password changed Successfully",
            user: {
                id: req.user.id,
                name: user.name,
                email: user.email,
                role: req.user.role
            }
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export { getMe, changePassword }