import db from "../config/db.js";

const submitRating = async (req, res) => {
    try {
        const { storeId, rating } = req.body;
        if (!storeId || !rating) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        await db.query('insert into ratings (user_id,store_id,rating) values(?,?,?) on duplicate key update rating = values(rating),updated_at = current_timestamp', [req.user.id, storeId, rating])

        return res.status(200).json({
            success: true,
            message: "Rating submitted successfully",

        })

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export { submitRating }