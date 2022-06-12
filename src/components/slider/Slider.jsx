import "./slider.css";

export default function Slider({ imgs }) {
  let slideIndex = 0;

  const showSlides = () => {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length > 0) {
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = "block";
    }
    setTimeout(showSlides, 3000); // Change image every 3 seconds
  };
  showSlides();

  return (
    <div className="slideshow-container">
      {imgs.length > 0 &&
        imgs.map((img, i) => (
          <div className="mySlides fade" key={i}>
            <img src={img.img} alt="slider" />
          </div>
        ))}
    </div>
  );
}
