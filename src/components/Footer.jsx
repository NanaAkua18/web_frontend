import "./Footer.css";
import fb from "../assets/insta-logo.png";
import twitter from "../assets/twitter-logo.png";
import insta from "../assets/facebook-logo.png";
import linkedin from "../assets/linkedin-logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
	return (
		<div className="footer">
			<div className="sb__footer__section__padding">
				<div className="sb__footer-links">
					<div className="flex gap-y-5 gap-x-5  sm:gap-5 flex-wrap text-white">
						<Link to="/about">
							<p>About Us</p>
						</Link>
						<Link to="/home">
							<p>Home</p>
						</Link>
						<Link to="/feedback">
							<p>Feedback</p>
						</Link>
						<Link to="/upload-lost-item">
							<p>Report Lost Item</p>
						</Link>
						<Link to="/upload-found-item">
							<p>Report Found Item</p>
						</Link>
						<Link to="/items">
							<p>See Items Gallery</p>
						</Link>
						<Link to="/missing-items">
							<p>Help Us Find</p>
						</Link>
					</div>
					{/* <div className="sb__footer-links_div">
						<h4>Services</h4>
						<a href="/upload-lost-item">
							<p>Report Lost Item</p>
						</a>
						<a href="/upload-found-item">
							<p>Report Found Item</p>
						</a>
						<a href="/items">
							<p>See Items Gallery</p>
						</a>
						<a href="/missing-items">
							<p>Help Us Find</p>
						</a>
					</div> */}
				</div>
				<hr></hr>

				<div className="sb__footer-below">
					<div className="sb__footer-copyright">
						<p>
							@{new Date().getFullYear()} FoundIt. All right
							reserved.
						</p>
					</div>
					{/* <div className="sb__footer-below-links">
						<a href="/terms">
							<div>
								<p>Terms & Conditions</p>
							</div>
						</a>
						<a href="/terms">
							<div>
								<p>Privacy</p>
							</div>
						</a>
						<a href="/terms">
							<div>
								<p>Security</p>
							</div>
						</a>
						<a href="/terms">
							<div>
								<p>Cookie Declaration</p>
							</div>
						</a>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Footer;
