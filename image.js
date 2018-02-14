
  function each(arr, callback) {
    var length = arr.length;
    var i;

    for (i = 0; i < length; i++) {
      callback.call(arr, arr[i], i, arr);
    }

    return arr;
  }


    var image = document.querySelector('#image'); 
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
      },
      cropmove: function () {
        var cropper = this.cropper;
        var cropBoxData = cropper.getCropBoxData();
        var aspectRatio = cropBoxData.width / cropBoxData.height;

        if (aspectRatio < minAspectRatio) {
          cropper.setCropBoxData({
            width: cropBoxData.height * minAspectRatio
          });
        } else if (aspectRatio > maxAspectRatio) {
          cropper.setCropBoxData({
            width: cropBoxData.height * maxAspectRatio
          });
        }
      }
    });
  
  function crop() {
    console.log(cropper);
    cropper.getCroppedCanvas().toBlob(function (blob) {
     var formData = new FormData();
   
     formData.append('croppedImage', blob);
   
     // Use `jQuery.ajax` method
     $.ajax('/path/to/upload', {
       method: "POST",
       data: formData,
       processData: false,
       contentType: false,
       success: function () {
         alert('Upload success');
       },
       error: function () {
         alert('Upload error');
       }
     });
   });
 }