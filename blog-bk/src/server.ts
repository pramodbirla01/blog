
import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});
