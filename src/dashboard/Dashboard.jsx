import {
	FaAlignLeft,
	FaChartPie,
	FaRegSun,
	FaSignOutAlt,
} from "react-icons/fa";
import Table from "../components/Table";

const Dashboard = () => {
	return (
		<main className="relative light w-full h-screen bg-background_container text-text_primary overflow-clip">
			<nav className="fixed p-2 top-0 z-20 w-full flex flex-row justify-between bg-background_header border-b border-border_primary">
				<div className="inline-flex flex-row self-start space-x-3">
					<button
						type="button"
						className="p-2 text-sm text-text_primary rounded-lg sm:hidden hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-border_primary">
						<span className="sr-only">Open sidebar</span>
						<FaAlignLeft className="w-6 h-6" aria-hidden="true" />
					</button>
					<h1 className="text-2xl font-bold">Amdebirhan</h1>
				</div>

				<img
					src="/assets/logo.jpg"
					className="size-16 p-2 rounded-full bg-contain "
				/>

				<div className="fixed sm:hidden top-16 right-0 flex flex-col space-y-2 text-xl bg-inherit bg-opacity-10 px-4 pb-2 ">
					<ul className="p-2 pb-0">
						<li>username</li>
						<li>email</li>
					</ul>
					<ul className="flex flex-col gap-y-2 w-full">
						<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
							<FaChartPie />
							<small>Dashboard</small>
						</li>
						<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
							<FaRegSun />
							<small>Settings</small>
						</li>
						<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
							<FaSignOutAlt />
							<small>sign out</small>
						</li>
					</ul>
				</div>
			</nav>
			<aside className="max-sm:hidden fixed left-0 p-2 pt-24 z-10  text-xl bg-background_header h-full border-r border-border_primary ">
				<ul className="flex flex-col gap-y-2 w-full">
					<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
						<FaChartPie />
						<small>Dashboard</small>
					</li>
					<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
						<FaSignOutAlt />
						<small>Education</small>
					</li>
					<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
						<FaSignOutAlt />
						<small>Experience</small>
					</li>
					<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
						<FaSignOutAlt />
						<small>Feedback</small>
					</li>
					<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
						<FaSignOutAlt />
						<small>Skills</small>
					</li>
					<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
						<FaSignOutAlt />
						<small>Projects</small>
					</li>
					<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
						<FaSignOutAlt />
						<small>Services</small>
					</li>
					<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
						<FaSignOutAlt />
						<small>Messages</small>
					</li>
					<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
						<FaRegSun />
						<small>Settings</small>
					</li>
					<li className="flex gap-x-2 items-center hover:bg-background_link_hover w-full px-2">
						<FaSignOutAlt />
						<small>sign out</small>
					</li>
				</ul>
			</aside>

			<div className="absolute left-4 sm:left-40 right-4 top-24 h-96 border-2 rounded-lg border-border_primary border-dashed border-spacing-20 space-x-2 space-y-2">
				<article className="m-4">
					<div className="overflow-x-auto bg-gray-100 rounded-lg shadow">
						<Table />
					</div>
				</article>
			</div>
		</main>
	);
};

export default Dashboard;
