// models/ActivityLog.js
import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    details: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;