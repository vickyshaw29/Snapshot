const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const asyncHandler = require('express-async-handler')
const fetch = require('node-fetch')
exports.userSignup = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body
        const foundUser = await User.findOne({ email })
        if (foundUser) {
            return res.status(401).json({ error: 'user already exists' })
        }
        const user = await new User(req.body)
        await user.save()
        res.status(200).json({ msg: 'signup success' })
    } catch (err) {
        console.log(err)
    }
}
)
exports.userSignin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ error: 'user with that email does not exist please signup' })
    }
    if (!user.authenticate(password)) {
        res.status(401).json({ error: "email and password do not match" })
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
    res.cookie('t', token, { expire: 360000 + Date.now(), httpOnly: true })
    const { _id, name, isAdmin } = user
    return res.status(200).json({ token, user: { _id, name, email, isAdmin } })

}
)
exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.json({ msg: "signout success" })
}
exports.requireSignin = expressJwt({
    secret: process.env.SECRET_KEY, algorithms: ['HS256']
})

exports.getWords = async (req, res) => {
    try {
        const { search } = req.query
        if (!search) {
            var wordsArray = await Word.find()
        } else {
                wordsArray = await Word.find({
                text: { $regex: `${search}`, $options: "i" },
            }) //getting all the words from the database
        }
        res.json(wordsArray) //serving the words
    } catch (error) {
        console.log(error)
    }
}
exports.getImage = async (req, res) => {
    try {
        const { word } = req.body
        console.log(word)
        if (word) {
            const data = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${word}&per_page=24&format=json&nojsoncallback=1`, {
                method: "POST",
            })
            const response = await (data.json())
            res.json(response)
    
            // res.json(def[0][1])  
            // const newWord = new Word({
            //     text: word,
            //     lexicalCategory: id,
            //     definitions: def
            // })
            // newWord.save()
            // res.json({ msg: "you have successfully added your word" })
        }
        else {
            res.json({ msg: "Error while fetching image" })
        }

    } catch (error) {
       console.log(error)
    }
}