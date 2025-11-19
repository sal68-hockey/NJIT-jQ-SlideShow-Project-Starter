let mCurrentIndex = 0;
let mImages = [];
const mUrl = "images.json";
const mWaitTime = 5000;
let mTimer;

$(document).ready(() => {
    $('.details').hide();

    fetchJSON();
    startTimer();

    $('.moreIndicator').click(function () {
        $(this).toggleClass('rot90 rot270');
        $('.details').slideToggle('slow');
    });

    $('#nextPhoto').click(() => { showNextPhoto(); });
    $('#prevPhoto').click(() => { showPrevPhoto(); });
});

function fetchJSON() {
    $.ajax({
        url: mUrl,
        dataType: 'json',
        success: function (data) {
            mImages = data.images;
            swapPhoto();
        },
        error: function (xhr, status, error) {
            console.error('Error loading JSON:', error);
        }
    });
}

function swapPhoto() {
    if (mImages.length === 0) return;
    const currentImage = mImages[mCurrentIndex];
    $('#photo').fadeOut(300, function () {
        $(this).attr('src', currentImage.imgPath).fadeIn(300);
    });
    $('#imgfish').text(currentImage.imgfish);
    $('#description').text(currentImage.description);
    $('#avgsize').text(currentImage.avgsize);
}

function showNextPhoto() {
    if (mImages.length === 0) return;
    mCurrentIndex = (mCurrentIndex + 1) % mImages.length;
    swapPhoto();
}

function showPrevPhoto() {
    if (mImages.length === 0) return;
    mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length;
    swapPhoto();
}

function startTimer() {
    clearInterval(mTimer);
    mTimer = setInterval(showNextPhoto, mWaitTime);
}