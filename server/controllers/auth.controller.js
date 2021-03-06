const registermodal = require('../modal/auth.modal');

// const _= require('loadash')
const jwt = require('jsonwebtoken');
// cuustom error handler
const bcrypt = require('bcryptjs');

exports.registerController = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: "All field required" })
    }

    const newUser = new registermodal(req.body);

    registermodal.findOne({ email }).then((data) => {
        if (data) {
            return res.status(400).json({ message: "Email allredy register" });
        } else {
            newUser.save((err, udata) => {
                if (err) return res.status(400).json({ message: err.message });
                return res.status(200).json({ message: "Registrant successfully", udata });
            })
        }
    }).catch((err) => {
        return res.status(400).json({ message: err.message });
    })
}

exports.loginController = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All field required" })
    }

    registermodal.findOne({ email })
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400)
                    .json({
                        error: "User not exist"
                    })
            }

            if (!user.isactive) {
                return res.status(400)
                    .json({
                        error: "Account not active"
                    })
            }
            console.log('here');
            if (password === user.password) {
                const token = jwt.sign({
                    _id: user._id
                }, process.env.JWT_LOGIN_SECRET, { expiresIn: '7d' })

                const { name, email, role } = user;

                return res.status(200).json({
                    token,
                    user: { name, email, role }
                })
            } else {
                return res.status(400)
                    .json({
                        error: "Invalid password"
                    })
            }

        })
}


exports.privateController = (req, res) => {
    let data = ["tarun", "Aggarwal"];
    return res.status(200).json({ message: "Private Route data", data });
}

