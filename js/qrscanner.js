var jbScanner  = {};

function onQRCodeScanned(scannedText)
{

    // stop the scanning first
    jbScanner.stopScanning(); 

    $.ajax({
        url: "./api/scanCode.php",
        type: "POST",
        async: false,
        data: {
            text: scannedText
        },
        success: function(data){
            
            var result = $.parseJSON(data);
            if (result['status'] == 1) {

                // vibrate;
                navigator.vibrate(200);

                // sound 
                var audio = new Audio('sound/qrCode_complete.mp3');
                audio.play();

                // show loading prefix
                $('#loading_layer_container').fadeIn();
                $('#loading_layer_container img#loading_success').fadeIn();
                $('#loading_layer_container img#loading_success').attr("src", "../image/loading_success.gif?v=123456");
                $('#loading_layer_container img#loading_success').css('left', -(($('#loading_layer_container img#loading_success').width() / 2) - $(window).width() + ($(window).width() / 2)) + "px");

                // prompt success after 1 sec
                setTimeout(function () {
                    $('#loading_layer_container').fadeOut();
                    $('#loading_layer_container img#loading_success').attr("src", "");

                    new jBox('Confirm', {
                        confirmButton: '完成',
                        content: "恭喜您成功Church IN！快啲搵個位置坐低，預備好自己嘅心去親近神啦！",
                        confirm: function(){
                            window.location.href = "../";
                        }
                    }).open();

                    var selectModal = $('.jBox-wrapper.jBox-Confirm.jBox-Default.jBox-Modal').eq($('.jBox-wrapper.jBox-Confirm.jBox-Default.jBox-Modal').length-1);
                    selectModal.find('.jBox-Confirm-button.jBox-Confirm-button-cancel').remove();
                    selectModal.find('.jBox-Confirm-button.jBox-Confirm-button-submit').css("width", "100%");
                }, 2200);
            } else {
                new jBox('Confirm', {
                    confirmButton: '再次掃描',
                    cancelButton: '返回首頁',
                    content: "這個QR Code不是Church IN專屬嘅QR Code喎，要重試嗎？",
                    confirm: function(){
                        jbScanner.resumeScanning();
                    },
                    cancel: function(){
                        window.location.href = "../";
                    }
                }).open();
            }
        }
    });
}

function provideVideo()
{
    var n = navigator;

    if (n.mediaDevices && n.mediaDevices.getUserMedia)
    {
        return n.mediaDevices.getUserMedia({
        video: {
            facingMode: "environment"
        },
        audio: false
        });
    } 
    
    return Promise.reject('Your browser does not support getUserMedia');
}

function provideVideoQQ()
{
    return navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
        var exCameras = [];
        devices.forEach(function(device) {
        if (device.kind === 'videoinput') {
            exCameras.push(device.deviceId)
        }
        });
        
        return Promise.resolve(exCameras);
    }).then(function(ids){
        if(ids.length === 0)
        {
            return Promise.reject('Could not find a webcam');
        }
        
        return navigator.mediaDevices.getUserMedia({
            video: {
                'optional': [{
                'sourceId': ids.length === 1 ? ids[0] : ids[1]//this way QQ browser opens the rear camera
                }]
            }
        });        
    });                
}

//this function will be called when JsQRScanner is ready to use
function JsQRScannerReady()
{
    //create a new scanner passing to it a callback function that will be invoked when
    //the scanner succesfully scan a QR code
    jbScanner = new JsQRScanner(onQRCodeScanned);
    //var jbScanner = new JsQRScanner(onQRCodeScanned, provideVideo);
    //reduce the size of analyzed image to increase performance on mobile devices
    jbScanner.setSnapImageMaxSize(300);
    var scannerParentElement = document.getElementById("scanner");
    if(scannerParentElement)
    {
        //append the jbScanner to an existing DOM element
        jbScanner.appendTo(scannerParentElement);
    }        
}