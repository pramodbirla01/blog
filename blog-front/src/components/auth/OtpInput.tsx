
import React, { forwardRef } from "react";

interface OtpInputProps {
	value: string;
	onChange: (val: string) => void;
	onBackspace: () => void;
	autoFocus?: boolean;
}

const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(
	({ value, onChange, onBackspace, autoFocus }, ref) => {
		return (
			<input
				type="text"
				inputMode="numeric"
				maxLength={1}
				autoFocus={autoFocus}
				className="w-12 h-12 text-center border rounded text-2xl focus:ring-2 focus:ring-blue-500"
				value={value}
				onChange={e => {
					const val = e.target.value.replace(/[^0-9]/g, "");
					onChange(val);
				}}
				onKeyDown={e => {
					if (e.key === "Backspace" && !value) onBackspace();
				}}
				ref={ref}
			/>
		);
	}
);

export default OtpInput;
