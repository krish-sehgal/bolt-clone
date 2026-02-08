import User from '../models/user.js';
export async function createUser(req, res) {
    const { uid, email } = req.body;
    try {
        if (!uid || !email) {
            return res.status(400).json({
                success: false,
                message: 'all fields are required'
            });
        }
        const payload = { uid, email };
        const response = await User.create(payload);
        return res.json({
            success: true,
            message: response
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.json({
                success: false,
                message: error.message
            });
        }
        else {
            return res.json({
                success: false,
                message: 'unknown error:', error
            });
        }
    }
}
//# sourceMappingURL=userController.js.map