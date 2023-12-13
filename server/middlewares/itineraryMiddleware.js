const { isValidDate } = require("../utils/dateValiator");

exports.verifyItenary = (req, res, next) => {
  const {
    destination,
    startDate,
    endDate,
    placesToVisit,
    tripType,
    numberOfDays,
  } = req.body;
  // verify that username is meeting the email pattern cretieria
  // on top of that email should not contain any special characters other than .
  const tripTypes = ["adventurous", "leisure", "exploration", "enjoyment"];

  if (
    destination != undefined &&
    startDate != undefined &&
    endDate != undefined &&
    placesToVisit != undefined &&
    tripType != undefined &&
    numberOfDays != undefined
  ) {
    if (
      destination != "" &&
      startDate != "" &&
      endDate != "" &&
      placesToVisit != "" &&
      tripType != "" &&
      numberOfDays != ""
    ) {
      if (placesToVisit > 0 && numberOfDays > 0) {
        if (tripTypes.includes(tripType)) {
          if (startDate < endDate || startDate == endDate) {
            if (numberOfDays < 6) {
              next();
            } else {
              res.status(401).json({
                message:
                  "Invalid Itenrary : error parsing the itenrary > numberOfDays cannot be greater than 5",
              });
            }
          } else {
            res.status(401).json({
              message:
                "Invalid Itenrary : error parsing the itenrary > startDate cannot be greater than endDate",
            });
          }
        } else {
          res.status(401).json({
            message:
              "Invalid Itenrary : error parsing the itenrary > tripType is not valid",
          });
        }
      } else {
        res.status(401).json({
          message:
            "Invalid Itenrary : error parsing the itenrary > placesToVisit and numberOfDays cannot be less than 0",
        });
      }
    } else {
      res.status(401).json({
        message:
          "Invalid Itenrary : error parsing the itenrary > itenrary cannot be null",
      });
    }
  } else {
    res.status(401).json({
      message:
        "Invalid Itenrary : error parsing the itenrary > itenrary cannot be undefined",
    });
  }
};
