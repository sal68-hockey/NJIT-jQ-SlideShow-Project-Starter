let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'https://your-json-url.com' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds
let mTimer // Store the timer reference

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  // Start the timer for the slideshow
  startTimer()

  // Toggle more info section when the indicator is clicked
  $('.moreIndicator').click(function () {
    $(this).toggleClass('rot90 rot270')
    $('.details').slideToggle('slow')
  })

  
  $('#nextPhoto').click(() => {
    showNextPhoto()
  })

  
  $('#prevPhoto').click(() => {
    showPrevPhoto()
  })

  
  fetchJSON()
})


function fetchJSON () {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images 
      swapPhoto()
    },
    error: function (xhr, status, error) {
      console.error('Error loading JSON:', error)
    }
  })
}

function swapPhoto () {
  if (mImages.length === 0) return

  const currentImage = mImages[mCurrentIndex]
  $('#photo').attr('src', currentImage.imgPath)
  $('.location').text('Location: ' + currentImage.imgLocation)
  $('.description').text('Description: ' + currentImage.description)
  $('.date').text('Date: ' + currentImage.date)
}


function showNextPhoto () {
  mCurrentIndex++
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0
  }
  swapPhoto()
}

function showPrevPhoto () {
  mCurrentIndex--
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1
  }
  swapPhoto()
}


function startTimer () {
  clearInterval(mTimer) 
  mTimer = setInterval(showNextPhoto, mWaitTime)
}