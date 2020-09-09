const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select("*").from("users").where({id})
      .then(user => {
        if (user[0] === undefined) throw Error("Could not find user.");
        res.json(user)
      })
      .catch(err => {res.status(400).json("An error occured.")});
}

module.exports = {
    handleProfileGet
}