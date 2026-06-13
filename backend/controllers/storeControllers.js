import db from "../config/db.js"
import bcrypt from 'bcrypt'

const getStores = async (req, res) => {
    try {

        // const [stores] = await db.query('select s.id,s.name,s.address,coalesce(round(avg(r.rating),1),0) as averageRating,(select rating from ratings where user_id = ? and store_id = s.id) as UserRating from stores s left join ratings r on s.id = r.store_id group by s.id,s.name,s.address', [req.user.id])
        const [stores] = await db.query('select s.id,s.name,s.address,round(avg(r.rating),1) as averageRating,(select rating from ratings where user_id = ? and store_id = s.id) as UserRating from stores s left join ratings r on s.id = r.store_id group by s.id,s.name,s.address', [req.user.id])


        return res.status(200).json({
            success: true,
            message: "successfullly fetched the stores",
            stores
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}
const searchStores = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({
                success: false,
                messsage: "search keyword is missing"
            })
        }

        const [stores] = await db.query('select s.id,s.name,s.address,coalesce(round(avg(r.rating),1),0) as averageRating,(select rating from ratings where user_id = ? and store_id = s.id) as UserRating from stores s left join ratings r on s.id = r.store_id  where name like ? or address like ? group by s.id,s.name,s.address', [req.user.id, `%${keyword}%`, `%${keyword}%`])


        return res.status(200).json({
            success: true,
            message: "successfully fetched the stores",
            stores
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}

export { getStores, searchStores }
