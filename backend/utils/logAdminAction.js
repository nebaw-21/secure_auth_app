import AuditLog from "../models/AuditLog.js"; // Ensure the correct extension

async function logAdminAction(adminId, action, targetUserId, details = '') {
    try {
        const log = new AuditLog({
            adminId,
            action,
            targetUserId,
            details
        });
        await log.save();
    } catch (error) {
        console.error('Error logging admin action:', error.message);
    }
}

// Export using ES6 syntax
export default logAdminAction;