document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    var $dropzone = document.querySelector('.dropzone'),
        $result = document.querySelector('.result'),
        $result_preview = document.getElementById('result-preview'),
        $result_code = document.getElementById('result-code'),
        $result_infos = document.getElementById('result-infos'),
        $result_base64 = document.getElementById('result-base64');

    $dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        if (!file.type.startsWith('image/')) {
            return;
        }

        var reader = new FileReader();
        reader.onload = function(event) {
            var base64 = event.target.result,
                _img = new Image();
            _img.src = base64;
            _img.onload = function() {

                var _backgroundImage = "url('" + base64 + "')",
                    _backgroundSize = _img.width + "px " + _img.height + "px";

                /* Display base64 */
                $result_base64.innerHTML = base64;

                /* Display preview */
                $result_preview.style.backgroundImage = _backgroundImage;
                $result_preview.style.backgroundSize = _backgroundSize;

                /* Display infos */
                $result_infos.innerHTML = "Size Before: " + file.size + " octets<br />" + "Size After: " + base64.length + " chars";

                /* Display code */
                var _code = ".element {\n";
                _code += "    background-image: " + _backgroundImage + ";\n";
                _code += "    background-size: " + _backgroundSize + ";\n";
                _code += "}";

                $result_code.innerHTML = _code;

                /* Display area */
                $result.setAttribute('data-visible', '1');

            };
        };
        reader.readAsDataURL(file);
    });

    $dropzone.addEventListener('dragover', function(e) {
        $dropzone.setAttribute('data-drag', '1');
        e.preventDefault();
    });

    $dropzone.addEventListener('dragenter', function(e) {
        $dropzone.setAttribute('data-drag', '1');
        e.preventDefault();
    });

    $dropzone.addEventListener('dragleave', function(e) {
        $dropzone.setAttribute('data-drag', '0');
        e.preventDefault();
    });

    /* Select all on the first click on a PRE */
    Array.prototype.forEach.call(document.querySelectorAll('pre'), function(el) {
        el.addEventListener('focus', function(e) {
            var range = document.createRange();
            range.selectNodeContents(e.target);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
    });

});
