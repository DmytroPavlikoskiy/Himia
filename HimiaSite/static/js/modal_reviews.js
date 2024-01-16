let modal_thanks = document.querySelector(".modal_thanks");
let ModalReviewsDiv = document.querySelector(".modal_reviews_control");
let thanks_control = document.querySelector(".thanks_control");
let thanks_star = document.querySelectorAll(".thanks_star");
let rating_main_star = document.querySelectorAll(".main_star");
let rating_second_star = document.querySelectorAll(".second_star");
let block_reviews_control = document.querySelector(".block_reviews_control");
let block_reviews_control_count_star = block_reviews_control.querySelector("span");
let rating_of_reviews_control = document.querySelector(".rating_of_reviews_control");
let rating_of_reviews_control_count_star = rating_of_reviews_control.querySelector("h2");
let client_comment_star_control = document.querySelectorAll(".client_comment_star_control");
// let rating_client_star = document.querySelectorAll(".client_star");


function OpenModal(el) {
    ModalReviewsDiv.style.display = "flex";
}

function CloseModal(el) {
    ModalReviewsDiv.style.display = "none";
}

function CloseModalThanks() {
    thanks_control.classList.remove('scale-in');
    thanks_control.classList.add('scale-out');
    setTimeout(()=>{
        thanks_control.classList.remove('scale-out');
        modal_thanks.style.display = "none";
    }, 500)
}

function validateForm() {
    const nameInput = document.querySelector('.input_name');
    const textArea = document.querySelector('.inp_text');
    const cyrillicAndPunctuationRegex = /^[\u0020-\u052F\s]+$/;

    if (!nameInput.value.trim() || !textArea.value.trim()) {
        createMessage('error', 'Будь ласка, заповніть всі поля.');
        return false;
    }

    if (!cyrillicAndPunctuationRegex.test(nameInput.value)) {
        createMessage('error', 'Ім\'я повинно містити тільки кириличні символи.');
        return false;
    }

    if (!cyrillicAndPunctuationRegex.test(textArea.value)) {
        createMessage('error', 'Текст повинен містити тільки кириличні символи.');
        return false;
    }

    if (textArea.value.length > 500) {
        createMessage('error', 'Символів не повинно бути більше 500.');
        return false;
    }

    return true;
}

function DrawGoldMessageClientStar() {
    let icon_star = 0
    client_comment_star_control.forEach((client_comment)=>{
        let rating_star = client_comment.getAttribute("data-rating_star");
        let client_star = client_comment.querySelectorAll(".client_star");
        client_star.forEach((star) => {
            icon_star += 1
            if (icon_star <= rating_star) {
                star.style.color = "#fb4";
                if (rating_star === 5) {
                    star.style.textShadow = "0 0 2px #952";
                }
            }
        })
        icon_star = 0
    })

}
DrawGoldMessageClientStar()

function DrawGoldModalStars(selectedRating){
    let ratingStar = 0
    thanks_star.forEach((star)=>{
        ratingStar += 1
        if (ratingStar <= selectedRating) {
            star.style.color = "#fb4";
            if (selectedRating === 5) {
                star.style.textShadow = "0 0 2px #952";
            }
        }
    })

}

function DrawGoldMainStars(final_rating){
    let ratingStar = 0
    rating_main_star.forEach((star)=>{
        ratingStar += 1
        if (ratingStar <= final_rating) {
            star.style.color = "#fb4";
            if (final_rating === 5) {
                star.style.textShadow = "0 0 2px #952";
            }
        }
    })
    rating_of_reviews_control_count_star.innerHTML = final_rating

}

DrawGoldMainStars(final_rating)

function DrawGoldSecondStars(final_rating){
    console.log(final_rating)
    let ratingStar = 0
    rating_second_star.forEach((star)=>{
        ratingStar += 1
        if (ratingStar <= final_rating) {
            star.style.color = "#fb4";
            if (final_rating === 5) {
                star.style.textShadow = "0 0 2px #952";
            }
        }
    })
    block_reviews_control_count_star.innerHTML = final_rating

}

DrawGoldSecondStars(final_rating)





function CollectData() {
    let csrfToken = getCsrfToken();
    const URL = "/products/save_comment_rating_for_product/"
    let user_id = null
    let InputNameValue = document.querySelector(".input_name").value
    let InputCommentsValue = document.querySelector(".inp_text").value
    let Product_id = document.querySelector(".reviews_product").getAttribute("data-product_id");
    console.log(InputNameValue)
    console.log(InputCommentsValue)
    if (validateForm()) {
        const selectedRating = document.querySelector('.star-widget .modal_star[name="rate"]:checked').value;
        if (userIsAuthenticated) {
            user_id = userId
        }
        let data = {
            user_id: user_id,
            input_name_value: InputNameValue,
            input_comments_value: InputCommentsValue,
            product_id:Product_id,
            rating_product: selectedRating
        }
        $.ajax({
            type: "POST",
            url: URL,
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
            success: function (response) {
                ModalReviewsDiv.style.display = "none";
                modal_thanks.style.display = "flex";

                DrawGoldModalStars(selectedRating)
                DrawGoldMainStars(response.final_rating)
                DrawGoldSecondStars(response.final_rating)

                thanks_control.classList.add('scale-in');
                setTimeout(() => {
                    thanks_control.classList.remove('scale-in');
                    thanks_control.classList.add('scale-out');

                    setTimeout(() => {
                        modal_thanks.style.display = "none";
                        thanks_control.classList.remove('scale-out');
                    }, 500);
                }, 3000);
            },
            error: function (error) {

            },
        });
    }
}