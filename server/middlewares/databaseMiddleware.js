
exports.verifyUpdateRequest = (req, res, next) => {
    const { uid, data } = req.body;
    
    // data will not contain anything but the following
    //{
    //    username: this.username,
    //    displayName: this.displayName,
    //    dateOfBirth: this.dateOfBirth,
    //    dateOfCreation: this.dateOfCreation,
    //    savedTrips: this.savedTrips,
    //    savedTripsUrl: this.savedTripsUrl
    //  };
    // make sure that data contains only mentioned properties

    if (uid != undefined) {
        if (data != undefined) {
            if (Object.keys(data).length > 0) {
                const validProperties = ['username', 'displayName', 'dateOfBirth', 'dateOfCreation', 'savedTrips', 'savedTripsUrl'];
                const dataProperties = Object.keys(data);
                let valid = true;
                dataProperties.forEach((property) => {
                    if (!validProperties.includes(property)) {
                        valid = false;
                    }
                });
                if (valid) {
                    next();
                }
                else {
                    res.status(401).json({ message: 'Invalid data : error parsing the data > data contains invalid properties' });
                }
            }
            else {
                res.status(401).json({ message: 'Invalid data : error parsing the data > data is empty' });
            }
        }
        else {
            res.status(401).json({ message: 'Invalid data : error parsing the data > data is undefined' });
        }
    }
}