/**
 * Created with JetBrains WebStorm.
 * Author: Shiming
 * Date: 2/28/13
 * Time: 10:37 AM
 * create this jQuery plugin for ie6,7,8 to fix placeholder attribute
 */
（function(){
    var Placeholder;
    var inputHolder = 'Placeholder' in document.createElement('input');
    var textareaHolder = 'Placeholder' in document.createElement('textarea');

    Placeholder = {
        ini:function () {
            if (!inputHolder) {
                $('input').placeholder()
            }
            if (!textareaHolder) {
                $('textarea').placeholder();
            }
        },
        set: function(obj){
            var ipt = obj ? $(obj) : $(this),
                txt = obj.attr('placeholder');
            if (txt) {
                var span = $('<span />');
                span.text(txt);
                span.css({
                    color: '#999',
                    position: 'absolute',
                    top: ipt.offset().top,
                    left: ipt.offset().left,
                    width: ipt.width(),
                    height: ipt.height(),
                    lineHeight: ipt.height(),
                    textIndent: ipt.css('textIndent'),
                    padding: ipt.css('border')
                })
                Placeholder.ipts.push(span);
            }
        },
        ipts : [],
        listen : function() {
            if (!inputHolder || !textareaHolder) {
                $(document).live('keydown', function(e){
                    if ($(this) in Placeholder.ipts) {
                        if ($(this).val() != '') {
                            $(this).hide(0);
                        } else if ( /[a-zA-Z0-9`~!@#\$%\^&\*\(\)_+-=\[\]\{\};:'"\|\\,.\/\?<>]/.test(String.fromCharCode(e.keyCode)) ) {
                            $(this).hide(0);
                        } else {
                            $(this).show(0);
                        }
                    }
                });
                $(document).live('keyup', function(e){
                    if ($(this) in Placeholder.ipts) {
                        if ($(this).val() != '') {
                            $(this).hide(0);
                        } else {
                            $(this).show(0);
                        }
                    }
                })
            }
        }
    }
    $.placeholder = Placeholder；
    $.fn.placeholder = function () {
        if (!inputHolder) {
            $(this).find('input').each(Placeholder.set)
            Placeholder.listen()
        }
        if (!textareaHolder) {
            $(this).find('textarea').each(Placeholder.set)
            Placeholder.listen()
        }
    }
})()