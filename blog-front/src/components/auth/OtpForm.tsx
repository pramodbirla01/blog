
import React, { useRef } from "react";
import OtpInput from "./OtpInput";

interface OtpFormProps {
	onOtpSubmit: (otp: string) => void;
	loading?: boolean;
}

const OtpForm: React.FC<OtpFormProps> = ({ onOtpSubmit, loading }) => {
	const [otp, setOtp] = React.useState(["", "", "", ""]);
	const inputs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

	const handleChange = (idx: number, val: string) => {
		const newOtp = [...otp];
		newOtp[idx] = val;
		setOtp(newOtp);
		if (val && idx < 3) {
			inputs[idx + 1].current?.focus();
		}
	};

	const handleBackspace = (idx: number) => {
		if (idx > 0) {
			inputs[idx - 1].current?.focus();
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onOtpSubmit(otp.join(""));
	};

	return (
		<form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
			<label className="text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
			<div className="flex gap-2 mb-2">
				{otp.map((digit, idx) => (
					<OtpInput
						key={idx}
						value={digit}
						onChange={(val: string) => handleChange(idx, val)}
						onBackspace={() => handleBackspace(idx)}
						autoFocus={idx === 0}
						ref={inputs[idx]}
					/>
				))}
			</div>
			<button
				type="submit"
				className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition w-full"
				disabled={loading}
			>
				{loading ? "Verifying..." : "Verify OTP"}
			</button>
		</form>
	);
};

export default OtpForm;
