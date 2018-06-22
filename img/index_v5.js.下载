// ====================================
// hp_v3 首页内容处理
// 修改时间:2015-03-11
// ====================================
(function($) {
	// --------------------------------
	YM.namespace('YM.page.hp');
	// --------------------------------
	YM.page.hp.is950 = $('body').hasClass('s950');
	YM.page.hp.init = function() {
		this.loadImageFirst();
		this.updateLinkSourceId();
		this.initContentExecute();
	};
	YM.page.hp.loadImageFirst = function() {
		// 首屏2张大焦提前加载
		$('#bigFocusSlider li:first img[original], #bigFocusSlider li:eq(1) img[original]').each(function() {
			var imgElm = $(this);
			YM.debug('首屏图片加载', imgElm.attr('original'));
			imgElm.attr('src', imgElm.attr('original')).removeAttr('original');
		});
		// 首屏剩余大焦延迟加载
		setTimeout(function() {
			$('#bigFocusSlider img[original]').each(function() {
				$(this).bindYMUI('LoadRealImage', {srcAttr:'original'});
			});
		}, 5000);
	};
	YM.page.hp.imgDelayLoad = function() {
		$('.e-imageload').bindYMUI('DelayLoadImage', { preloadHeight:100, eventClass:'e-imageload' });
	};
	YM.page.hp.initContentExecute = function() {
		//通栏绑定倒计时
		$('#time').bindYMUI('CountDown', {
			callback: function(elm) {
				elm.remove();
			}
		});

		// 页面放大显示完全
		var wid = $(window).width();
		$('.bigbanner').css('width',wid);
		$('.bigbanner .slide-box').css('left','50%');
		if (Number(wid) > 1920) {
			$('.bigbanner .slide-box').css('margin-left','-960px');
			$('.bigbanner').css('width','1920px');
		}else if (Number(wid) < 1200) {
			$('.bigbanner .slide-box').css('margin-left','-960px');
			$('.bigbanner').css('width','1440px');
		}else{
			$('.bigbanner .slide-box').css('margin-left',-Number(wid)/2+'px');
			$('.bigbanner').css('width',wid);
		}

		$('.mod-shangou, .mod-women').addClass('e-imageload');
		// 顶部大焦广告切换
		$('#bigFocusSlider').addClass('e-imageload').bindYMUI('SlideBox', { direction:'top', delay:8, duration:0.8, animate:'fade', callback:function() { YM.page.hp.imgDelayLoad(); } });
		// 推荐商品Tab切换
		$('.mod-hotgoods').addClass('e-imageload').bindYMUI('SlideBox', { direction:'top', unitheight:360, items:'.goodslist', index:'hottabs', autoslide:false, callback:function() { YM.page.hp.imgDelayLoad(); } });

		// 俱乐部-新视野tab切换
		$('#club .left').addClass('e-imageload').bindYMUI('SlideBox', { direction:'top', unitwidth:408, items:'.list', index:'Opinion_tabs', autoslide:false, callback:function() { elms.bindYMUI('LoadChildImage'); } });

		// $('.lon_nav').addClass('e-imageload').bindYMUI('SlideBox', { direction:'top', unitheight:20, items:'.list', index:'promotion_a', autoslide:false, callback:function() { elms.bindYMUI('LoadChildImage'); } });

 
		// 高端精选广告切换处理
		if (!this.is950) {
			$('#specialSlider').addClass('e-imageload').bindYMUI('SlideBox');
		}
		// 公告区内容处理
		$('#noticeSlider').addClass('e-imageload').bindYMUI('SlideByPage',{ pagesize:1, items:'ul', unitwidth:200, autoslide:true, delay:6, callback:function(elms) { elms.bindYMUI('LoadChildImage'); } });
		$('#notices h3 span').bindYMUI('SwitchTabs', { action:'mouseover', child:'#notices ul' });
		$('.notice-change').click(function(){
			$(this).parent().parent().toggleClass('mod-notice-on');
		});
		// 品鉴和他们说的分页内容切换处理
		$('.mod-winetasting ul li, .mod-theysay .saylists dl').addClass('e-childload');
		$('.mod-winetasting').bindYMUI('SlideByPage', { pagesize:3, items:'ul', unitwidth:317, duration:0.6, callback:function(elms) { elms.bindYMUI('LoadChildImage'); } });
		$('.mod-theysay').bindYMUI('SlideByPage', { direction:'top', pagesize:2, items:'.saylists', unitheight:150, callback:function(elms) { elms.bindYMUI('LoadChildImage'); } });	
		// $('.hao_pin').bindYMUI('SlideByPage',  { direction:'top', pagesize:3, unitheight:380, callback:function(elms) { elms.bindYMUI('LoadChildImage'); } });	

		$('.minipage .btn-prev').hover(function() {
			if (!$(this).hasClass('disabled')) $(this).addClass('btn-prev-hover');
		}, function() {
			$(this).removeClass('btn-prev-hover');
		});	
		$('.minipage .btn-next').hover(function() {
			if (!$(this).hasClass('disabled')) $(this).addClass('btn-next-hover');
		}, function() {
			$(this).removeClass('btn-next-hover');
		});
		// 频道内容处理.hao_pin
		$('.channel').each(function() {
			$(this).find('.channel-brands, .channel-slider, .channel-rightad, .goodslist').addClass('e-imageload');
			if ($(this).find('.channel-slider .slide-items li').size()>1) {
				$(this).find('.channel-slider').bindYMUI('SlideBox', { duration:0.8, autoslide:true });
			}
			// 右侧排行榜处理
			if (!this.is950) {
				//销量排行Tab切换
				//$('.tit-tab span').bindYMUI('SwitchTabs', { action:'mouseover', child:'#tab-toplist ul', tabClass:'hover', childClass:'hover' });
				//$(this).find('.channel-topboard li.on').addClass('e-imageload');
				if ($(this).hasClass('channel-wine')) {
					$(this).find('.channel-topboard li:gt(1)').addClass('item');
				} else if ($(this).hasClass('channel-baijiu')) {
					$(this).find('.channel-topboard li:gt(1)').addClass('item');
				} else if ($(this).hasClass('channel-laoju')) {
					$(this).find('.channel-topboard li:gt(1)').addClass('item');
				} else {
					$(this).find('.channel-topboard li:gt(0)').removeClass('on');
					$(this).find('.channel-topboard li').addClass('item');
				};
				var items = $(this).find('.channel-topboard li.item');
				items.addClass('e-childload');
				items.mouseenter(function() {
					items.removeClass('on');
					$(this).addClass('on').bindYMUI('LoadChildImage');
				});
			}
		//	if ($.browser.isIE6) $(this).find('.goodslist li').bindYMUI('ElementHover', {hoverClass:'hover'});
		});
		$('.goodslist li').each(function() {
			if ($(this).find('dd.slogan').text().trim()=='') $(this).find('dd.slogan').remove();
			if ($(this).find('ins.zhe').size()>0) {
				var minprice = $(this).find('.minprice strong').text(), maxprice = $(this).find('.maxprice del').text().replace('¥', '');
				if (minprice>0 && maxprice>0) {
					var discount = (minprice * 10 / maxprice).toFixed(1);
					if (discount != '10.0')	{
						$(this).find('ins.zhe').html('<strong>'+ discount +'<\/strong>折').removeAttr('class');
					} else {
						$(this).find('ins.zhe').remove();
					}
				} else {
					$(this).find('ins.zhe').remove();
				}
			}
		});
		
		// 倒计时处理
		$('.e-countdown, .prod-countdown').bindYMUI('CountDown');
		// 图片延迟加载
		$(document).bindYMUI('ImageDelayLoad');
		//回顶部处理
		$('#floatTop').bindYMUI('FloatBottomTool', { minWidth:1220, mainWidth:1350, floatBottom:365 });
		//品牌墙
		if($('#brandWall').size()>0){
			$('#brandWall').addClass('e-imageload');
    		$('#brandWall dd a').each(function(){
    			$(this).hover(function(){
    				var $text = $(this).find('img').attr('alt');
    				var $span ='<span>' + $text + '</span>';
    				$(this).append($span).css('position','relative');
    			},function(){
    				$(this).css('position','');
    				$(this).find('span').remove();
    			})
    		});
	    };
	  //手风琴
	    $('.accordion').each(function(){
	    	var $Li = $(this).find('li'),
	    	arr = [],
	    	dis = YM.page.hp.is950 ? 240 : 300,
	    	num = 0;
	    	$Li.each(function(){arr.push($(this).css('left'))});
	    	arr[0] = '0',
	    	timer = 0;
	    	$Li.mouseover(function(){
	    		clearInterval(timer);
	    		num = $(this).index();
	    		accordion();
	    	});
	    	$Li.mouseout(function(){
	    		move()
	    	})
	    	function move(){
	    		timer = setInterval(function(){
		    		accordion();
		    		num++;
		    		if(num == arr.length )num = 0;
		    	},4000);
	    	}
	    	function accordion(){
	    		for(var i = 0;i<arr.length;i++){
	  				if( num < i ){
	    				$Li.eq(i).stop().animate({'left': parseInt(arr[i]) + dis});
	    			}else if( num >= i ){
	    				$Li.eq(i).stop().animate({'left': parseInt(arr[i])});
	    			}
	    		}
	    	}
	    	move();
	    })
	   


	    //延迟1.5秒，调用res.四川成都闪电送弹框是否出现
	    setTimeout(resfun,1500);
	    function resfun(){
	    	var res = YM.login && YM.login.headData && YM.login.headData.loginInfo && YM.login.headData.loginInfo.area;
			if(res==2698||res==-1){ 
				if($("#chendu")!=null){ 
					$("#chendu").removeClass('hidden'); 
					$("#chendu").prev("li").removeClass('last'); 
				} 
				//显示弹出框 
				if($('#ymj')!=null){ 
					$('#ymj').removeClass('hidden'); 
				} 
				//显示快捷搜索 
				if($('.hotSearchKeyChenDu')!=null){ 
				   $('.hotSearchKeyChenDu').show(); 
				} 
			}else{
				//显示广告位弹出框 
				if($('#ymjOther')!=null){ 
				   $('#ymjOther').removeClass('hidden'); 
				}
			}
	    }
		//滑动往上
		$(window).bind('scroll resize', function(e){
			var scrollTop=0;
		    scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		    if( scrollTop>100){
			  	$('#ymj').css( 'bottom','20px');
			  	$('#ymjOther').css( 'bottom','20px');
			 }else{ 
			  	$('#ymj').css( 'bottom','0px');
			  	$('#ymjOther').css( 'bottom','0px');
			 }
		})


		// 也买头条滚动--新闻
		var new_len = $('.lon_nav .news_a a').length;
		var num2 = 0;

		// 也买头条滚动--促销
		var promotion_len = $('.lon_nav .promotion_list li').length;
		var num = 0;
		var notice_len = $('.lon_nav .notice_list li').length;
		var num3 = 0;
		function slide_promotion(){
			if(num>promotion_len-2){
				num=0;
				$('.promotion_list li').animate({'margin-top':'0'},0)
			}else{
				$('.promotion_list li').eq(num).animate({
					'margin-top':'-25px'
				},800)
				num ++;
			}

			if(num2>new_len-2){
				num2=0;
				$('.new_list li').animate({'margin-top':'0'})
			}else{
				$('.new_list li').eq(num2).animate({
					'margin-top':'-25px'
				},800)
				num2 ++;
			}

			if(num3>notice_len-2){
				num3=0;
				$('.notice_list li').animate({'margin-top':'0'})
			}else{
				$('.notice_list li').eq(num3).animate({
					'margin-top':'-25px'
				},800)
				num3 ++;
			}
		}
		setInterval(slide_promotion,6000)
		$('.lon_nav .site-bar li .txt-logout').parent().text('欢迎登陆也买酒！')
		//刚刚被购买过的商品-- 商品折扣信息显示
		// $('#buy .block .promotionMiddleGift_hover dl').each(function(){
		// 	var dt_b = $(this).find('dt b');
		// 	var dl_dd = $('#buy .block .promotionMiddleGift_hover dl dd');
		// 	dt_b.mouseover(function(){
		// 		dl_dd.hide();
		// 		$(this).parent().parent().find('dd').show();
		// 	})
		// 	dt_b.mouseout(function(){
		// 		dl_dd.hide();
		// 		// $(this).parent().parent().find('dd').show();
		// 	})
		// 	dl_dd.mouseover(function(){
		// 		$(this).show();
		// 	})
		// 	dl_dd.mouseout(function(){
		// 		$(this).hide();
		// 	})
		// })
		$(window.document).delegate('#buy .block .promotionMiddleGift_hover dl dt b', 'mouseover', function(event){ 
			$('#buy .block .promotionMiddleGift_hover dl dd').hide(); 
			$('dd', $(this).closest('dl')).show(); 
		}); 
		$(window.document).delegate('#buy .block .promotionMiddleGift_hover dl dt b', 'mouseout', function(event){ 
			$('#buy .block .promotionMiddleGift_hover dl dd').hide(); 
		}); 
		$(window.document).delegate('#buy .block .promotionMiddleGift_hover dl dd', 'mouseover', function(event){ 
			$(this).show(); 
		}); 
		$(window.document).delegate('#buy .block .promotionMiddleGift_hover dl dd', 'mouseout', function(event){ 
			$(this).hide(); 
		});


		$('#interest .interest-right dl dd .focus1').click(function(){
			// $(this).parent().find('label').css({'top':'88px'})
			// $(this).parent().find('label').css({opacity:'1'})
			$(this).parent().find('label').show();
			$(this).parent().find('label').animate({top: '80px',opacity: '0'}, 500);
			$(this).css('background','url(http://css.yesmyimg.com/web/20160613/newWeb/css/v3/images/hp/icon.png) no-repeat')
			$(this).css('background-position','-25px -84px')
			$(this).css('border','1px solid #666')
			$(this).css('height','20px')
			$(this).html('已关注')
		})


		//猜你喜欢 
		// $.get('/index/guessYourLike.jspa?time='+(new Date()).getTime()+'&pageNum='+1, function(data){ 
		// 	$("#guessYourLike").after(data); 
		// }); 
		// var counter = 0; 
		// 	$('#changGuess').click(function(){ 
		// 	Tracking.push("I14-" + counter); 
		// 	counter ++; 
		// 	$.get('/index/guessYourLike.jspa?time='+(new Date()).getTime()+'&pageNum='+(((counter)%3)+1), function(data){ 
		// 		$("#guessYourLike").siblings().remove(); 
		// 		$("#guessYourLike").after(data); 
		// 		$('#happy').data('dtsStartIndex',17*(counter%3)); 
		// 	}); 
		// });
	};
	// --------------------------------
	$.fn.updateLinkSourceId = function(srcId) {
		var updateLink = function(elm, index) {
			elm.each(function() {
				var link = $(this).attr('href') || '';
				if (link=='' || link=='#' || link.indexOf('#')>0) return;
				$(this).attr('href', link +'#'+ srcId + index);
			});
		};
		this.children().each(function(i) {
			var index = i + 1;
			if ($(this).tagName()=='a') {
				updateLink($(this), index);
			} else {
				updateLink($(this).find('a'), index);
			}
		});
	};
	//趣味新发现
	console.log($('.promo-icon .wine_text').length);
	$('.promo-icon .wine_text').each(function(){
	})
	// 给内容链接添加相应的跟踪代码
	YM.page.hp.updateLinkSourceId = function() {
		var d = new Date().getTime();
		$('#bigFocusSlider ul.slide-items').updateLinkSourceId('banner');
		$('#noticeSlider ul.slide-items').updateLinkSourceId('ad');
		$('#specialSlider ul.slide-items').updateLinkSourceId('wine');
		$('.channel').each(function(i) {
			var index = i + 1;
			$(this).find('.channel-header ul').updateLinkSourceId('z'+index+'cate');
			$(this).find('.channel-brands ul').updateLinkSourceId('z'+index+'brand');
			$(this).find('.channel-slider ul.slide-items').updateLinkSourceId('z'+index+'ad');
			$(this).find('.channel-rightad').updateLinkSourceId('z'+index+'wine');
			$(this).find('.goodslist ul').updateLinkSourceId('z'+index+'good');
			$(this).find('.channel-topboard ul').updateLinkSourceId('z'+index+'top');
		});
		$('.mod-women .bd ul').updateLinkSourceId('ladyad');
		$('.mod-hotgoods .goodslist ul').updateLinkSourceId('hotgood');
		$('.mod-winetasting .bd ul').updateLinkSourceId('tasting');
		$('.mod-theysay .saylists ul').updateLinkSourceId('saygood');
	};
	// --------------------------------
	YM.page.hp.init();
	// --------------------------------
})(jQuery);