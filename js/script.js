$(function(){
function byId(id){
	return typeof(id)==="string"?document.getElementById(id):id;	
}
//console.log(byId(banner));
var index = 0;
var timer = 0;
var pics = byId("banner").getElementsByTagName("img");
//console.log(pics);
var len = pics.length;
var dots =byId("dots").getElementsByTagName("span");
//console.log(len);
function slideImg(){
	var banner = byId("banner");
	//鼠标悬停上去 清除定时器
	banner.onmouseover = function(){
		if(timer) clearInterval(timer);
	}
	//鼠标离开，间歇调用，图片轮播。
	banner.onmouseout =function(){
		timer = setInterval(function(){
			index++;
			if(index>=len){
			 index=0;	
			}
			changeImg();
		},3000);
	}
	//鼠标离开自动轮播
	banner.onmouseout();
	//遍历小圆点，给小圆点一个id号，并且点击该id号所对应的小圆点就将index设置为所点的小圆点
	for(var d=0;d<len;d++){
		dots[d].id=d;
		dots[d].onclick=function(){
			index=this.id;
			changeImg();
		}
		
	}
}
//图片轮播结束
function changeImg(){
	for(var i=0;i<len;i++){
		pics[i].style.display ='none';
		dots[i].className='';
			
	}
	pics[index].style.display = 'block';
	dots[index].className='active'
}

slideImg();

	$(".li-left").mouseover(function(){
		$(this).children(".json-right").show()

	}).mouseout(function(){
		$(this).children(".json-right").hide()
	})
	
	
	$(".co-list").click(function(){
		$(".co-list").children(".second").css("display","none")
		$(this).children(".second").css("display","block");
		//$(".main-col .second").eq($(this).index()).css("display","block").siblings().css("display","none")
	})
	//图片索引
	 var inde=0;
	 $(".mainbottom-center ul li").mouseover(function(){
	 	//得到触摸小圆点当前索引
	 	var indexss = $(this).index();
	 	inde =indexss;
	 	//触摸小圆点当前索引触发ol下的图片整个左移动
	 	$(".mainbottom-center ol").animate({"margin-left":-inde*760+"px"});
	 	//选择小圆点当前li的Css样式变成暗红色，同级元素显现成灰色。siblings排他性
	 	$(".mainbottom-center ul li").eq(inde).css("background", "darkred").siblings().css("background", "gray")
	 })
	setInterval(function(){
//		console.log(inde);
	inde++;
    if(inde>=5){
    	inde=0;
    }
    $(".mainbottom-center ol").animate({"margin-left":-index*760+"px"});
	$(".mainbottom-center ul li").eq(inde).css("background","darkred").siblings().css("background","gray");},3000);
    
    
//	$(".co-list").mouseover(function(){
// 	$(this).children(".second").show()
// }).mouseout(function(){ 
// 	  $(this).children(".second").hide()
})	
   
 
