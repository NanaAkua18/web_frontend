/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Feedback.css";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)({
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "grey",
		},
		"&:hover fieldset": {
			borderColor: "grey",
		},
		"&.Mui-focused fieldset": {
			borderColor: "purple",
		},
	},
});

const FeedbackForm = (props) => {
	const [details, setDetails] = useState({ email: "", feedback: "" });
	const [errors, setErrors] = useState({ email: false, feedback: false });
	const [star, setStar] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const theme = localStorage.getItem("theme");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setDetails({ ...details, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: false });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(star);
		const newErrors = {
			email: !details.email,
			feedback: !details.feedback,
		};

		setErrors(newErrors);

		const hasErrors = Object.values(newErrors).some((error) => error);

		if (hasErrors) {
			console.error("Mandatory fields are missing");
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch(`${BASE_URL}/api/feedback/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...details, rating: star }),
			});

			if (response.ok) {
				const result = await response.json();
				console.log(result);
				setDetails({ email: "", feedback: "" });
				setStar(0);
				setShowAlert(true);
			} else {
				console.error("Failed to submit feedback");
			}
		} catch (error) {
			console.error(
				"An error occurred while submitting feedback:",
				error
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (theme !== "dark") {
			document.body.style.background =
				theme === "dark" ? "#17153B" : "#eeeeee";
		} else {
			document.body.style.background = "#17153B";
		}
		// document.body.style.backgroundSize = 'cover';
		return () => {
			document.body.style.background = null;
		};
	}, [theme]);

	return (
		<div className="min-h-screen">
			{showAlert && (
				<div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
					<div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
						<svg
							onClick={() => {
								setShowAlert(false);
							}}
							xmlns="http://www.w3.org/2000/svg"
							className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
							viewBox="0 0 320.591 320.591"
						>
							<path
								d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
								data-original="#000000"
							></path>
							<path
								d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
								data-original="#000000"
							></path>
						</svg>

						<div className="my-8 text-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-14 shrink-0 fill-green-500 inline"
								viewBox="0 0 512 512"
							>
								<path
									d="M383.841 171.838c-7.881-8.31-21.02-8.676-29.343-.775L221.987 296.732l-63.204-64.893c-8.005-8.213-21.13-8.393-29.35-.387-8.213 7.998-8.386 21.137-.388 29.35l77.492 79.561a20.687 20.687 0 0 0 14.869 6.275 20.744 20.744 0 0 0 14.288-5.694l147.373-139.762c8.316-7.888 8.668-21.027.774-29.344z"
									data-original="#000000"
								/>
								<path
									d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487 0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z"
									data-original="#000000"
								/>
							</svg>
							<h4 className="text-xl text-gray-800 font-semibold mt-4">
								Feedback Received!
							</h4>
							<p className="text-sm text-gray-500 leading-relaxed mt-4">
								Thank you for taking time to leave us a
								feedback. This will help us to improve and make
								the application even better for use by all
								students
							</p>
						</div>

						<button
							onClick={() => {
								setShowAlert(false), navigate("/");
							}}
							type="button"
							className="px-5 py-2.5 w-full rounded-lg text-white text-sm border-none outline-none bg-fuchsia-950 hover:bg-gray-700"
						>
							You&apos;re welcome
						</button>
					</div>
				</div>
			)}
			<div className=""></div>
			<div
				className="addnotes bg-gray-50 dark:bg-custom-bg-300 dark:text-white"
				style={{ paddingTop: "50px", margin: "auto" }}
			>
				<div className="right ps-5 pe-5 pt-4 mb-5 ">
					<div className="d-flex justify-content-center mb-2">
						<h3
							className="text-3xl"
							style={{
								fontWeight: "bold",
								fontFamily: '"Mons", sans-serif',
							}}
						>
							Feedback Form
						</h3>
					</div>
					<p className="mb-4 text-justify">
						Thank you for taking your time to provide feedback. We
						appreciate hearing from you and will review your
						comments carefully.
					</p>

					<form
						onSubmit={handleSubmit}
						className={`feedback-form ${
							props.theme === "dark" ? "dark-mode" : ""
						}`}
					>
						<div className="mb-4">
							<p
								className="container text-xl font-semibold"
								style={{ marginBottom: "6px" }}
							>
								Email
							</p>
							{props.theme === "dark" ? (
								<CssTextField
									variant="outlined"
									color="secondary"
									type="email"
									onChange={handleChange}
									value={details.email}
									placeholder="Email"
									id="email"
									name="email"
									required
									error={errors.email}
									helperText={
										errors.email ? "Email is required" : ""
									}
									InputProps={{
										style: {
											borderRadius: "10px",
											color: "#f5f5f5",
										},
									}}
								/>
							) : (
								<TextField
									variant="outlined"
									color="secondary"
									type="email"
									onChange={handleChange}
									value={details.email}
									placeholder="Email"
									id="email"
									name="email"
									required
									error={errors.email}
									helperText={
										errors.email ? "Email is required" : ""
									}
									InputProps={{
										style: {
											borderRadius: "10px",
											color: "#333",
										},
									}}
								/>
							)}
						</div>

						<h6
							className="container mt-4"
							style={{ marginBottom: "-1px" }}
						>
							How would you rate us?
						</h6>
						<div className="container-star flex py-3">
							<div className="star-widget text-2xl sm:text-3xl">
								<input
									type="radio"
									name="rate"
									id="rate-5"
									onChange={() => {
										setStar(5);
									}}
								/>
								<label
									htmlFor="rate-5"
									className="fas fa-star"
								></label>

								<input
									type="radio"
									name="rate"
									id="rate-4"
									onChange={() => {
										setStar(4);
									}}
								/>
								<label
									htmlFor="rate-4"
									className="fas fa-star"
								></label>

								<input
									type="radio"
									name="rate"
									id="rate-3"
									onChange={() => {
										setStar(3);
									}}
								/>
								<label
									htmlFor="rate-3"
									className="fas fa-star"
								></label>

								<input
									type="radio"
									name="rate"
									id="rate-2"
									onChange={() => {
										setStar(2);
									}}
								/>
								<label
									htmlFor="rate-2"
									className="fas fa-star"
								></label>

								<input
									type="radio"
									name="rate"
									id="rate-1"
									onChange={() => {
										setStar(1);
									}}
								/>
								<label
									htmlFor="rate-1"
									className="fas fa-star"
								></label>
								<header></header>
							</div>
						</div>

						<div className="my-3">
							<p
								className="container"
								style={{ marginBottom: "6px" }}
							>
								Please share your feedback
							</p>
							{props.theme === "dark" ? (
								<CssTextField
									type="text"
									placeholder="Share your experience or suggestions"
									multiline
									rows={5}
									onChange={handleChange}
									value={details.feedback}
									id="feedback"
									name="feedback"
									color="secondary"
									variant="outlined"
									required
									error={errors.feedback}
									helperText={
										errors.feedback
											? "Feedback is required"
											: ""
									}
									InputProps={{
										style: {
											borderRadius: "20px",
											color: "#f5f5f5",
										},
									}}
								/>
							) : (
								<TextField
									type="text"
									placeholder="Share your experience or suggestions"
									multiline
									rows={5}
									onChange={handleChange}
									value={details.feedback}
									id="feedback"
									name="feedback"
									color="secondary"
									variant="outlined"
									required
									error={errors.feedback}
									helperText={
										errors.feedback
											? "Feedback is required"
											: ""
									}
									InputProps={{
										style: {
											borderRadius: "20px",
											color: "#333",
										},
									}}
								/>
							)}
						</div>

						<Button
							type="submit"
							variant="contained"
							color="success"
							className="my-3 mb-4"
							style={{
								textTransform: "none",
								borderRadius: "15px",
								fontFamily: "'Poppins', sans-serif",
								fontSize: "1rem",
							}}
						>
							{isSubmitting ? "Submitting..." : "Submit"}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FeedbackForm;
