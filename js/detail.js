
//头部滚动一段距离后隐藏
// $(function(){
//         var present = 0,
//             t = 0;
//         $(window).on("scroll", function () {
//             present = $(this).scrollTop();
//             var top = $(document).scrollTop();
//             if (top >= 0 && top <= 80 || present <= t) {
//                 $(".header").slideDown(500);
//             } else {
//                 $(".header").slideUp(500);
//             }
//             setTimeout(function () {
//                 t = present;
//             }, 0)
//         });
// })
$(function(){
	/*************轮播图********************/
	var $carrousel=$("#carrousel"),
		$ids=$("#indicators"),
		$b_line=$("#b_line");
	var i=0,timer=null;
	function show(i){	
		$carrousel.children("li:eq("+i+")").addClass("img_show").siblings().removeClass("img_show");
		$ids.children(":eq("+i+")").addClass("c_hover").siblings().removeClass("c_hover");
		$b_line.css("width",0).stop().animate({width:'100%'},800);
	}
	function carousel(){
		i += 1;
		if(i > 3) i= 0;
		show(i);
	}
	timer=setInterval(carousel,2000);
	$("#banner").hover(
		()=>{
			clearInterval(timer);
			timer=null;	
		},
		()=> timer=setInterval(carousel,2000)
	)
	var  timerId;
	
	$("#banner").hover(function() {
		$(".arrow").css("opacity", 0.3)
		clearInterval(timerId)
	}, function() {
		$(".arrow").css("opacity", 0)
		timerId = setInterval(carousel, 2000)
	})

	$("[data-move=left]").click(()=>{
		i = i > 0 ? i - 1 : 3;
		show(i);
	})
	$("[data-move=right]").click(()=>{
		i = i < 3 ? i + 1 : 0;
		show(i);
	})
	$ids.on("mouseover","li",function(){
			var $li=$(this);
			//var l_index=;	
			show($li.index());
	})

})
// 头部项目列表下拉效果
$(function(){
	var timerId;
	$('.hed_rt_list a').hover(function () {
			 timerId = setTimeout(function () {
				$('.hed_rt_list>ul').css("display","block");
			 }, 300);
		});
		$('.hed_rt_list a').mouseout(function () {
			 timerId = setTimeout(function () {
				$('.hed_rt_list>ul').css("display","none");
			 }, 300);
		})
	
})

// 项目总览切换效果
var headLis = document.querySelectorAll(".modList_header > ul > li");
var bodyLis = document.querySelectorAll(".modList_content > ul > li");
for(var i = 0; i < headLis.length; i++) {
	headLis[i].num = i;
	headLis[i].onclick = function() {
		for (var i = 0; i < headLis.length; i++) {
			headLis[i].removeAttribute("class")
			bodyLis[i].style.display = "none";
		}
		this.className = "current"
		bodyLis[this.num].style.display = "block"
	}
}



