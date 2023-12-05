const User = require('../models/user')

exports.CreateUser = async(req, res) => {
    //
    console.log(req.body)
    console.log(req.user)
    const {first, last, Username} = req.body.values
    if(req.user){
        try{
            const newUser = await new User({
                email: req.user.email,
                Username,
            }).save()
            console.log("New user Created")
            res.json(newUser)
        }catch(err) {
            res.json(err)
        }
    }
}

exports.CurrentUser = async (req, res) => {
    // 
    const user = await User.find({email: req.user.email}).exec()
    if(user){
        res.json(user)
        console.log("user updated")
    }else{
        res.json(user)
    }
}

exports.deleteUser = () => {
    // 
    console.log("delete user")
}