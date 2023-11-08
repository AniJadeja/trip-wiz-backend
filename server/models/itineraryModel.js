// Used for: ItenraryModel


class ItenraryModel2 {
    constructor(data) {
        this.uid = data.uid;
        this.destination = data.destination;
        this.startDate = data.start_date;
        this.endDate = data.end_date;
        this.placesToVisit = data.placesToVisit;
        this.tripType = data.tripType;
        this.numberOfDays = data.numberOfDays;
    }

    getItenraryData() {
        return {
            uid: this.uid,
            destination: this.destination,
            startDate: this.start_date,
            endDate: this.end_date,
            placesToVisit: this.placesToVisit,
            tripType: this.tripType,
            numberOfDays: this.numberOfDays
        };
    }
}

module.exports = ItenraryModel2;
