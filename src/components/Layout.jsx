// Layout.js
import SideNavbar from "./SideNavbar";

function Layout({ children }) {
	return (
		<div className="flex">
			<SideNavbar />
			<div className="ml-64 p-4 w-full">{children}</div>
		</div>
	);
}

export default Layout;
