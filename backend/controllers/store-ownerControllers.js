import db from "../config/db.js";

const getUsers = async (req, res) => {
    try {
        const [users] = await db.query('select u.id,u.name,u.email,r.rating from ratings r join users u on r.user_id = u.id join stores s on r.store_id = s.id where s.owner_id = ?', [req.user.id])
        return res.status(200).json({
            success: true,
            message: `list of users who submitted review for owner ${req.user.id}`,
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
const rating = async (req, res) => {
    try {
        // console.log(req.user)
        const [rating] = await db.query('select round(avg(r.rating),1) as totalRating from stores s left join ratings r on s.id = r.store_id where s.owner_id = ?', [req.user.id])
        return res.status(200).json({
            success: true,
            rating: rating[0].totalRating
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}
export { getUsers, rating }