$(function () {
    /*轮播图*/
    banner();
    /*移动端tab滑动*/
    swipeTab();
    /*初始工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function () {
    /*需求：动态渲染轮播图*/
    /*1. 需要去判断当前设备是移动端还是非移动端*/
    /*2. 根据图片地址去生成你的HTML格式的代码 (存在data-属性上)*/
    /*3. 你可以把HTML代码追加在对应的位置*/
    var render = function () {
        /*临界点 768px 以下称为 超小屏设备 */
        var isMobile = $(window).width() < 768;
        $('#carousel-example-generic .item').each(function () {
            var html = '';
            if(isMobile){
                html = '<a class="m_imgBox" href="#"><img src="'+$(this).data('mUrl')+'" alt=""></a>';
            }else{
                html = '<a href="#" class="pc_imgBox" style="background-image: url('+$(this).data('pcUrl')+');"></a>';
            }
            $(this).html(html);
        });
    };
    render();
    /*需求 在页面尺寸发生改变的时候 重新渲染轮播图*/
    $(window).on('resize',function () {
        render();
    });
    /*需求 在移动端进行手势切换  上一张  下一张*/
    /*手势：左滑手势  右滑手势*/
    /*1. 滑动结束之后对行为的判断*/
    /*2. 条件：一定滑动过 滑动的距离50px */
    /*结论：基于touch事件的封装 衍生出来的 */
    var isMove = false;
    var distanceX = 0;
    var startX = 0;
    $('.wjs_banner').on('touchstart',function (e) {
        //originalEvent 指的是原生事件对象
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function (e) {
        isMove = true;
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
    }).on('touchend',function (e) {
        /*对手势判断*/
        if(isMove && Math.abs(distanceX) > 50){
            /*手势*/
            if(distanceX > 0){
                /*右滑手势*/
                console.log('swipeRight');
                /*上一张*/
                $('#carousel-example-generic').carousel('prev');
            }else{
                /*左滑手势*/
                console.log('swipeLeft');
                /*下一张*/
                $('#carousel-example-generic').carousel('next');
            }
        }
        isMove = false;
        distanceX = 0;
        startX = 0;
    });
    //初始化
    /*$('#carousel-example-generic').carousel({
        interval:1000
    });*/
};
var swipeTab = function () {
    /*需求*/
    /*1. 一行显示*/
    var $mobileTab = $('#mobileTab');
    var widthSum = 0;
    $mobileTab.find('li').each(function () {
        /*jquery获取元素尺寸的方法 width() innerWidth() outerWidth() outerWidth(true)*/
        widthSum += $(this).outerWidth(true);
    });
    $mobileTab.width(widthSum);
    //父容器溢出隐藏
    $mobileTab.parent().css('overflow','hidden');
    /*2. 区域滚动  大容器套小容器*/
    new IScroll('#mobileTabParent',{
        scrollX:true,
        scrollY:false
    });
};