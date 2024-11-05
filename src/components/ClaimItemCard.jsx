/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

function ClaimItemCard({ claim }) {
	return (
		<div>
			<div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-72">
				<img
					src={claim.item.itemImages[0]}
					alt="item"
					className="w-full h-72 object-cover"
				/>
				<div className="p-4 dark:bg-custom-bg-200">
					<h2 className="text-lg font-bold">{claim.item.name}</h2>
					<p className="text-sm">
						Claim Status:{" "}
						{claim.isApproved ? (
							<span className="text-green-800 font-semibold">
								{" "}
								Accepted
							</span>
						) : (
							<span className="text-red-800 font-semibold">
								Pending{" "}
							</span>
						)}
					</p>
					<p className="text-sm">
						Poster Contact: {claim.posterContact}
					</p>
					<Button
						className="w-full"
						variant="contained"
						color="secondary"
						size="small"
						href={`tel:${claim.posterContact}`}
						style={{
							marginTop: "10px",
							borderRadius: "20px",
						}}
					>
						Call Poster
					</Button>
				</div>
			</div>
			{/* <div className="card-container" key={claim.item._id}>
				<div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-72 sm:w-64 mx-auto">
					<img
						src={claim?.item?.itemImages[0]}
						alt="item"
						className="w-full h-full object-cover"
					/>
					<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 flex flex-col justify-between sm:p-3">
						<div className="date-container text-center text-white text-sm p-2 bg-opacity-75 rounded-lg">
							{new Date(claim.item.date_found).toLocaleDateString(
								"en-US",
								{
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						</div>
						<p className="flex">
							status:{" "}
							{claim.isApproved ? (
								<span className="text-green-600">
									Accepted{" "}
								</span>
							) : (
								<span className="text-red-500">Pending </span>
							)}
						</p>
						<Button className="" size="small" variant="contained">
							<p className="sm:hidden">Claim</p>
							<p className="hidden sm:block">Claim Item</p>
						</Button>
						<Button className="" size="small" variant="contained">
							<p className="sm:hidden">Claim</p>
							<p className="hidden sm:block">Claim Item</p>
						</Button>
					</div>
				</div>
			</div> */}
		</div>
	);
}

export default ClaimItemCard;
