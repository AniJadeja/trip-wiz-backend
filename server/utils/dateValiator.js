function isValidDate(dateString,isDateOfBirth) {
    //console.log("dateValidator => dateString : ",dateString);
    const pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(pattern);
  
    if (!match) {
      console.log("dateValidator => date format doesn't match dd/mm/yyyy ");
      return false; // Date format doesn't match "dd/mm/yyyy"
    }
  
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
  
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adjust for 0-based index
    let maxFutureYear = currentYear + 5;
    if (isDateOfBirth) {
      maxFutureYear = currentYear-16;
      currentYear = currentYear-100;
    }
    if (
      day < 1 || day > 31 ||
      month < 1 || month > 12 ||
      year < currentYear || year > maxFutureYear
    ) {
      console.log("dateValidator => Date is out of valid range ");
      return false; // Date is out of valid range
    }
  
    // Validate day based on the month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
      return false; // Day is invalid for the given month
    }
  
    return true;
  }
  

  exports.isValidDate = isValidDate;
  