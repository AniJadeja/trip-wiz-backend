class User {
  constructor(data) {
    this.username = data.username;
    this.displayName = data.displayName;
    //this.dateOfBirth = data.dateOfBirth;
    this.dateOfCreation = data.dateOfCreation;
    this.savedTrips = data.savedTrips;
    this.savedTripsUrl = data.savedTripsUrl;
  }


  getUserData() {
    return {
      username: this.username,
      displayName: this.displayName,
      dateOfBirth: this.dateOfBirth,
      //dateOfCreation: this.dateOfCreation,
      savedTrips: this.savedTrips,
      savedTripsUrl: this.savedTripsUrl
    };
  }
}
class SignUpUser {
  constructor(data) {
    this.displayName = data.displayName;
   // this.dateOfBirth = data.dateOfBirth;
    this.dateOfCreation = data.dateOfCreation;
  }


  getUserData() {
    return {
      displayName: this.displayName,
    //  dateOfBirth: this.dateOfBirth,
      dateOfCreation: this.dateOfCreation,
    };
  }
}
class TripsUser {
  constructor(data) {
    this.savedTrips = data.savedTrips;
    this.savedTripsUrl = data.savedTripsUrl;
  }


  getUserData() {
    return {
      savedTrips: this.savedTrips,
      savedTripsUrl: this.savedTripsUrl
    };
  }
}

exports.User = User;
exports.SignUpUser = SignUpUser;
exports.TripsUser = TripsUser;