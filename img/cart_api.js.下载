/****
 * 新版购物车 @since 20130307
 */
(function($) {

	if (!$ || ! window.YM) return;

	var host = YM.login.servicePath,
	errorTip = '网络异常，请重试',
	errorParams = '无效的请求参数！';

	YM.namespace('YM.page.cart');

	YM.page.cart = {
		/**
		 * 加购物车成功后要调用的回调
		 */	
		_addGoodsToCartListners:[],
		API: {
			//普通商品加入购物车
			ADD_GOODS_TO_CART_ACTION: host+ 'cart/addGoods.jspa',
			//goodsId and goodsNum
			//普通商品从购物车删除
			REMOVE_GOODS_FROM_CART_ACTION: host + 'cart/removeGoods.jspa',
			//cartKey and goodsId
			//修改普通商品在购物车的sku数量
			CHANGE_SKU_NUM_ACTION: host + 'cart/editGoodsNum.jspa',
			//赠品加入购物车
			ADD_PRESENT_TO_ACTION: host + 'cart/addPresent.jspa',
			//移除购物车中赠品
			REMOVE_PRESENT_FROM_CART_ACTION: host + 'cart/removePresent.jspa',
			//修改赠品数量
			CHANGE_PRESENT_SKU_NUM_ACTION: host + 'cart/editPresentNum.jspa',
			//添加优惠券
			ADD_COUPON_ACTION: host + 'cart/addVouchers.jspa',
			//移除优惠券
			REMOVE_COUPON_ACTION: host + 'cart/removeVouchers.jspa'
		},
		getVersion: function() {
			return '20130131-a';
		},
		static: {
			TO_BALANCE_URL: host + 'neworder/writeOrder2.jspa',
			WAP_SHOW_CART_URL: host + 'wap/showCart2.jspa',
			SHOW_CART_URL: host + 'cart4/showCart.jspa'
		},
		init: function() {
			//TODO 页面初始化动作
		},
		/**
		 * 增加商品加入购物车成功后的回调。
		 * 当向购物车添加商品成功后可能要做一些事，可以在此添加函数。
		 * 回调函数的参数就是加购物车的参数。
		 */
		appendAddGoodsToCartListner:function(optp)
		{
			optp = optp || {};
			if(optp.callback)
			{
				this._addGoodsToCartListners.push(optp.callback);
			}
		},
		/**
         * 约定opt,以下为opt下的参数
         *  goodsId(Integer) required #商品Id
         *  goodsNum(Intger) not #商品数量,默认为1
         *  callback(function) not required #回调 
         *  goodsYear(String) not required #年份
         *  houseId(Integer) not required #分仓Id
         *  adSource(String) not required #推广来源 
		*/
		addGoodsToCartV2: function(optp) {
		    optp = optp || {};
		    if (isNaN(optp.goodsId)) {
				YM.page.alert('您提交的商品ID有误!');
				return;
			}
			var callbackfn = optp.callback ||  function() {
				YM.page.header.cart.update();
			};
			if (!validateGoodsNum(optp.goodsNum || 1)) {
				return;
			}
			var urlParams = [];
			
			//tracking,no recommend with get event by mozilla
			try {
				if($.browser.mozilla) {
					var $E = function(){var c=$E.caller; var i=70; while(c.caller && i-->0)c=c.caller; return c.arguments[0]};
				}
				var e = window.event || $E();
				var currEle = $(e.target || e.srcElement);
				if (!currEle.attr("data-dts")) {
					currEle.attr("data-dts","{dts:'addCart',goodsId:'" + optp.goodsId + "'}");
				}
			} catch (e){}

			urlParams.push('goodsId=' + optp.goodsId);
			urlParams.push('goodsNum=' + (optp.goodsNum || 1));
			if (optp.houseId) urlParams.push('houseId=' + optp.houseId);
			var posts = {};
			if (optp.adSource) posts.adSource = optp.adSource;
			var curObject=this;
			YM.dataproxy.ajax({
				url: YM.page.cart.API.ADD_GOODS_TO_CART_ACTION + '?' + urlParams.join('&'),
				type: 'POST',
				cache: false,
				data: posts,
				success: function(data) {
					ajaxCallback(data, callbackfn);
					try {
						for (var i = 0; i < curObject._addGoodsToCartListners.length; i++) {
							try {
								curObject._addGoodsToCartListners[i](optp);
							}catch (e){console.error(e);}	
						}
					}catch (e){console.error(e);}	
				},
				error: function() {
					YM.page.alert(errorTip);
				}
			});
		},
		/***
         * 约定yearGoodsId为字符串，以区别houseId, 第3到第6个参数可以缺省,顺序随意
         * @param goodsId(Integer) required #商品Id
         * @param goodsNum(Intger) required #商品数量
         * @param callback(function) not required #回调 
         * @param houseId(Integer) not required #分仓Id
         * @param adSource(String) not required #推广来源 
         */
		addGoodsToCart: function(goodsId, goodsNum, callback, yearGoodsId, houseId, adSource) {
			//tracking,no recommend with get event by mozilla
			try {
				if($.browser.mozilla) {
					var $E = function(){var c=$E.caller; while(c.caller)c=c.caller; return c.arguments[0]};
				}
				var e = window.event || $E();
				var currEle = $(e.target || e.srcElement);
				
				if (!currEle.attr("data-dts")) {
					currEle.attr("data-dts","{dts:'addCart',goodsId:'" + goodsId + "'}");
				}
			} catch (e){}
			var yGoodsId, hId, advertisedSource;
			var callbackfn = function() {
				YM.page.header.cart.update();
			};

			var argExcutor = function(arg) {
				typeof arg === 'string' ? (/^\d+$/.test(arg) ? yGoodsId = arg: advertisedSource = arg) : typeof arg === 'number' ? hId = arg: callbackfn = arg;
			};

			if (arguments.length < 2) {
				YM.page.alert(errorParams);
				return;
			}

			if (isNaN(goodsId) || isNaN(goodsNum)) {
				YM.page.alert('您提交的商品Id或商品数量不是有效的数字!');
				return;
			}

			if (!validateGoodsNum(goodsNum)) {
				return;
			}

			var splitedArgs = Array.prototype.slice.call(arguments, 2);
			for (var i = 0; i < splitedArgs.length; i++) {
				argExcutor(splitedArgs[i]);
			}
			callbackfn = function() {
				YM.page.header.cart.update();
			};
			var urlParams = [];
			urlParams.push('goodsId=' + goodsId);
			urlParams.push('goodsNum=' + (goodsNum || 1));
			if (hId) urlParams.push('houseId=' + hId);
			var posts = {};
			if (advertisedSource) posts.adSource = advertisedSource;
			var curObject=this;
			YM.dataproxy.ajax({
				url: YM.page.cart.API.ADD_GOODS_TO_CART_ACTION + '?' + urlParams.join('&'),
				type: 'POST',
				cache: false,
				data: posts,
				success: function(data) {
					ajaxCallback(data, callbackfn);
					try {
						for (var i = 0; i < curObject._addGoodsToCartListners.length; i++) {
							try {
								curObject._addGoodsToCartListners[i]({});
							}catch (e){console.error(e);}		
						}
					}catch (e){console.error(e);}	
				},
				error: function() {
					YM.page.alert(errorTip);
				}
			});

		},
		addGoodsToCartBySingle: function(goodsId) {
			if (!goodsId) {
				YM.page.alert(errorParams);
				return;
			}
			var _this = this;
			var splitedGoodsIds = goodsId.split(',');
			for (var i = 0; i < splitedGoodsIds.length; i++) {
				_this.addGoodsToCart(splitedGoodsIds[i], 1);
			}
		},
		/***
         * 奥美
         */
		addGoodsToCartForAomei: function(callback) {
			commonSpecialaddCartFn(['type=aomei'], callback);
		},
		/***
         * 存酒库
         */
		addGoodsToCartForCellar: function(params, callback) {
//			var postParams = {
//				'type': 'fromCellar',
//				'cellarIds': cellarIds,
//				'quantities': quantities
//			};
			commonSpecialaddCartFn([params, "type=fromCellar"], callback);
		},
		/****
         * 积分兑换
         */
		addGoodsToCartForExchange: function(exchangeId, exchangeWayId, quantity, callback) {
			var postParams = [
				'type=exchange',
				'exchangeId='+ exchangeId,
				'exchangeWayId='+ exchangeWayId,
				'quantity='+ quantity
			];
			commonSpecialaddCartFn(postParams, callback);
		},
		/***
         * 礼品
         */
		addGoodsToCartForGift: function(giftDrawId, callback) {
			var callbackFn = callback || function() {
				YM.page.header.cart.update();
			};
			YM.dataproxy.ajax({
				url: YM.page.cart.API.ADD_GOODS_TO_CART_ACTION + '?type=gift&giftDrawId=' + giftDrawId,
				type: 'POST',
				cache: false,
				data: {},
				success: function(data) {
					ajaxCallback(data, callbackFn);
				},
				error: function() {
					YM.page.alert(errorTip);
				}
			});
		},
		/****
         * 预售
         */
		addGoodsToCartForPresell: function(goodsId, goodsNum, callback) {
			var postParams = [
				'type=presell',
				'goodsId='+ goodsId,
				'goodsNum='+ goodsNum
			];
			commonSpecialaddCartFn(postParams, callback);
		},
		/***
         * 赠品
         */
		addPresentToCart: function(goodsId, goodsNum, cartType) {
			YM.dataproxy.ajax({
				url: YM.page.cart.API.ADD_PRESENT_TO_ACTION + '?goodsId=' + goodsId + '&goodsNum=' + goodsNum + '&cartType=' + cartType,
				type: 'POST',
				cache: false,
				data: {},
				success: function(data) {
					ajaxCallback(data, function() {
						window.location.reload();
					});
				},
				error: function() {
					YM.page.alert(errorTip);
				}
			});
		},
		/***
         * 移除赠品
         * @param presentKey
         * @param cartType
         */
		removePresentFromCart: function(presentKey, cartType, callback) {
			var callbackFn = function() {
				YM.page.header.cart.update();
			};
			if($.isFunction(callback)) callbackFn = callback;
			YM.dataproxy.ajax({
				url: YM.page.cart.API.REMOVE_PRESENT_FROM_CART_ACTION,
				type: 'POST',
				cache: false,
				data: {
					'presentKey': presentKey,
					'cartType': cartType
				},
				success: function(data) {
					ajaxCallback(data, function() {
//						window.location.reload();
					});
				},
				error: function() {
					YM.page.alert(errorTip);
				}
			});
		},
		/***
         * 修改赠品数量
         * @param presentKey
         * @param presentNum
         * @param cartType
         */
		changePresentSKUNum: function(presentKey, presentNum, cartType) {
			YM.dataproxy.ajax({
				url: YM.page.cart.API.CHANGE_PRESENT_SKU_NUM_ACTION,
				type: 'POST',
				cache: false,
				data: {
					'presentKey': presentKey,
					'presentNum': presentNum,
					'cartType': cartType
				},
				success: function(data) {
					ajaxCallback(data, function() {
//						window.location.reload();
					});
				},
				error: function() {
					YM.page.alert(errorTip);
				}
			});
		},
		/***
         * 修改购物车商品数量
         * @param goodsKey
         * @param goodsNum
         */
		changeSKUNum: function(goodsKey, goodsNum, cartType) {
			if (!validateGoodsNum(goodsNum)) {
				return;
			}

			YM.dataproxy.ajax({
				url: YM.page.cart.API.CHANGE_SKU_NUM_ACTION,
				type: 'POST',
				cache: false,
				data: {
					'goodsKey': goodsKey,
					'goodsNum': goodsNum,
					'cartType': cartType
				},
				success: function(data) {
					ajaxCallback(data, function() {
						window.location.reload();
					});
				},
				error: function() {
					YM.page.alert(errorTip);
				}
			});
		},
		/****
         * 商品从购物车中删除
         * @param goodsKey
         */
		removeGoodsFromCart: function(goodsKey, cartType, callback, goodsId) {
			
			YM.dataproxy.ajax({
				url: YM.page.cart.API.REMOVE_GOODS_FROM_CART_ACTION + '?goodsId=' + goodsId,
				type: 'POST',
				cache: false,
				data: {
					'goodsKey': goodsKey,
					'cartType': cartType
				},
				success: function(data) {
					ajaxCallback(data, callback || function() {
						YM.page.header.cart.update();
					});
				},
				error: function() {
					YM.page.alert(errorTip);
				}
			});
		},
		/**
         * 添加到我的收藏
         * @param goodsId
         */
		addGoodsToFavorites: function(goodsId) {
			//loading goods.detail.js and call the method addFavorite 
		},
		/***
         * 使用优惠券
         */
		usingCoupon: function(cartType, couponCode, callback) {
			YM.dataproxy.ajax({
				url: YM.page.cart.API.ADD_COUPON_ACTION,
				type: 'POST',
				cache: false,
				data: {
					'cartType': cartType,
					'couponCode': couponCode
				},
				success: function(data) {
					ajaxCallbackUsingCoupon(data, callback);
				},
				error: function() {
					YM.page.alert(errorTip);
				}
			});
		},
		/***
         * 移除优惠券
         */
		removeCoupon: function(cartType, vouchersKey,callback){
			YM.dataproxy.ajax({
				url: YM.page.cart.API.REMOVE_COUPON_ACTION,
				type: 'POST',
				cache: false,
				data: {
					'cartType': cartType,
					'vouchersKey': vouchersKey
				},
				success: function(data) {
					ajaxCallback(data,callback);
				},
				error: function() {
					YM.page.alert(errorTip);
					window.location.reload();
				}
			});
		}
	};
	//使用优惠券回调函数
	function ajaxCallbackUsingCoupon(data, func) {
		if (!data.error) {
			if(data.messageList && data.messageList!='' && data.messageList.length > 0){ // 警告信息或提示信息
				var message = '';
				for (var i = 0; i < data.messageList.length; i++) {
					message += data.messageList[i] + '<br />';
				}
//				YM.page.alert(message, function(){
//					window.location.reload();
//				});
				Cart3.usingCouponSuccessCallBack(message);
			}else{
				func.call(this);
			}
		} else {
			var message = '';
			for (var i = 0; i < data.messageList.length; i++) {
				message += data.messageList[i] + '<br />';
			}
			//YM.page.alert(message);
			Cart3.usingCouponHtmlCallBack(message);
		}
	}
	
	function ajaxCallback(data, func) {
		if (!data.error) {
			if(data.messageList && data.messageList!='' && data.messageList.length > 0){ // 警告信息或提示信息
				var message = '';
				for (var i = 0; i < data.messageList.length; i++) {
					message += data.messageList[i] + '<br />';
				}
				YM.load('util.dialog', function() {
			    	YM.util.dialog.alert(message, function(){
						window.location.reload();
					});
			    });
			}else{
				if (func) func.call(this);
			}
		} else {
			var message = '';
			for (var i = 0; i < data.messageList.length; i++) {
				message += data.messageList[i] + '<br />';
			}
			YM.page.alert(message,func("error"));	// 积分兑换不成功,阻止添加购物车动画
		}
	}

	function validateGoodsNum(goodsNum) {
		if (!/^[1-9]\d*$/.test(goodsNum)) {
			YM.page.alert('商品数量必须为正整数!');
			return false;
		}
		return true;
	}

	function commonSpecialaddCartFn(postParams, callback) {
		var callbackFn = callback || function() {
			YM.page.header.cart.update();
		};
		YM.dataproxy.ajax({
			url: YM.page.cart.API.ADD_GOODS_TO_CART_ACTION + '?' + postParams.join('&'),
			type: 'POST',
			cache: false,
			data: {},
			success: function(data) {
				ajaxCallback(data, callbackFn);
				try {
					for (var i = 0; i < YM.page.cart._addGoodsToCartListners.length; i++) {
						try {
							 YM.page.cart._addGoodsToCartListners[i]({});
						}catch (e){console.error(e);}	
					}
				}catch (e){console.error(e);}	
			},
			error: function() {
				YM.page.alert(errorTip);
				/* 积分兑换失败阻止动画窗口 */
				callback("error");
			}
		});
	}
	
	//临时覆盖线上老的加入购物车方法，已兼容线上js版本
	YM.namespace('YM.page.header.cart');
	YM.page.header.cart.addGood = function(goodsId, amountId, goodsYearId,goodsYear) {
		var goodsNum = 1;
		if (amountId) {
			goodsNum = (isNaN(amountId)) ? $('#'+amountId).val().trim() : amountId;
		}
		YM.page.cart.addGoodsToCartV2({goodsId:goodsId, goodsNum:goodsNum, yearGoodsId:goodsYearId,goodsYear:goodsYear});
	}; 
	YM.page.header.cart.delGood = function(goodsKey, cartType, goodsId) {
		YM.page.cart.removeGoodsFromCart(goodsKey, cartType, function() {
			YM.page.header.cart.update();
		}, goodsId);
	};


	//整个页面的数据输入控制
	//	 function bindGlobalNumInput(){
	//		 $('.class').bind()
	//	 }
	$(document).ready(function() {
		YM.page.cart.init();
	});
})(jQuery);

