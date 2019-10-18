let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Ocak", "Subat", "Mart", "Nisan", "Mayis", "Haziran", "Temmuz", "Agustos", "Eylul", "Ekim", "Kasim", "Aralik"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = parseInt(currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = parseInt(currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = parseInt(currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = parseInt(currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    
    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 2;
    var data = [{ "title": "event 1", "date": "2014/09/25" },
    { "title": "event 2", "date": "2014/09/26", "enddate": "2014/09/29" },
    { "title": "event 3", "date": "2014/09/27" },
        { "title": "event 4", "date": "2014/09/30" }];

    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }
          
            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");

                } // color today's date




                cell.appendChild(cellText);
                cell.id = date;
                row.appendChild(cell);

                date++;
            }


        }

        tbl.appendChild(row); 

    }
    for (var k = 0; k < data.length; k++) {

        if (data[k].enddate) {
            if (year === parseInt(data[k].date.split("/")[0]) && month === parseInt(data[k].date.split("/")[1])) {
                var startdate = parseInt(data[k].date.split("/")[2]);
                var enddate = parseInt(parseInt(data[k].enddate.split("/")[2]));
                while (startdate < enddate) {

                    var selecttd = document.getElementById(startdate);
                    selecttd.innerHTML = startdate+"<div class='mavi'>" + data[k].title + "</div>";
                    startdate++;

                }
            }
        }
        else if (year === parseInt(data[k].date.split("/")[0]) && month === parseInt(data[k].date.split("/")[1])) {
            var sec = document.getElementById(parseInt(data[k].date.split("/")[2]));
            var sechtml = document.getElementById(parseInt(data[k].date.split("/")[2])).innerHTML;
            if (sechtml) {
                sec.innerHTML = sechtml + "<div class='mavi'>" + data[k].title + "</div>";
            }
            else {
                sec.innerHTML = "<div class='mavi'>" + data[k].title + "</div>";
            }
            
        }




    }
}

