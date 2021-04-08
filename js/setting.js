// back btn only show in reward_detail page
$(document).ready(function() {
    var current_url = $(location).attr('href');
    if (current_url.indexOf("setting.php") >= 0){
        $("#back_btn").css("display", "block");
    }
});

$("body").on("click", "#back_btn", function() {
    history.back();
});

$("body").on("click", "#confirm-btn", function() {
    var name = $('#name .setting_form_value').text();
    var mobile = $('#mobile .setting_form_value').text();
    saveUserInfo(name, mobile);
});

$("body").on("click", "#field_back_btn", function() {
    $("#field_setting").fadeOut();
});

$("body").on("click", "#reset-btn", function() {
    new jBox('Confirm', {
        confirmButton: '確定',
        cancelButton: '返回',
        content: '系統將回復預設設定，您的資料將會被清空，你是否確定？',
        confirm: function(){
            
            $('#loading_layer_container').fadeIn();
            $('#loading_layer_container img#loading').fadeIn();
            $('#loading_layer_container img#loading').css('left', -(($('#loading_layer_container img#loading').width() / 2) - $(window).width() + ($(window).width() / 2)) + "px");
            
            $.ajax({
                url: './api/clearSession.php',
                type: 'POST',
                async: false,
                success: function(result){
                    new jBox('Modal', {
                        content: '系統已重設！<br>如想再次使用，請喺設定到再次填寫你嘅姓名同電話號碼！',
                        animation: 'pulse'
                    }).open();
                    setTimeout(function () {
                        location.reload();
                    }, 3000);    
                }
            });
        },
    }).open();
});



function saveUserInfo(name, mobile) {
    $.ajax({
        url: './api/saveUserInfo.php',
        type: 'POST',
        async: false,
        data: {
            name: name,
            mobile: mobile
        },
        success: function(data){
            console.log(data);
            var result = $.parseJSON(data);
            if (result['status'] == 1) {
                history.back();
            } else {
                showAlertBox(result['error'].join("<br>"));
                return false;
            }
        }
    });
}


//----------------------------------------------------------------------------------------
// change image
$('body').on('change', '.image_upload_form', function(){
    var fd = new FormData();
    var files = $('#uploadImage')[0].files[0];
    var image_name_array = files['name'].split('.');
    var image_type = image_name_array[image_name_array.length-1];
    fd.append('file',files);
    $.ajax({
        url: '../../api/upload_member_image.php',
        type: 'POST',
        async: false,
        data: fd,
        contentType: false,
        processData: false,
        success: function(data){ // response for true / false

            var result = $.parseJSON(data);
            if (result['status'] == "success") {

                var original_path = result['result'];
                $.ajax({
                    url: '../../api/function.php',
                    type: 'POST',
                    async: false,
                    data: {
                        function: 'change_image_name',
                        image_type: image_type,
                        original_path: original_path
                    },
                    success: function(response){
                        var result = $.parseJSON(response);

                        if (result['status'] == "success") {
                            var file_name  = result["result"];
                            $("#member_image img").attr("src", file_name)
                        }
                    }
                });
            }         
        },
    });
});


//----------------------------------------------------------------------------------------
// click setting block
var setting_box = new jBox();
$('body').on('click', '.setting_block.edit', function(){
    var block_id = this.id;
    var block_name = $("#"+block_id+" .setting_form_title").html();
    var block_value = $("#"+block_id+" .setting_form_value").html();

    $("#title").html(block_name);

    if (block_id == 'mobile') {
        $("#value_input").html('<input id="'+block_id+'_input" type="number" name="field_input" value="'+block_value+'">');
    } else {
        $("#value_input").html('<input id="'+block_id+'_input" type="text" name="field_input" value="'+block_value+'">');
    }
    $("#field_setting").fadeIn();
    $("#"+block_id+"_input").focus();
});


//----------------------------------------------------------------------------------------
// click setting block
$('body').on('click', '#save_btn', function(){
    // no checking in this save    
    var block_id = $("#value_input input").attr("id").split("_input")[0];
    var block_value = $("#"+block_id+"_input").val();
    $('#field_setting').fadeOut();
    $('#'+block_id+" .setting_form_value").text(block_value);
});


//----------------------------------------------------------------------------------------
// click setting block
$('body').on('click', '#whatsapp_opt_checkbox', function(){
    
    var block_id = "optin_whatsapp";
    var block_value = ($(this). prop("checked") == true)? 1 : 0;

    $.ajax({
        url: '../../api/function.php',
        type: 'POST',
        async: false,
        data: {
            function: 'save_member_setting',
            block_id: block_id,
            block_value: block_value
        },
        success: function(data){
            console.log(data);
            var result = $.parseJSON(data);
            if (result['status'] == "success") {
                
            }
        }
    });
});