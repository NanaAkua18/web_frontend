import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/features/user/userSlice";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function SideNavbar() {
	const initialTheme = localStorage.getItem("theme") || "light";

	const [theme, setTheme] = useState(initialTheme);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { currentUser } = useSelector((state) => state.user);
	const sidebarRef = useRef(null);

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
				onClick={toggleSidebar}
				className="text-gray-900 dark:text-gray-100 hover:text-gray-800 dark:hover:text-white ps-4 pt-2 flex items-center gap-1"
				aria-label="Toggle navigation"
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
								className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-white"
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
										d="M12 7.757v8.486M7.757 12H16.243M12 21.243v-8.486M16.243 12H7.757"
									/>
								</svg>
								<span>Account</span>
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
									<polyline points="15 18 9 12 15 6"></polyline>
								</svg>
							</button>
							<ul
								id="users-accordion-01"
								className="hs-accordion-collapse  w-full pt-1"
							>
								{currentUser ? (
									<>
										<li>
											<Link
												to="/profile"
												className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
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
													<path
														stroke="currentColor"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M5 12h14M12 5l7 7-7 7"
													/>
												</svg>
												Profile
											</Link>
										</li>
										<li>
											<button
												onClick={logout}
												className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
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
													<path
														stroke="currentColor"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M12 5v14M19 12l-7 7-7-7"
													/>
												</svg>
												Logout
											</button>
										</li>
									</>
								) : (
									<li>
										<Link
											to="/login"
											className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-custom-bg-100 dark:text-neutral-400 dark:hover:text-neutral-300"
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
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M5 12h14M12 5l7 7-7 7"
												/>
											</svg>
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>
					<div
						className="text-center pt-3 mx-auto  flex items-center"
						onClick={toggleTheme}
					>
						<span className="text-neutral-400"></span>
						{theme === "light" ? (
							<MoonIcon className="size-3 text-neutral-400 dark:text-neutral-400 ms-auto cursor-pointer" />
						) : (
							<SunIcon className="size-3 text-neutral-400 dark:text-neutral-400 ms-auto cursor-pointer" />
						)}
					</div>
				</nav>
			</div>

			{/* Overlay for the sidebar */}
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
