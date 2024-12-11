"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTimeConflict = void 0;
const hasTimeConflict = (assignedSchedule, newSchedule) => {
    for (const schedule of assignedSchedule) {
        const existingStartTime = new Date(`2000-03-18T${schedule.startTime}`);
        const existingEndTime = new Date(`2000-03-18T${schedule.endTime}`);
        const newEndTime = new Date(`2000-03-18T${newSchedule.endTime}`);
        const newStartTime = new Date(`2000-03-18T${newSchedule.startTime}`);
        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            return true;
        }
    }
    return false;
};
exports.hasTimeConflict = hasTimeConflict;
