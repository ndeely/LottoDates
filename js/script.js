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
    // get two previous dates
    var count1 = 0;
    var count2 = 0;
    while(count1 === 0) {
        theNewDay = theNewDay - 1;
        if (theNewDay === -1) {
            theNewDay = 6;
        }
        count2 += 1;
        if (theNewDay === 3) { count1 = count2 + 4; }
        if (theNewDay === 6) { count1 = count2 + 3; }
    }
    var tempDate = new Date(dateInput);
    theDates.push(modifyDays(dateInput, count1, false));
    theDates.push(modifyDays(dateInput, count2, false));

    // get three future dates
    theNewDay = theDay;
    var count3 = 0;
    count1 = 0;
    count2 = 0;
    while (count3 === 0) {
        theNewDay = theNewDay + 1;
        if (theNewDay === 7) {
            theNewDay = 0;
        }
        count1 += 1;
        if (theNewDay === 3) { 
            count2 = count1 + 3;
            count3 = count1 + 7; 
        }
        if (theNewDay === 6) { 
            count2 = count1 + 4;
            count3 = count1 + 7;
        }
    }
    theDates.push(modifyDays(dateInput, count1, true));
    theDates.push(modifyDays(dateInput, count2, true));
    theDates.push(modifyDays(dateInput, count3, true));

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

function modifyDays(date, days, plus) {
    var result = new Date(date);
    if (plus) {
        result.setDate(result.getDate() + days);
    } else {
        result.setDate(result.getDate() - days);
    }
    return result;
}