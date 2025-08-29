
import React, { useState } from "react";

import Loader from "./Loader";

interface LoginFormProps {
	onEmailPasswordSubmit?: (email: string, password: string) => void;
	onShowOtp?: () => void;
	otpMode?: boolean;
	onEmailOtpSubmit?: (email: string) => void;
	onBackToPassword?: () => void;
	loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
	onEmailPasswordSubmit,
	onShowOtp,
	otpMode = false,
	onEmailOtpSubmit,
	onBackToPassword,
	loading = false,
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
						disabled={loading}
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition font-semibold text-lg flex items-center justify-center"
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader size={20} className="mr-2" /> Sending email...
						</>
					) : (
						'Send OTP'
					)}
				</button>
				<button
					type="button"
					className="text-blue-600 underline mt-2"
					onClick={onBackToPassword}
					disabled={loading}
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
					disabled={loading}
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
					disabled={loading}
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition font-semibold text-lg flex items-center justify-center"
				disabled={loading}
			>
				{loading ? (
					<>
						<Loader size={20} className="mr-2" /> Loading...
					</>
				) : (
					'Login'
				)}
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
				disabled={loading}
			>
				Login with OTP
			</button>
		</form>
	);
};

export default LoginForm;
