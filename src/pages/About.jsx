import "./About.css";
import image from "../assets/about-bg.png";
import { useEffect } from "react";
import dark from "../assets/missing_items/dark.jpg";

const About = () => {
	const theme = localStorage.getItem("theme");

	// useEffect(() => {
	// 	if (theme === "dark") {
	// 		document.body.style.backgroundImage = `url(${dark})`;
	// 		document.body.style.backgroundSize = "contain";
	// 	} else {
	// 		document.body.style.backgroundImage =
	// 			"linear-gradient(to right top, rgb(101 173 191), rgb(237 242 243))";
	// 	}
	// 	return () => {
	// 		document.body.style.backgroundImage = null;
	// 	};
	// }, [theme]);
	useEffect(() => {
		document.body.style.background =
			theme === "dark" ? "#17153B" : "#f5f5f5";

		return () => {
			document.body.style.background = null;
		};
	}, [theme]);

	return (
		<div className={`about-us dark:text-white min-h-screen`}>
			<section
				className={`about-us`}
				style={{ fontFamily: "'Poppins', sans-serif" }}
			>
				<div className="about">
					<img src={image} alt="About Us" className="pic" />
					<div className="text">
						<h2 className="heading">About Us</h2>
						<h5 className="pt-3">
							At our{" "}
							<span className="font-semibold text-lg text-purple-700">Lost &amp; Found</span>
						</h5>
						<p className="paratext">
							web app, we are dedicated to reuniting people with
							their lost belongings and restoring what&apos;s been
							found. We understand the frustration and anxiety
							that comes with losing something valuable, whether
							it&apos;s a sentimental item or a daily essential.
						</p>
						<div className="data">
							<a href="/items" className="hire">
								Try Us
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default About;
