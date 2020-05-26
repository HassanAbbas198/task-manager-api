const express = require('express');
const multer = require('multer');

const router = express.Router();

const UserController = require('../controllers/users');
const isAuth = require('../middleware/check-auth');

router.post('/users', UserController.createUser);

router.post('/users/login', UserController.login);

router.get('/users/me', isAuth, UserController.getProfile);

router.patch('/users/me', isAuth, UserController.updateUser);

const upload = multer({
	limits: {
		fileSize: 10000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			const error = new Error('Invalid file type, only images are allowed');
			error.statusCode = 400;
			return cb(error);
		}
		cb(undefined, true);
	},
});
router.post(
	'/users/me/image',
	isAuth,
	upload.single('image'),
	UserController.uploadImage
);

router.delete('/users/me/image', isAuth, UserController.deleteImage);

router.get('/users/:id/image', UserController.getImage);

router.delete('/users/me', isAuth, UserController.deleteUser);

router.post('/users/logout', isAuth, UserController.logout);

router.post('/users/logoutAll', isAuth, UserController.logoutAll);

module.exports = router;
