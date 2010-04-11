$(".content img").each(function() {
  var badMarginTop = $(this).parents(".content").css("marginTop");
  $(this).parents(".content").css("marginTop", parseInt(badMarginTop) - parseInt($(this).attr("height"))/2 + "px");
});

