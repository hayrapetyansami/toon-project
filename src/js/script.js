window.addEventListener("DOMContentLoaded", () => {
	const menuBtn = document.querySelector(".menuBtn");
	const navMenu = document.querySelector("#menu");

	menuBtn.addEventListener("click", () => {
		if (!menuBtn.classList.contains("open")) {
			menuBtn.classList.add("open");
			navMenu.classList.add("active_nav");
		} else {
			menuBtn.classList.remove("open");
			navMenu.removeAttribute("class")
		}
	});
});