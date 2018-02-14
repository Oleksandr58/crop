
  function each(arr, callback) {
    var length = arr.length;
    var i;

    for (i = 0; i < length; i++) {
      callback.call(arr, arr[i], i, arr);
    }

    return arr;
  }


    var image = document.querySelector('#js-crop-image'); 
    var previews = document.querySelectorAll('.preview');
    var AspectRatio = 1;
    var cropper = new Cropper(image, {
      minCropBoxWidth: 100,
      minCropBoxHeight: 100,
      background: false,
      aspectRatio: AspectRatio ,
      zoomable: false,
      ready: function () {
        var clone = this.cloneNode();

        clone.className = ''
        clone.style.cssText = (
          'display: block;' +
          'width: 100%;' +
          'min-width: 0;' +
          'min-height: 0;' +
          'max-width: none;' +
          'max-height: none;'
        );

        each(previews, function (elem) {
          elem.appendChild(clone.cloneNode());
        });
      },

      crop: function (e) {
        var data = e.detail;
        var cropper = this.cropper;
        var imageData = cropper.getImageData();
        var previewAspectRatio = data.width / data.height;

        each(previews, function (elem) {
          var previewImage = elem.getElementsByTagName('img').item(0);
          var previewWidth = elem.offsetWidth;
          var previewHeight = previewWidth / previewAspectRatio;
          var imageScaledRatio = data.width / previewWidth;

          elem.style.height = previewHeight + 'px';
          previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px';
          previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px';
          previewImage.style.marginLeft = -data.x / imageScaledRatio + 'px';
          previewImage.style.marginTop = -data.y / imageScaledRatio + 'px';
        });
      }
    });
  
  function crop() {
    var cropBox = cropper.cropBox;
    var transform= cropBox.style.transform;
    var transformCropBox = cropBox.style.transform.replace(/[^0-9, '.']/g,'');
    var transformArray = transformCropBox.split(' ');
    var offsetX = +transformArray[0] || 0;
    var offsetY = +transformArray[1] || 0;
    var cropWidth = parseFloat(cropBox.style.width);
    var cropHeight = parseFloat(cropBox.style.height);
    var imageWidth = document.querySelector('.cropper-container').offsetWidth;
    var imageHeight = document.querySelector('.cropper-container').offsetHeight;

    if ( !(transform.indexOf('translateX(') + 1 ) ) {
      offsetX = 0;
      offsetY = +transformArray[0] || 0;
    }

    var obj = {
      'imageWidth': imageWidth,
      'imageHeight': imageHeight,
      'startCropX': offsetX,
      'startCropY': offsetY,
      'cropWidth': cropWidth,
      'cropHeight': cropHeight
    };

    $.post('test.php', obj);    
 }