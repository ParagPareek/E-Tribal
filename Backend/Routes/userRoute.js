import express from 'express'
import {getUser, login, signUp} from '../Controller/userController.js'
import VerifyToken from '../middleware/VerifyToken.js';

const route = express.Router();

route.post('/signup', signUp)
route.post('/login',login)
route.get('/:id',getUser)

export default route;