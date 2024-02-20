
$(document).ready(function(){
    let $image_crop = $('#image_demo').croppie({
        enableExif: true,
        viewport: {
            width:200,
            height:200,
            type:'circle'
        },
        boundary:{
            width:300,
            height:300
        }
    });

    $('#upload_file').on('change', function(){
        let reader = new FileReader();
        reader.onload = function (event) {
            $image_crop.croppie('bind', {
                url: event.target.result
            });
            $('#uploadimage').show();
        }
        reader.readAsDataURL(this.files[0]);
    });

    $('.crop_image').click(function(event){
        let userId = $(this).data('user_id');
        let formData = new FormData();
        formData.append('user_id', userId);
        // formData.append('image', $('#upload_file')[0].files[0]);

        let csrfToken = getCsrfToken();
        $image_crop.croppie('result', {
            type: 'blob',
            size: 'viewport'
        }).then(function(blob){
            formData.append('image', blob, `profile_image_${userId}.png`);
            $.ajax({
                url:"/users/upload_profile_image/",
                type: "POST",
                headers: {
                    "X-CSRFToken": csrfToken
                },
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    console.log(data)
                    $('#avatar').attr('src', data.image_url);
                    createMessage("success", data.success)
                    $('#uploadimage').hide();
                    setTimeout(() => {
                        location.reload()
                    }, 2000)
                },
                error: function (data) {
                    createMessage("error", data.error);
                }
            });
        });
    });

    $('.close_btn_cont').click(function() {
        $('#uploadimage').hide();
        // Видаляємо вміст інпуту для завантаження файлу
        $('#upload_file').val('');
        // Очищаємо зображення у croppie
        $image_crop.croppie('bind', {
            url: ''
        });
    });

});


function DeleteProfileImage(el){
    let user_id = el.getAttribute("data-user_id");
    let csrfToken = getCsrfToken();
    let URL = "/users/delete_profile_image/"

    let data = {
        "user_id": Number(user_id)
    }

    $.ajax({
        type: 'POST',
        url: URL,
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
        success: function (response) {
            createMessage("success", response.success);
            setTimeout(()=>{
                location.reload()
            }, 2000)
        },
        error: function (response) {
            createMessage("error", response.error);
        },
    });
}


