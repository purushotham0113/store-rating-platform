import bcrypt from 'bcrypt'
import db from '../config/db.js'
import generateToken from '../utils/generateToken.js';

const register = async (req, res) => {
    try {
        const { name, email, address, password } = req.body;

        if (!name || !email || !address || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"

            })
        }
        const [existingUser] = await db.query('SELECT * from users where email = ?', [email])

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query('insert into users(name, email, password, address, role) values(?,?,?,?,?)',
            [name, email, hashedPassword, address, 'USER'])

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            result: result.insertId
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}

const login = async (req, res) => {
    try {
        // console.log("debug")
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }


        const [users] = await db.query('select * from users where email = ?', [email]);

        if (users.length == 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"

            })
        }

        const user = users[0];
        const isMatched = await bcrypt.compare(password, user.password);


        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"

            })
        }
        const jwt = generateToken(user);


        // console.log(users);

        return res.status(200).json({
            success: true,
            message: "login successfully completed",
            jwt,
            role: user.role

        })

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: "Internel server error"
        })

    }
}

export { register, login };