const handleSignIn = async(req, res, db, bcrypt) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json("Incorrect form submission");
        return;
    }
    try {
        const data = await db.select("email", "hash")
                            .where("email", "=", req.body.email)
                            .from("login")
        if (data.length === 0) throw Error("unable to sign in.");
        else {
            if (bcrypt.compareSync(req.body.password, data[0].hash)) {
                const user = await db.select("*").from("users").where("email", "=", req.body.email);
                res.json(user[0]);
                return user;
            } else throw Error("Invalid Credentials")
        }
    } catch (err) {
        res.status(400).json("Unable to sign in.")
    }
}

module.exports = {
    handleSignIn : handleSignIn,
}