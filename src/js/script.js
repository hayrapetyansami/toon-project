window.addEventListener("DOMContentLoaded", () => {
	const menuBtn = document.querySelector(".menuBtn");
	const navMenu = document.querySelector("#menu");
	const logo = document.querySelector(".nav_logo");
	const topNavSwitch = document.querySelector(".topNavSwitch");
	const scrollDown = document.querySelector(".scrollDown");
	const main = document.querySelector("main");

	const save = topNavSwitch.innerHTML;
	menuBtn.addEventListener("click", () => {
		if (!menuBtn.classList.contains("open")) {
			menuBtn.classList.add("open");
			navMenu.classList.add("active_nav");
			topNavSwitch.innerHTML = "";
			topNavSwitch.insertAdjacentHTML("afterbegin", logo.innerHTML);
			console.log(topNavSwitch);
			
		} else {
			menuBtn.classList.remove("open");
			navMenu.removeAttribute("class");
			topNavSwitch.innerHTML = "";
			topNavSwitch.insertAdjacentHTML("afterbegin", save);
		}
	});

	try {
		scrollDown.addEventListener("click", (e) => {
			main.scrollIntoView({
				block: "start",
				behavior: "smooth"
			});
			window.addEventListener("scroll", () => {
				window.scrollY < main.offsetTop - 80 ? 
				main.removeAttribute("style") : 
				main.style.cssText = "padding-top: 100px";
			});
		});
	} catch{}
});