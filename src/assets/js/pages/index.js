$(document).ready(function () {
    //Widgets count
    $('.count-to').countTo();
    Dropzone.autoDiscover = false;
    //Sales count to
    $('.sales-count-to').countTo({
        formatter: function (value, options) {
            return '$' + value.toFixed(2);//.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',');
        }
    });
    console.log("executed");
});
