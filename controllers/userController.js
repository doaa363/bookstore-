const User = require('../models/user'); // تأكد إن الاسم مطابق للي في فولدر models
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// 1) GET ALL USERS (Admin Only usually)
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users }
  });
});

// 2) UPDATE CURRENT USER DATA (Me)
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
  }

  // 2) Update user document (only allowed fields like name/email)
  const filteredBody = { name: req.body.name, email: req.body.email };
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: { user: updatedUser }
  });
});

// 3) DELETE CURRENT USER (Deactivate account)
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// 4) GET SINGLE USER BY ID
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};