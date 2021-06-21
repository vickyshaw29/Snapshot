const express=require('express')
const router=express.Router()
const {userValidate}=require('../validators/userValidator')
const {runValidation}=require('../validators/index')
const {userSignup,userSignin,signout,getImage} =require('../controllers/user')
router.post('/signup',userValidate,runValidation,userSignup)
router.post('/signin',userSignin)
router.get('/signuot',signout)
router.post('/image',getImage)  /* getting all the words */


// 
// router.param('userId',userById)
module.exports=router          