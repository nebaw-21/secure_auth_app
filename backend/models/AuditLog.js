import mongoose from "mongoose";

// Define the audit log schema
const auditLogSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // e.g., "update", "delete"
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    details: { type: String }, // Optional: Additional details about the action
    timestamp: { type: Date, default: Date.now }
});

// Create the model
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

// Export using ES6 syntax
export default AuditLog;