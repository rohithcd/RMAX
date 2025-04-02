// Importing built-in dependencies
import React from "react";

const HomePage: React.FC = () => {
	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			<p>This is the index page of your Next.js application.</p>
			<a href='/admin/products'>Go to Admin Page</a>
		</div>
	);
};

export default HomePage;
