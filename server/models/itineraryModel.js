// Used for: ItenraryModel


class ItenraryModel2 {
    constructor(data) {
        this.uid = data.uid;
        this.destination = data.destination;
        this.startDate = data.startDate;
        this.endDate = data. endDate;
        this.placesToVisit = data.placesToVisit;
        this.tripType = data.tripType;
        this.numberOfDays = data.numberOfDays;
    }

    getItenraryData() {
        return {
            uid: this.uid,
            destination: this.destination,
            startDate: this.startDate,
            endDate: this.endDate,
            placesToVisit: this.placesToVisit,
            tripType: this.tripType,
            numberOfDays: this.numberOfDays
        };
    }
}

module.exports = ItenraryModel2;
