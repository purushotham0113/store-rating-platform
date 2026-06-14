import db from "../config/db.js";
import bcrypt from 'bcrypt'

const dashboard = async (req, res) => {
    try {
        // console.log(req.user)
        const [[users]] = await db.query('select count(*) as usersCount from users')
        const [[stores]] = await db.query('select count(*) as storesCount from stores ')
        const [[ratings]] = await db.query('select count(*) as ratingsCount from ratings')


        return res.status(200).json({
            success: true,
            message: "successfully fetched dashboard details",
            users: users.usersCount,
            stores: stores.storesCount,
            ratings: ratings.ratingsCount
        })

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}
const createUser = async (req, res) => {
    try {
        const { name, email, address, password, role } = req.body;

        if (!name || !email || !address || !password || !role) {
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
            [name, email, hashedPassword, address, role])

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
const getUsers = async (re, res) => {
    try {
        const [users] = await db.query('select id,name,email,address,role from users')
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the users",
            users

        })

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}
const getUserById = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                messsage: "user ID is required"
            })

        }
        const [users] = await db.query('select name,email,address,role from users where id = ?', [id])

        if (users.length < 1) {
            return res.status(400).json({
                success: false,
                messsage: "Invalid user ID"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User details fetched successfuly",
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
const search = async (req, res) => {
    try {
        const { keyword } = req.query

        if (!keyword) {
            return res.status(400).json({
                success: FontFaceSetLoadEvent,
                message: "Keyword is required"
            })

        }

        const [users] = await db.query('select id,name,email,address,role from users where name like ? or email like ? or address like ? or role like ?', [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`])

        if (users.length == 0) {
            // console.log("inside")
            return res.status(400).json({
                success: false,
                message: "Zero users related to that search"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User details fetched successfuly",
            users
        })

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const getStores = async (req, res) => {
    try {
        const [stores] = await db.query('select s.id,s.name,s.email,s.address,round(avg(r.rating),1) as rating from stores s left join ratings r on s.id = r.store_id group by s.id,s.name,s.email,s.address')
        return res.status(200).json({
            success: true,
            message: "Store details fetched successfuly",
            stores
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}
const addStore = async (req, res) => {
    try {
        const { name, email, address, ownerId } = req.body;
        // console.log(req.body)

        if (!name || !email || !address || !ownerId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const [stores] = await db.query('select id  from stores where email = ?', [email])
        if (stores.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Another store has registered on this email"
            })
        }
        const [users] = await db.query(`select id from users where id = ? and role = 'STORE_OWNER'`, [ownerId])

        if (users.length == 0) {
            return res.status(400).json({
                success: false,
                message: "User is not listed as the store owner"
            })
        }

        // console.log("here")
        await db.query('insert into stores(name,email,address,owner_id) values(?,?,?,?)', [name, email, address, ownerId])
        return res.status(201).json({
            success: true,
            message: `store added with owner id ${ownerId}`
        })


    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const storeLess = async (req, res) => {
    try {
        const [users] = await db.query('select u.id,u.name,u.email,u.address from users u left join stores s on u.id=s.owner_id where u.role = ? and s.id is NULL', ['STORE_OWNER'])

        return res.status(200).json({
            success: true,
            message: "successfully fetched",
            users
        })

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}
export { dashboard, createUser, getUsers, getUserById, search, getStores, addStore, storeLess }