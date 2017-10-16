/**
 * Created by jason on 19/06/2017.
 */

var reader = new FileReader()

function readVideoFile() {

    if (document.getElementById("loader").files.length === 0) {
        return;
    }

    var file = document.getElementById("loader").files[0];

    reader.readAsArrayBuffer(file);
    reader.onload = function (event) {
        console.log(event.target.result);
    }
}