// open navigation menu
$("body").on("click", "#navigation_btn", function() {
    $("#navigation_layer").fadeIn("fast");
    $.when($('#navigation_menu').css("display", "block")).done(function() {
        $('#navigation_menu').animate({ "right": "0" }, "fast" );
        $('body').css("overflow", "hidden");
    });
});

// close navigation menu
$("body").on("click", "#navigation_layer", function() {
    $("#navigation_layer").fadeOut("fast");
    $.when($('#navigation_menu').animate({ "right": "-80%" }, "fast" )).done(function() {
        $('body').css("overflow", "");
        $('#navigation_menu').css("display", "none");
    });
});



// go to each page in the menu
$("body").on("click", ".nav_option", function() {
    var url = this.id.split("_")[1];
    window.location = "./"+url+".php";
});
$("body").on("click", "#member_intro", function() {
    $("#menu_setting_page").click();
});


$('#chart_container, #journey_container, .main_page').scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('#back_to_top_btn').fadeIn();
    } else {
        $('#back_to_top_btn').fadeOut();
    }
});

$('body').on('click', '#back_to_top_btn', function() {
    $('#chart_container').animate({scrollTop:0}, '300');
    $('#journey_container').animate({scrollTop:0}, '300');
    $('.main_page').animate({scrollTop:0}, '300');
});

