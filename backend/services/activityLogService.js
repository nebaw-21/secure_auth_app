// services/activityLogService.js
import ActivityLog from '../models/ActivityLog.js';

const logActivity = async (userId, action, details) => {
    // Ensure ActivityLog model is defined correctly
    const logEntry = new ActivityLog({
        userId,
        action,
        details,
    });

    try {
        await logEntry.save();
    } catch (error) {
        console.error('Error logging activity:', error);
    }
};

export default logActivity;