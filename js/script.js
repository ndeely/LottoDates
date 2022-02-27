function getNextLottoDraw() {

    if (document.getElementById("results").classList.contains("active")) {
        document.getElementById("results").classList.toggle("active");
    }

    var dateInput = document.getElementById("dateTimeInput").value;
    
    if (dateInput === "") {
        dateInput = new Date();
    } else {
        var tempDateArr = dateInput.split(" ")[0].split("/");
        // swap days and months
        dateInput = tempDateArr[1] + "/" + tempDateArr[0] + "/" + tempDateArr[2] + " " + dateInput.split(" ")[1];
        dateInput = new Date(dateInput);
    }

    // get the day
    var theDay = dateInput.getDay();
    if (theDay === 3 || theDay === 6) {
        if (dateInput.getHours() > 20) {
            // consider it tomorrow
            dateInput.setDate(dateInput.getDate() + 1);
            theDay += 1;
            if (theDay === 7) { theDay = 0; }
        } else {
            // consider it yesterday
            dateInput.setDate(dateInput.getDate() - 1);
            theDay -= 1;
        }
    }

    var theDates = [];

    var theNewDay = theDay;
    dateInput.setDate(dateInput.getDate() - 7);

    // get five future dates
    theNewDay = theDay;
    var count = 0;

    while (theNewDay !== 3 && theNewDay !== 6) {
        theNewDay = theNewDay + 1;
        if (theNewDay === 7) {
            theNewDay = 0;
        }
        count += 1;
    }

    // date 1
    var tempDate = new Date(dateInput);
    tempDate.setDate(dateInput.getDate() + count);
    theDates.push(tempDate);
    var dayAmt = theNewDay === 3 ? 3 : 4;
    // dates 2-5
    for (var i = 0; i < 2; i++) {
        tempDate = new Date(tempDate);
        tempDate.setDate(tempDate.getDate() + dayAmt);
        theDates.push(tempDate);
        tempDate = new Date(tempDate);
        tempDate.setDate(tempDate.getDate() + 7 - dayAmt);
        theDates.push(tempDate);
    }

    // get dates in correct format
    for (var i = 0; i < theDates.length; i++) {
        theDates[i] = ("0" + theDates[i].getDate()).slice(-2) + "-" +
                      ("0" + (theDates[i].getMonth() + 1)).slice(-2) + "-" +
                      theDates[i].getFullYear().toString().slice(-2);
    }

    // add the dates to DOM
    var tableRows = document
        .getElementById("results")
        .getElementsByTagName("tr");
    for (var i = 0; i < tableRows.length; i++) {
        tableRows[i].getElementsByTagName("td")[0].innerHTML = theDates[i];
        tableRows[i].getElementsByTagName("td")[1].innerHTML = i < 2 ? "Past" : "Future";
    }

    document.getElementById("results").classList.toggle("active");
}