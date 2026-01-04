const express = require('express');
const router = express.Router();
const {
  getPendingReports,
  approveReport,
  rejectReport,
  getAllReports,
  getBlacklist,
  removeFromBlacklist,
  // Thêm các hàm quản lý user vào đây
  getAllUsers,
  updateUserRole,
  deleteUser
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(protect);
router.use(admin);

// Report routes
router.get('/reports/pending', getPendingReports);
router.get('/reports', getAllReports);
router.post('/reports/:id/approve', approveReport);
router.post('/reports/:id/reject', rejectReport);

// Blacklist routes
router.get('/blacklist', getBlacklist);
router.delete('/blacklist/:id', removeFromBlacklist);

// Đảm bảo chỉ admin mới truy cập được các route này
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id/role', protect, admin, updateUserRole);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;
