
import React, { useState } from "react";

interface RegisterFormProps {
	onRegisterSubmit: (name: string, email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSubmit }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<form
			className="flex flex-col gap-6"
			onSubmit={e => {
				e.preventDefault();
				onRegisterSubmit(name, email, password);
			}}
		>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
				<input
					type="text"
					placeholder="Your name"
					className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
				<input
					type="email"
					placeholder="Enter your email"
					className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
				<input
					type="password"
					placeholder="Create a password"
					className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
			</div>
			<button
				type="submit"
				className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition font-semibold text-lg"
			>
				Register
			</button>
		</form>
	);
};

export default RegisterForm;
