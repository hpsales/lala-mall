define(["jquery.ui"],function(a){var b={default:{params:{status:"0",styleType:"1",dataType:"1",starttime:"5",endtime:"60"},css:{background:"#ff2d4b",color:"#ffffff",opacity:"0.7"},data:{M0123456789101:{avatar:"../addons/we7_wmall/plugin/diypage/static/img/1.png",nickname:"粉丝昵称",time:"5"}}}};return b.init=function(a){window.tmodtpl=a.tmodtpl,b.attachurl=a.attachurl,b.danmu=a.danmu,b.danmu||(b.danmu=b.default),tmodtpl.helper("tomedia",function(a){return 0==a.indexOf("images/")?b.attachurl+a:"string"!=typeof a?"":0==a.indexOf("http://")||0==a.indexOf("https://")||0==a.indexOf("../addons/ewei_shopv2/")?a:0==a.indexOf("images/")||0==a.indexOf("audios/")?diy.attachurl+a:void 0}),b.tplDanmu(),b.tplEditor(),b.initGotop(),b.save()},b.tplDanmu=function(){var a=tmodtpl("tpl-show-danmu",b.danmu);$("#app-preview").html(a).show()},b.initSortable=function(){$(".app-editor .form-items .inner").sortable({opacity:.8,placeholder:"highlight",items:".item",revert:100,scroll:!1,cancel:".goods-selector,input,select,.btn,.btn-del,.three",start:function(a,b){var c=b.item.height();$(".highlight").css({height:c+22+"px"}),$(".highlight").html('<div><i class="fa fa-plus"></i> 放置此处</div>'),$(".highlight div").css({"line-height":c+16+"px","font-size":"16px",color:"#999","text-align":"center",border:"2px dashed #eee"})},update:function(a,c){var d=c.item.closest(".form-items").data("type");b.sortChildItems(d)}})},b.sortChildItems=function(){var a=[];$("#form-items .item").each(function(c){var d=$(this).data("index"),e=b.danmu.data[d];e&&(a[c]=e)}),b.danmu.data=a,b.tplDanmu()},b.tplEditor=function(){var a=tmodtpl("tpl-editor-danmu",b.danmu);$("#app-editor .inner").html(a),$("#app-editor .slider").each(function(){var a=$(this).data("decimal"),b=($(this).data("multiply"),$(this).data("value"));a&&(b*=a),$(this).slider({slide:function(b,c){var d=c.value;a&&(d/=a),$(this).siblings(".input").val(d).trigger("propertychange"),$(this).siblings(".count").find("span").text(d)},value:b,min:$(this).data("min"),max:$(this).data("max")})}),$("#app-editor").find(".diy-bind").bind("input propertychange change",function(){var a=$(this),c=a.data("bind"),d=a.data("bind-child"),e=a.data("bind-parent"),f=a.data("bind-three"),g=a.data("bind-init"),h="",i=this.tagName;if("INPUT"==i){var j=a.data("placeholder");h=a.val(),h=""==h?j:h}else"SELECT"==i?h=a.find("option:selected").val():"TEXTAREA"==i&&(h=a.val());h=$.trim(h),d?e||0==e?f?b.danmu[d][e].child[f][c]=h:b.danmu[d][e][c]=h:b.danmu[d][c]=h:b.danmu[c]=h,b.tplDanmu(),g&&b.tplEditor()}),$("#app-editor #addItem").unbind("click").click(function(){var a=b.getId("M",0),c=$(this).closest(".form-items").data("max");if(b.length(b.danmu.data)>=c)return void Notify.info("最大添加 "+c+" 个！");b.danmu.data[a]={avatar:"../addons/we7_wmall/plugin/diypage/static/img/1.png",nickname:"粉丝昵称",time:"5"},b.tplDanmu(),b.tplEditor()}),$("#app-editor .form-items .item .btn-del").unbind("click").click(function(){var a=$(this).closest(".item").data("id"),c=$(this).closest(".form-items").data("min");if(c){b.danmu.data||(b.danmu.data=[]);if(b.danmu.data.length<=c)return void Notify.msgbox.err("至少保留 "+c+" 个")}Notify.confirm("确定删除吗",function(){delete b.danmu.data[a],b.tplDanmu(),b.tplEditor()})}),$("#diy-editor").show(),b.initSortable()},b.initGotop=function(){$(window).bind("scroll resize",function(){$(window).scrollTop()>100?$("#gotop").show():$("#gotop").hide(),$("#gotop").unbind("click").click(function(){$("body").animate({scrollTop:"0px"},1e3)})})},b.length=function(a){if(void 0===a)return 0;var b=0;for(var c in a)b++;return b},b.getId=function(a,b){return a+(+new Date+b)},b.save=function(){$(".btn-save").unbind("click").click(function(){if($(this).data("status"))return void Notify.info("正在保存，请稍候。。。");if(!b.danmu)return void Notify.info("订单数据不能为空！");$(".btn-save").data("status",1).text("保存中...");$.post("./index.php?c=site&a=entry&ctrl=diypage&ac=danmu&do=web&m=we7_wmall",{danmu:b.danmu},function(a){if($(".btn-save").text("保存菜单").data("status",0),0!=a.message.errno)return void Notify.error(a.message.result);Notify.success("保存成功！",a.message.url)},"json")})},b});