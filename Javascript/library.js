// input: date [format: YYYY-MM-DD]
// output: timestamp [hour 08:00:00] in sec
function calcDatetoTS(_date) {
    _date = _date.split("-");
    var _date = new Date(_date[0], _date[1]-1, _date[2], 8, 0, 0, 0);
    var _timestamp = _date.getTime() / 1000;
    return _timestamp;
}

// input _timestamp in sec
function calculateTS(_timestamp){
    var date = new Date(_timestamp * 1000);
    var formattedDate = (('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ', ' + ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()) ;
    return formattedDate;
}

function logger(result, _id) {
    var hist = document.getElementById(_id);
    var newP = document.createElement('P');
    hist.appendChild(newP);
    var msg = "\"" + result.args.log + "\"";
    var content = document.createTextNode(msg);
    newP.appendChild(content);

    var formattedDate = calculateTS(result.args.time);
    var msg2 = " at " + formattedDate + ".";

    var newSpan = document.createElement('SPAN');
    var content2 = document.createTextNode(msg2);
    newSpan.appendChild(content2);
    newP.appendChild(newSpan);
}
