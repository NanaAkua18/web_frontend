/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const FoundItemCard = ({ foundItem }) => {
	return (
		<div className="relative bg-white dark:bg-custom-bg-300 rounded-lg shadow-lg overflow-hidden w-72">
			<img
				src={foundItem.itemImages[0]}
				alt="item"
				className="w-full h-72 object-cover"
			/>
			<div className="p-4 dark:bg-custom-bg-200">
				<h2 className="text-lg font-bold">{foundItem.name}</h2>
				<p className="text-s">
					Location Found: {foundItem.location_found}
				</p>
				<Button
					className="w-full"
					variant="contained"
					color="secondary"
					size="small"
					component={Link}
					to={`/claims/${foundItem._id}`}
					style={{
						marginTop: "10px",
						borderRadius: "20px",
					}}
				>
					View Claims
				</Button>
			</div>
		</div>
	);
};

export default FoundItemCard;
