
import React, { useState } from "react";

interface LoginFormProps {
	onEmailPasswordSubmit?: (email: string, password: string) => void;
	onShowOtp?: () => void;
	otpMode?: boolean;
	onEmailOtpSubmit?: (email: string) => void;
	onBackToPassword?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
	onEmailPasswordSubmit,
	onShowOtp,
	otpMode = false,
	onEmailOtpSubmit,
	onBackToPassword
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	if (otpMode) {
		return (
			<form
				className="flex flex-col gap-6"
				onSubmit={e => {
					e.preventDefault();
					if (onEmailOtpSubmit) onEmailOtpSubmit(email);
				}}
			>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
					<input
						type="email"
						placeholder="Enter your email"
						className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition font-semibold text-lg"
				>
					Send OTP
				</button>
				<button
					type="button"
					className="text-blue-600 underline mt-2"
					onClick={onBackToPassword}
				>
					Back to password login
				</button>
			</form>
		);
	}

	return (
		<form
			className="flex flex-col gap-6"
			onSubmit={e => {
				e.preventDefault();
				if (onEmailPasswordSubmit) onEmailPasswordSubmit(email, password);
			}}
		>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
				<input
					type="email"
					placeholder="Enter your email"
					className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
				<input
					type="password"
					placeholder="Enter your password"
					className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition font-semibold text-lg"
			>
				Login
			</button>
			<div className="flex items-center my-2">
				<div className="flex-grow border-t border-gray-300"></div>
				<span className="mx-2 text-gray-400 text-sm">or</span>
				<div className="flex-grow border-t border-gray-300"></div>
			</div>
			<button
				type="button"
				className="bg-gray-100 text-blue-600 rounded px-4 py-2 hover:bg-blue-100 transition font-semibold text-lg"
				onClick={onShowOtp}
			>
				Login with OTP
			</button>
		</form>
	);
};

export default LoginForm;
