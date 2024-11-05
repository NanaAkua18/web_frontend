/* eslint-disable react/prop-types */
import { useState } from "react";
import { MenuIcon, SunIcon, MoonIcon, X } from "lucide-react";
import user_profile from "../../assets/user.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header(props) {
	const { currentUser } = useSelector((state) => state.user);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(false);
	const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	return (
		<nav
			className={`${
				props.theme === "dark" ? "bg-slate-800" : "bg-slate-100"
			} px-4`}
		>
			<div className="container mx-auto p-3 flex justify-between items-center">
				<Link
					to="/"
					className={`${
						props.theme === "dark" ? "text-white" : "text-gray-800"
					}`}
				>
					Lost and Found
				</Link>
				<div className="md:flex items-center space-x-4 hidden">
					<Link
						to="/home"
						className={`${
							props.theme === "dark"
								? "text-white"
								: "text-gray-800"
						} hover:text-gray-600`}
					>
						Home
					</Link>
					<Link
						to="/about"
						className={`${
							props.theme === "dark"
								? "text-white"
								: "text-gray-800"
						} hover:text-gray-600`}
					>
						About
					</Link>
					<div className="relative">
						<button
							onClick={() =>
								setServicesMenuOpen(!servicesMenuOpen)
							}
							className={`${
								props.theme === "dark"
									? "text-white"
									: "text-gray-800"
							} inline-flex items-center`}
						>
							Report
							<svg
								className="w-4 h-4 ml-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</button>
						{servicesMenuOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-gray-100 text-black rounded-md shadow-lg py-1 z-50">
								<Link
									to="/upload-found-item"
									onClick={() =>
										setServicesMenuOpen(!servicesMenuOpen)
									}
									className="block px-4 py-2 hover:bg-gray-200"
								>
									Found Item
								</Link>
								<Link
									to="/upload-lost-item"
									onClick={() =>
										setServicesMenuOpen(!servicesMenuOpen)
									}
									className="block px-4 py-2 hover:bg-gray-200"
								>
									Lost Item
								</Link>
							</div>
						)}
					</div>
					<Link
						to="/items"
						className={`${
							props.theme === "dark"
								? "text-white"
								: "text-gray-800"
						} hover:text-gray-600`}
					>
						Item Gallery
					</Link>
					<Link
						to="missing-items"
						className={`${
							props.theme === "dark"
								? "text-white"
								: "text-gray-800"
						} hover:text-gray-600`}
					>
						Missing Items
					</Link>
					<Link
						to="faq"
						className={`${
							props.theme === "dark"
								? "text-white"
								: "text-gray-800"
						} hover:text-gray-600`}
					>
						FAQ
					</Link>
					<Link
						to="/feedback"
						className={`${
							props.theme === "dark"
								? "text-white"
								: "text-gray-800"
						} hover:text-gray-600`}
					>
						Feedback
					</Link>
					{!currentUser && (
						<Link
							to="/signup"
							className={`${
								props.theme === "dark"
									? "bg-white text-black"
									: "bg-gray-800 text-white"
							} py-2 px-4 rounded`}
						>
							Sign Up
						</Link>
					)}
				</div>

				<div className="flex gap-4">
					<button
						className={`${
							props.theme === "dark"
								? "text-white"
								: "text-gray-800"
						} ml-2`}
						onClick={() => {
							console.log(props.theme);
							props.toggleTheme(props.theme);
						}}
					>
						{props.theme === "dark" ? (
							<SunIcon size={24} />
						) : (
							<MoonIcon size={24} />
						)}
					</button>
					{currentUser && (
						<a href={`/profile/${currentUser._id}`}>
							{" "}
							<img
								src={user_profile}
								alt="User Profile"
								className="w-8 h-8 rounded-full"
							/>
						</a>
					)}
					<button
						className={`text-2xl md:hidden ${
							props.theme === "dark"
								? "text-white"
								: "text-gray-800"
						}`}
						onClick={toggleMenu}
					>
						<MenuIcon size={24} />
					</button>
				</div>
			</div>
			{isMenuOpen && (
				<div className={`fixed inset-0 z-50`}>
					<div className={`container mx-auto px-4 py-8`}>
						<div
							className={`rounded-lg shadow-lg p-4 flex justify-between ${
								props.theme === "dark"
									? "bg-slate-800"
									: "bg-gray-100"
							}`}
						>
							<div className="grid grid-cols-1 gap-4">
								<Link
									to="/home"
									className={`${
										props.theme === "dark"
											? "text-white"
											: "text-gray-800"
									} hover:text-gray-600`}
								>
									Home
								</Link>
								<Link
									to="/about"
									className={`${
										props.theme === "dark"
											? "text-white"
											: "text-gray-800"
									} hover:text-gray-600`}
								>
									About
								</Link>
								<div
									className={`relative ${
										props.theme === "dark"
											? "text-white"
											: "text-gray-800"
									} hover:text-gray-600`}
								>
									<button
										onClick={() =>
											setServicesMenuOpen(
												!servicesMenuOpen
											)
										}
										className="inline-flex items-center"
									>
										Report
										<svg
											className="w-4 h-4 ml-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 9l-7 7-7-7"
											></path>
										</svg>
									</button>
									{servicesMenuOpen && (
										<div
											className={`${
												props.theme === "dark"
													? "text-white bg-slate-800"
													: "text-gray-800 bg-gray-100"
											} absolute -right-28 mt-2 w-48 rounded-md shadow-lg py-1 z-50`}
										>
											<Link
												to="/upload-found-item"
												className="block px-4 py-2"
											>
												Found Item
											</Link>
											<Link
												to="/upload-lost-item"
												className="block px-4 py-2"
											>
												Lost Item
											</Link>
										</div>
									)}
								</div>
								<Link
									to="/items"
									className={`${
										props.theme === "dark"
											? "text-white"
											: "text-gray-800"
									} hover:text-gray-600`}
								>
									Item Gallery
								</Link>
								<Link
									to="/missing-items"
									className={`${
										props.theme === "dark"
											? "text-white"
											: "text-gray-800"
									} hover:text-gray-600`}
								>
									Missing Items
								</Link>
								<Link
									to="/faq"
									className={`${
										props.theme === "dark"
											? "text-white"
											: "text-gray-800"
									} hover:text-gray-600`}
								>
									FAQ
								</Link>
								<Link
									to="/feedback"
									className={`${
										props.theme === "dark"
											? "text-white"
											: "text-gray-800"
									} hover:text-gray-600`}
								>
									Feedback
								</Link>

								{currentUser ? (
									<a href={`/profile/${currentUser._id}`}>
										{" "}
										<img
											src={user_profile}
											alt="User Profile"
											className="w-8 h-8 rounded-full"
										/>
									</a>
								) : (
									<button
										className={`${
											props.theme === "dark"
												? "bg-white text-black"
												: "bg-gray-800 text-white"
										} py-2 px-4 rounded`}
									>
										Sign Up
									</button>
								)}
								<div>
									<button
										className={`text-2xl ${
											props.theme === "dark"
												? "text-white"
												: "text-gray-800"
										}`}
										onClick={toggleMenu}
									>
										<X size={24} />
									</button>
								</div>
							</div>
							<button
								className={`text-2xl ${
									props.theme === "dark"
										? "text-white"
										: "text-gray-800"
								}`}
								onClick={toggleMenu}
							>
								<X size={24} />
							</button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
