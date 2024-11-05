import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/features/user/userSlice";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function SideNavbar() {
	const initialTheme = localStorage.getItem("theme");

	const [theme, setTheme] = useState(initialTheme);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const sidebarRef = useRef(null);
	const { currentUser } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			document.documentElement.classList.remove("light");
			document.body.style.background = "#17153B";
		} else {
			document.documentElement.classList.add("light");
			document.documentElement.classList.remove("dark");
			document.body.style.background = "#f5f5f5";
		}
	}, [theme]);

	useEffect(() => {
		// Function to close sidebar when clicking outside
		const handleClickOutside = (event) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target)
			) {
				setSidebarOpen(false);
			}
		};

		// Attach the event listener on component mount
		document.addEventListener("mousedown", handleClickOutside);

		// Clean up the event listener on component unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	};

	const logout = () => {
		dispatch(logoutUser());
	};

	return (
		<div className="">
			<button
				type="button"
				className="text-gray-900 dark:text-gray-100 hover:text-gray-800 dark:hover:text-white ps-4 pt-2 flex items-center gap-1"
				aria-label="Toggle navigation"
				onClick={toggleSidebar}
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-8 h-8"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
				<span>Menu</span>
			</button>

			<div
				ref={sidebarRef}
				className={`hs-overlay ${
					sidebarOpen
						? "hs-overlay-open:translate-x-0"
						: "-translate-x-full"
				} transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 border-e border-gray-200 pt-7 pb-10 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-custom-bg-100 dark:[&::-webkit-scrollbar-thumb]:bg-custom-bg-200 bg-neutral-100 text-gray-800 dark:bg-custom-bg dark:border-neutral-700`}
			>
				<div className="px-6">
					<Link
						className="flex-none text-xl font-semibold dark:text-white text-purple-900"
						to="/"
						aria-label="Brand"
					>
						FoundIt
					</Link>
				</div>
				<nav
					className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
					data-hs-accordion-always-open
				>
					<ul className="space-y-1.5">
						<li>
							<Link
								className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:bg-custom-bg-200 dark:text-white"
								to="/"
							>
								<svg
									className="w-6 h-6 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
									/>
								</svg>
								Home
							</Link>
						</li>
						<li>
							<Link
								className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
								to="/items"
							>
								<svg
									className="text-gray-800 dark:text-white"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10"></path>
									<polyline points="3 10 12 4 21 10"></polyline>
									<path d="M12 22V12"></path>
								</svg>
								Found Items
							</Link>
						</li>
						<li>
							<Link
								className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
								to="/missing-items"
							>
								<svg
									className="text-gray-800 dark:text-white"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="11" cy="11" r="8"></circle>
									<line
										x1="21"
										y1="21"
										x2="16.65"
										y2="16.65"
									></line>
								</svg>{" "}
								Lost Items
							</Link>
						</li>
						<li className="hs-accordion" id="users-accordion">
							<button
								type="button"
								className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100  dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hs-accordion-active:text-white"
							>
								<svg
									className="w-6 h-6 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								Report Item
								<svg
									className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m18 15-6-6-6 6" />
								</svg>
								<svg
									className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m6 9 6 6 6-6" />
								</svg>
							</button>

							<div
								id="users-accordion"
								className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
							>
								<ul
									className="hs-accordion-group ps-3 pt-2"
									data-hs-accordion-always-open
								>
									<li
										className="hs-accordion"
										id="users-accordion-sub-1"
									>
										<Link
											to="/upload-found-item"
											className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
										>
											Report Found Item
										</Link>
									</li>
									<li
										className="hs-accordion"
										id="users-accordion-sub-2"
									>
										<Link
											to="upload-lost-item"
											className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
										>
											Report Lost Item
										</Link>
									</li>
								</ul>
							</div>
						</li>

						<li>
							<Link
								className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
								to="/feedback"
							>
								<svg
									className="w-6 h-6 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
									/>
								</svg>
								Feedback
							</Link>
						</li>

						<li>
							<Link
								className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
								to="/faq"
							>
								<svg
									className="w-6 h-6 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								FAQ
							</Link>
						</li>

						<li>
							{currentUser ? (
								<div>
									<a
										className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
										href={`/profile/${currentUser?._id}`}
									>
										<svg
											className="w-6 h-6 text-gray-800 dark:text-white"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
											/>
										</svg>
										Profile
									</a>
									<button
										className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
										onClick={logout}
									>
										<svg
											className="w-6 h-6 text-gray-800 dark:text-white"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
											/>
										</svg>
										Logout
									</button>
								</div>
							) : (
								<div>
									<Link
										to="/signup"
										className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
									>
										<svg
											className="w-6 h-6 text-gray-800 dark:text-white"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
											/>
										</svg>
										Sign Up{" "}
									</Link>
									<Link
										to="/signin"
										className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
									>
										<svg
											className="w-6 h-6 text-gray-800 dark:text-white"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
											/>
										</svg>
										Sign In
									</Link>
								</div>
							)}
						</li>
						<li>
							<Link
								className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
								to="/about"
							>
								<svg
									className="w-6 h-6 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										fillRule="evenodd"
										d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
										clipRule="evenodd"
									/>
								</svg>
								About Us
							</Link>
						</li>
						<li>
							<button
								onClick={toggleTheme}
								className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300 mt-3"
							>
								{theme === "dark" ? (
									<div className="flex items-center gap-x-3.5">
										<SunIcon
											className="text-gray-100"
											size={24}
										/>
										Light Mode
									</div>
								) : (
									<div className="flex items-center gap-x-3.5">
										<MoonIcon
											className="text-gray-800"
											size={24}
										/>
										Dark Mode
									</div>
								)}
							</button>
						</li>
					</ul>
				</nav>
			</div>
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
					onClick={toggleSidebar}
				/>
			)}
		</div>
	);
}

export default SideNavbar;
