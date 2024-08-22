const Layout = ({ children }) => {
	return (
		<div className="layout">
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
