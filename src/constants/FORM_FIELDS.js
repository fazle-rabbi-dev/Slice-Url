export const signInFields = [
	{
		label: "Email",
		name: "email",
		type: "email",
		options: {
			required: "Email is required",
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: "Please enter a valid email address",
			},
		},
	},
	{
		label: "Password",
		name: "password",
		type: "password",
		options: {
			required: "Password is required",
			minLength: {
				value: 6,
				message: "Password must be at least 6 characters long",
			},
		},
	},
];

export const signUpFields = [
	{
		label: "Full name",
		name: "fullName",
		type: "text",
		options: {
			required: "Full Name is required",
		},
	},
	{
		label: "Username",
		name: "username",
		type: "text",
		options: {
			required: "Username is required",
			minLength: {
				value: 3,
				message: "Username must be at least 3 characters long",
			},
			pattern: {
				value: /^[a-z0-9-]+$/,
				message:
					"Username can contain only lowercase letters, numbers, and hyphens",
			},
		},
	},
	{
		label: "Email",
		name: "email",
		type: "email",
		options: {
			required: "Email is required",
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: "Please enter a valid email address",
			},
		},
	},
	{
		label: "Password",
		name: "password",
		type: "password",
		options: {
			required: "Password is required",
			minLength: {
				value: 6,
				message: "Password must be at least 6 characters long",
			},
		},
	},
	{
		label: "Confirm Password",
		name: "confirmPassword",
		type: "password",
		options: {
			required: "Confirm password is required",
			minLength: {
				value: 6,
				message: "Confirm password must be at least 6 characters long",
			},
		}
	}
];
