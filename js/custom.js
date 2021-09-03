$.getJSON('./profile-data.json', function(data) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);

    $.each(obj2, function(index, f) {
        var divEl = '<div class="news-slider__item swiper-slide"><a  class="news__item"><div class="icon"> <i class="fa fa-quote-right"></i> </div><div class="table"><h4 class="card-table">COURSE : ' + obj2[index]['a3'] + '</h4><h5 class="context-table">หลังจากเรียนได้อะไร</h5><h5 class="card-description">" ' + obj2[index]['a5'] + ' "</h5><h5 class="context-table">ฝากอะไรถึงครู</h5><h5 class="card-description">" ' + obj2[index]['a6'] + ' "</h5> </div><div style="margin-top: 35px;"> <h4 style="font-weight: 800;">' + obj2[index]['a2'] + '</h4></div> <div class="news__img"> <img src="' + obj2[index]['a9'] + '"> </div></a></div>';
        $(".slider-div").append(divEl);
    });



    var swiper = new Swiper('.news-slider', {
        effect: 'coverflow',
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        keyboard: true,
        spaceBetween: 0,
        slidesPerView: 'auto',
        speed: 300,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 3,
            slideShadows: false
        },
        breakpoints: {
            480: {
                spaceBetween: 0,
                centeredSlides: true
            }
        },
        simulateTouch: true,
        navigation: {
            nextEl: '.news-slider-next',
            prevEl: '.news-slider-prev'
        },
        pagination: {
            el: '.news-slider__pagination',
            clickable: true
        },
        on: {
            init: function() {
                var activeItem = document.querySelector('.swiper-slide-active');

                var sliderItem = activeItem.querySelector('.news__item');

                $('.swiper-slide-active .news__item').addClass('active');

                var x = sliderItem.getBoundingClientRect().left;
                var y = sliderItem.getBoundingClientRect().top;
                var width = sliderItem.getBoundingClientRect().width;
                var height = sliderItem.getBoundingClientRect().height;


                $('.item-bg').addClass('active');

                bg.style.width = width + 'px';
                bg.style.height = height + 'px';
                bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
            }
        }
    });

    swiper.on('touchEnd', function() {
        $('.news__item').removeClass('active');
        $('.swiper-slide-active .news__item').addClass('active');
    });

    swiper.on('slideChange', function() {
        $('.news__item').removeClass('active');
    });

    swiper.on('slideChangeTransitionEnd', function() {
        $('.news__item').removeClass('active');
        var activeItem = document.querySelector('.swiper-slide-active');

        var sliderItem = activeItem.querySelector('.news__item');

        $('.swiper-slide-active .news__item').addClass('active');

        var x = sliderItem.getBoundingClientRect().left;
        var y = sliderItem.getBoundingClientRect().top;
        var width = sliderItem.getBoundingClientRect().width;
        var height = sliderItem.getBoundingClientRect().height;


        $('.item-bg').addClass('active');

        bg.style.width = width + 'px';
        bg.style.height = height + 'px';
        bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
    });
});


var dataReview = [];



$.ajax({
    type: "GET",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_S6RpIjhdd84STwGr6oHAIIpRISqGqix_2lm01ZSmQcJBvjJ8jocr8A0EVPPF50-NhEa2k2adReCN/pub?gid=589590750&single=true&output=csv",
    dataType: "text",
    success: function(response) {
        var data = $.csv.toArrays(response);

        $.map(data, function(value, key) {
            if (key > 0) {
                dataReview.push({
                    course: value[3],
                    study: value[5],
                    say: value[6],
                    name: value[1]
                })
            }

        });

        mapData()
    }
});


function mapData() {
    $.map(dataReview, function(el, key) {
        // key = key + 1
        key = dataReview.length - key


        if (key < 10) {
            key = '0' + key
        }

        var content = '<div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 blogBox review-content"> <div class="content-in"> <div class="number">' + el.name + '</div>' +
            '<div class="header-course">' + el.course + '</div>' +
            '<div class="header">หลังจากเรียนได้อะไร</div>' +
            '<div class="content">" ' + el.study + ' "</div>' +
            '<div class="header">ฝากอะไรถึงครู</div>' +
            '<div class="content">" ' + el.say + '" </div>' +
            '</div></div>';

        $('#review-all .row').prepend(content);
    });

    $(".review-content").slice(0, 6).show();

    if ($(".blogBox:hidden").length != 0) {
        $("#loadMore").show();
    }

}

$("#loadMore").click(function(e) {
    e.preventDefault();
    $(".review-content:hidden").slice(0, 6).slideDown();
    if ($(".review-content:hidden").length == 0) {
        $("#loadMore").fadeOut('slow');
    }

});

const observer = lozad();
observer.observe();

$('#subject').change(function() {
    var data = $(this).val();
    var selectValues = '';

    if (data === 'ภาษาไทย' || data === 'คณิตศาสตร์') {
        selectValues = {
            "": "เลือกคอร์ส",
            "อนุบาล": "อนุบาล",
            "ประถมศึกษา": "ประถมศึกษา",
            "มัธยมตอนต้น": "มัธยมตอนต้น",
            "มัธยมตอนปลาย": "มัธยมตอนปลาย",
        };
    } else if (data === 'ภาษาอังกฤษ') {
        selectValues = {
            "": "เลือกคอร์ส",
            "ติวสัมภาษณ์เข้า มหาวิทยาลัย": "ติวสัมภาษณ์เข้า มหาวิทยาลัย",
            "เรียนเพื่อเพิ่มเกรด": "เรียนเพื่อเพิ่มเกรด",
            "ติวเนื้อหา Eng1,Eng2,Eng3 ของมช.": "ติวเนื้อหา Eng1,Eng2,Eng3 ของมช.",
            "Grammar 12 Tenses": "Grammar 12 Tenses",
            "Conversation หลักสูตร 3 เดือน": "Conversation หลักสูตร 3 เดือน",
            "ปรับพื้นฐานเพื่อใช้ในการทำงาน/ไปต่างประเทศ/ใช้ในชีวิตประจำวัน/สอบDIFA,TOEIC": "ปรับพื้นฐานเพื่อใช้ในการทำงาน/ไปต่างประเทศ/ใช้ในชีวิตประจำวัน/สอบDIFA,TOEIC",
            "ติวสอบ Midterm/Final ทุกระดับชั้น": "ติวสอบ Midterm/Final ทุกระดับชั้น",
            "ติวสอบเข้ามหาวิทยาลัย": "ติวสอบเข้ามหาวิทยาลัย",
            "Speaking in Daily Life": "Speaking in Daily Life",
            "Phonics เด็กประถม": "Phonics เด็กประถม",
            "การประกอบคำ การออกเสียง": "การประกอบคำ การออกเสียง",
            "Conversation for kids": "Conversation for kids",
        };
    }

    var $mySelect = $('#course');
    $mySelect.html('');

    $.each(selectValues, function(key, value) {
        var $option = $("<option/>", {
            value: key,
            text: value
        });

        $mySelect.append($option);
    });

});



function showLoadingIndicator() {
    form.classList.add('is-hidden')
    loading.classList.remove('is-hidden')
}

function showSuccessMessage(response) {
    console.log('Success!', response)
    setTimeout(() => {
        successMessage.classList.remove('is-hidden')
        loading.classList.add('is-hidden')
    }, 500)
}

function showErrorMessage(error) {
    console.error('Error!', error.message)
    setTimeout(() => {
        errorMessage.classList.remove('is-hidden')
        loading.classList.add('is-hidden')
    }, 500)
}