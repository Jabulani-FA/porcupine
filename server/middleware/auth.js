const admin = require('../firebase/index')

exports.authCheck = async (req, res, next) => {
    //
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        req.user = firebaseUser;
        next()
    }catch(err) {
        // console.log("Error occured ->", err)
    }
}