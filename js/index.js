$("body").on("click", ".list_block", function() {
    if (!$(this).hasClass("store")) {
        return;
    }
    var store_id = $(this).attr("id");
    $.ajax({
        url: "../../api/function.php",
        type: "POST",
        async: false,
        data: {
            function: 'change_store',
            unique_link_code: unique_link_code,
            store_id: store_id
        },
        success: function(data){
            location.reload();
        }
    });
});

// search bar function
$("body").on("keyup", "#search_bar", function() {
    var keyword = $("#search_bar").val();
    $.ajax({
        url: "../../api/function.php",
        type: "POST",
        async: false,
        data: {
            function: 'searching_store_name',
            keyword: keyword
        },
        success: function(data) {
            $("#merchant_list").html(data);
        }
    });
});



// more store 
$("body").on("click", "#inactivate_store_more_btn", function() {
    $("#menu_detail_page").click();
});


// search bar function
$("body").on("click", "#checkIn", function() {
    window.location.href = "./qrscanner.php";
});


// slideshow
// check if need to show pop up
$( document ).ready(function() {
    var bannerIndex = 0;
    var maxBannerIndex = $('#banner_slideshow_block img.slide').length;
    $('#banner_slideshow_block img.slide').eq(0).css("display", "inline");
    setInterval(function () {
        $('#banner_slideshow_block img.slide').eq(bannerIndex).fadeOut();
        bannerIndex++;
        if (bannerIndex == maxBannerIndex) {
            bannerIndex = 0;
        }
        $('#banner_slideshow_block img.slide').eq(bannerIndex).fadeIn();
    }, 3000);    
});





