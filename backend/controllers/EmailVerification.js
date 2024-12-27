import User from "../models/user.js";

const verifyEmail = async (req, res) => {
    const { token, userId } = req.params; // Get both token and userId

    try {
        const user = await User.findOne({ _id: userId, verificationToken: token }); // Use both for lookup

        if (!user) {


            return res.status(400).json({ message: "Invalid verification link" });
        }

        user.isVerified = true;
        user.verificationToken = undefined; // Clear the token
        await user.save();

       

        // Redirect with the JWT in a query parameter or as you need it
        res.redirect(`${process.env.FRONTEND_URL}/login`);


    } catch (error) {
        console.error("Email verification error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export { verifyEmail };