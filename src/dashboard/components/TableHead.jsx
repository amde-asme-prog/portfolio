function TableHead({ columnsData }) {
	return (
		<thead className="bg-background_link_hover capitalize">
			<tr>
				{columnsData.map((title, index) => {
					return (
						<th key={index} className="py-2 px-4 text-left">
							{title}
						</th>
					);
				})}
				<th className="w-10 sticky right-0 py-2 px-2 text-center bg-background_link_active shadow-lg">
					Actions
				</th>
			</tr>
		</thead>
	);
}
export default TableHead;
