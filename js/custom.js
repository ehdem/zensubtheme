var $ = jQuery
$(document).ready(function () {
  // Call event on submit..
  $(
    //'#webform-submission-register-for-a-study-webform-add-form',
    //'#webform-submission-register-for-a-study-webform-cb-add-form'
    '#webform-submission-register-for-a-study-webform-add-form, #webform-submission-register-for-a-study-webform-cb-add-form'
  ).submit(function () {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    })
 })

  //toggle menu
  $('.hamburger-container').click(function () {
    $('.main-menu .menu').slideToggle()
  })

  // Current Studie LPs - Mobile View - lower volunteer sign up form
  if ($(window).width() < 767) {
    $('.qualifiction-conclusive').text(
      $('.qualifiction-conclusive').text().replace('above', 'below')
    ) // adjust the messaging
    $('#vol-form-bottom-container').append($('#banner-form-left'))
  }

  // Volunteer form background
  $('.left').attr('style', 'padding-right: 10px;')
  $('.right').attr(
    'style',
    'height: 100px; overflow: scroll; text-align: left; background: white; font-size: 14px; line-height: 170%; padding: 2px'
  )

  // Enlarge checkbox size (in consideration of mobile devices displaying too small)
  $('.termscls').attr('style', 'min-width: 24px;min-height: 24px')

  $('.blog-header-block,.blog-clinical-news-block').wrapAll(
    '<div class="blog-block"></div>'
  )
  // Mobile View Sign up Form
  // if($(window).width() < 767)
  // {
  //     $(".banner-form-left").appendTo(".banner-form .alta-col-lg-8");
  // }

  // What to Expect - Read More
  $('.three-column-section-text-wrapper + .toggle-read-english').each(
    function () {
      $(this).on('click', function () {
        $(this).siblings().toggleClass('open')
        if ($(this).text() === 'Read More') {
          $(this).text('Show Less')
        } else {
          $(this).text('Read More')
        }
      })
    }
  )
  $(
    '.Chinese .three-column-section-text-wrapper + .toggle-read-english + .toggle-read-chinese'
  ).each(function () {
    $(this).siblings('.toggle-read-english').remove()
    $(this).on('click', function () {
      $(this).siblings().toggleClass('open')
      if ($(this).text() === '阅读更多') {
        $(this).text('显示较少')
      } else {
        $(this).text('阅读更多')
      }
    })
  })
  $(
    '.Japanese .three-column-section-text-wrapper + .toggle-read-english + .toggle-read-chinese + .toggle-read-japanese'
  ).each(function () {
    $(this).siblings('.toggle-read-english').remove()
    $(this).siblings('.toggle-read-chinese').remove()
    $(this).on('click', function () {
      $(this).siblings().toggleClass('open')
      if ($(this).text() === '>>続きを読む') {
        $(this).text('<<閉じる')
      } else {
        medium
        $(this).text('>>続きを読む')
      }
    })
  })
})

// Webforms + ad integration
document.addEventListener('DOMContentLoaded', () => {
  const button_cta = document.querySelector('.alta-cta-wrapper a')
  const signup_cta = document.querySelector('.signupbtn a')

  search_params = [
    { name: 'utm_source', form_name: 'utm_source' },
    { name: 'utm_medium', form_name: 'utm_medium' },
  ]

  // Look for params of interest
  const urlParams = new URLSearchParams(location.search)
  query_string = ''

  for (const [key, value] of urlParams) {
    for (const param of search_params) {
      // console.log(key, value, param.name)
      if (key === param.name) {
        query_string = query_string + '&' + param.form_name + '=' + value
      }
    }
  }

  if (query_string === '') {
    return // No need to do anything if no params of interest are found
  }

  // Update the call to action with new link
  cta_arr = [button_cta, signup_cta]

  for (cta of cta_arr) {
    if (cta) {
      url = cta.getAttribute('href')
      set_url(cta, url, query_string)
    }
  }
})

// Update the call to action with new link
function set_url(cta, url, query_string) {
  if (url.includes('?')) {
    new_url = url + query_string
  } else {
    new_url = url + '?' + query_string.substring(1)
  }
  cta.setAttribute('href', new_url)
}
