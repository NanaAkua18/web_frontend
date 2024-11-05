/* eslint-disable react/prop-types */
import { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { useSelector } from "react-redux";

function ClaimItem({ open, setOpen, itemId }) {
	const [error, setError] = useState("");
	const [claimData, setClaimData] = useState({
		email: "",
		contact: "",
		reference: "",
		key: "",
	});

	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);

	const handleClose = () => {
		setOpen(false);
		setClaimData({
			email: "",
			contact: "",
			reference: "",
			key: "",
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setClaimData({
			...claimData,
			[name]: value,
		});
	};

	const handleSubmit = async () => {
		setError("");
		if (
			!claimData.email ||
			!claimData.reference ||
			!claimData.key ||
			!claimData.contact
		) {
			setError("All fields are required!");
			return;
		}
		try {
			const response = await fetch(
				`${BASE_URL}/api/claim/add/${itemId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + currentUser.accessToken,
					},
					body: JSON.stringify(claimData),
				}
			);
			const result = await response.json();
			console.log(result);
			if (response.ok) {
				console.log("Item claimed successfully");
				alert("Item claim success");
				//setOpen(false)
			} else {
				console.error("Failed to claim item");
			}
			handleClose();
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Enter Your Details</DialogTitle>
				{error && (
					<div className="bg-red-700 text-white rounded-md py-2 px-1 text-center mx-3">
						{error}
					</div>
				)}
				<DialogContent>
					<TextField
						label="Your Email"
						value={claimData.email}
						name="email"
						onChange={handleChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Your Student ID"
						name="reference"
						value={claimData.reference}
						onChange={handleChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Contact Number"
						name="contact"
						value={claimData.contact}
						onChange={handleChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Enter unique item detail"
						value={claimData.key}
						name="key"
						onChange={handleChange}
						multiline
						rows={3}
						required
						fullWidth
						margin="normal"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={handleSubmit}
						variant="contained"
						color="primary"
					>
						Claim
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ClaimItem;
