const errorMessage = (res, message) => {
    res.status(500).send(
        {
            message: message
        }
    );
}

module.exports = errorMessage;