export default function TableHead({ columnsData }) {
  return (
    <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
      <tr>
        {columnsData.map((title, index) => (
          <th
            key={index}
            className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {title}
          </th>
        ))}
        <th className="bg-gray-200 dark:bg-gray-700 w-24 sticky right-0 py-4 px-6 text-center text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          Actions
        </th>
      </tr>
    </thead>
  );
}
