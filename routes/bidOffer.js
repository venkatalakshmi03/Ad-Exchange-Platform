module.exports = (app, connection) => {
    app.post('/api/bidoffer', (req, res) => {
        if (req.body.bidAmount > 1000) {
            res.send({ success: "Bid has been submitted!" });
        } else {
            res.send({ failure: "Been amount needs to be higher" });
        }
    });
};