/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useMemo } from "react";
import "./Home.css";
import image from "../assets/home1.png";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
	const [text, setText] = React.useState("Discover the Lost");
	const taglineArr = useMemo(
		() => ["Discover the Lost", "Connect the Found"],
		[]
	);

	const { currentUser } = useSelector((state) => state.user);
	const theme = localStorage.getItem("theme");

	const iRef = useRef(0);

	useEffect(() => {
		document.body.style.background =
			theme === "dark" ? "#17153B" : "#f5f5f5";
		const intervalId = setInterval(() => {
			setText(taglineArr[iRef.current]);
			iRef.current = (iRef.current + 1) % taglineArr.length;
		}, 1900);

		return () => {
			document.body.style.background = null;
			clearInterval(intervalId);
		};
	}, [taglineArr, theme]);

	return (
		<>
			<div className="min-h-screen">
				<div className="container-fluid">
					<div
						className="flex justify-between pt-5 mt-5"
						style={{
							color: `${theme === "dark" ? "#f5f5f5" : "#333"}`,
						}}
					>
						<div className="md:basis-5/12 text-center">
							<h1 className="mb-3 text-6xl">
								<span style={{ color: "#9C27B0" }}>Hi, </span>{" "}
								<span className="">Welcome!</span>
							</h1>
							<p
								className="mx-auto px-4 respo changing-text"
								style={{
									fontSize: "1.7rem",
									fontWeight: "bold",
								}}
							>
								{text}{" "}
							</p>
							<p
								className="mx-auto px-4 mt-3 mb-3"
								style={{ fontSize: "1rem" }}
							>
								We help you find lost items and reunite them
								with their owners. Whether you&apos;ve lost
								something valuable or found an item that belongs
								to someone else, we&apos;ve got you covered. For
								more info you can checkout{" "}
							</p>
							<div className="flex justify-center">
								{/* Use the same className for both buttons */}
								<NavLink
									to="/items"
									style={{ textDecoration: "none" }}
								>
									<Button
										className="sign-out-button" // Use the same class name as the "Sign Out" button
										variant="contained"
										color="secondary"
										style={{
											textTransform: "none",
											borderRadius: "20px",
											fontFamily: "'Poppins', sans-serif",
											fontSize: "1.1rem",
										}}
									>
										Found Items
									</Button>
								</NavLink>
								<NavLink
									to="/missing-items"
									style={{ textDecoration: "none" }}
								>
									<Button
										className="sign-out-button" // Use the same class name as the "Sign Out" button
										variant="contained"
										color="secondary"
										style={{
											marginLeft: "20px",
											textTransform: "none",
											borderRadius: "20px",
											fontFamily: "'Poppins', sans-serif",
											fontSize: "1.1rem",
										}}
									>
										Lost Items
									</Button>
								</NavLink>
							</div>
						</div>
						<div className="hidden md:flex md:basis-6/12">
							<img
								className="img-fluid"
								style={{ width: "75%" }}
								src={image}
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
