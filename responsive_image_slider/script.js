const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

//for auto scrolling
const auto = true;
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
	//grab the current element
	const current = document.querySelector(".current");

	//remove current class
	current.classList.remove("current");

	//check for next slide
	if (current.nextElementSibling) {
		//add current to the nextElementSibling

		current.nextElementSibling.classList.add("current");
	} else {
		//go to begining slide and add current class

		slides[0].classList.add("current");
	}

	setTimeout(() => current.classList.remove("current"));
};

const prevSlide = () => {
	//grab the current element
	const current = document.querySelector(".current");

	//remove current class
	current.classList.remove("current");

	//check for next slide
	if (current.previousElementSibling) {
		//add current to the previousElementSibling
		current.nextElementSibling.classList.add("current");
	} else {
		//go to last slide and add current class

		slides[slides.length - 1].classList.add("current");
	}

	setTimeout(() => current.classList.remove("current"));
};

//button events

next.addEventListener("click", (e) => {
	nextSlide();
	if (auto) {
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	}
});
prev.addEventListener("click", (e) => {
	prevSlide();
	if (auto) {
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	}
});

//auto slide

if (auto) {
	//run next slide at interval time
	slideInterval = setInterval(nextSlide, intervalTime);
}
