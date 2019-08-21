window.onload = function () {
    let box = $('#box')
    let pdwidth = 150
    let boxwidth = 500
    let dragleft = 0
    let dragright = 0

    box.on('mousedown', function(){
        if (box.hasClass('transition')) return;//检查被选元素是否包含指定的 class。
            dragleft = event.pageX;
                $(this).on('mousemove', function(){
                dragright = event.pageX;
                $(this).css('transform','translateX('+ dragPos() +'px)')//拖拽
            })
        $(document).on('mouseup', function(){
            //判断
            if (dragPos() > pdwidth) {
                return shiftSlide(1)
            }
            if (dragPos() < -pdwidth) {
                return shiftSlide(-1)
            }
            shiftSlide(0);
            })
        });
    //定义拖拽
    function dragPos() {
        return dragright - dragleft;
    }
    //拖拽后
    function shiftSlide(direction) {
          if (box.hasClass('transition')) return;//检查当前的元素是否含有某个特定的类，如果有，则返回true。
          dragright = dragleft;
          $(document).off('mouseup')//用于移除通过 on() 方法添加的事件处理程序。
          box.off('mousemove')
                  .addClass('transition')//为每个匹配的元素添加指定的类名。
                  .css('transform','translateX(' + (direction * boxwidth) + 'px)');//方向
          setTimeout(function(){
              if (direction === 1) {
                $('.boxz:first').before($('.boxz:last'));//before() 方法在被选元素前插入指定的内容。
              } else if (direction === -1) {
                $('.boxz:last').after($('.boxz:first'));//after() 方法在被选元素后插入指定的内容。first获取匹配的第一个元素,last获取匹配的最后个元素
              }
              box.removeClass('transition')//从所有匹配的元素中删除全部或者指定的类。
                  box.css('transform','translateX(0px)');
          },700)
    }
}