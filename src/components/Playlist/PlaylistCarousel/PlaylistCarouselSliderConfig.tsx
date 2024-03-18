export const SLIDER_SETTINGS = {
  centerMode: true,
  autoplay: false,
  autoplaySpeed: 4000,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 3440,
      settings: {
        centerPadding: "1500px",
        slidesToShow: 3
      }
    },
    {
      breakpoint: 2960,
      settings: {
        centerPadding: "1000px",
        slidesToShow: 3
      }
    },
    {
      breakpoint: 2480,
      settings: {
        centerPadding: "750px",
        slidesToShow: 3
      }
    },
    {
      breakpoint: 2100,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1720,
      settings: {
        centerPadding: "350px",
        slidesToShow: 1
      }
    },
    {
      breakpoint: 1360,
      settings: {
        centerPadding: "250px",
        slidesToShow: 1
      }
    },
    {
      breakpoint: 1020,
      settings: {
        arrows: false,
        centerPadding: "200px",
        slidesToShow: 1
      }
    },
    {
      breakpoint: 690,
      settings: {
        arrows: false,
        slidesToShow: 1,
        swipeToSlide: true,
        centerPadding: "20px"
      }
    }
  ]
}
