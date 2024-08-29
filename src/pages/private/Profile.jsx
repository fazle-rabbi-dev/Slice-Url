// TODO:  refactor this page by using React-Hook-Form & by creating Array of form fields 

import { useState, useEffect } from "react";

import { useUserStore } from "@/stores";
import { showToast, playSound } from "@/lib/utils";
import { useChangePassword, useUpdateAccount } from "@/lib/react-query";

export const Profile = () => {
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	
	const { user, updateAuthStatus } = useUserStore(state => ({
		user: state.user,
		updateAuthStatus: state.updateAuthStatus,
	}));

	const { mutateAsync: changePassword, isPending: isChangingPassword } = useChangePassword();
	const { mutateAsync: updateAccount, isPending: isUpdatingAccount } = useUpdateAccount();

	const handleProfileUpdate = async e => {
		e.preventDefault();

		// If didn't change field value then display error
		if (user.fullName === fullName && user.username === username) {
			playSound.error();
			showToast("Please write new fullName or username.", "error");
			return;
		}

		const updateData = {};
		if (user.fullName !== fullName) {
			updateData.fullName = fullName;
		} else if (user.username !== username) {
			updateData.username = username;
		}

		const ApiResponse = await updateAccount(updateData);
		if (!ApiResponse) return showToast("Something went wrong. Try again.", "error");

		const { success, message, data } = ApiResponse;
		if (success) {
			showToast(message);
			playSound.success();
			// setFullName(data.user.fullName);
			updateAuthStatus(data.user);
		} else {
			showToast(message, "error");
			playSound.error();
		}
	};

	const handlePasswordChange = async e => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			playSound.error();
			showToast("Passwords did not matched.", "error");
			return;
		}
		
		const ApiResponse = await changePassword({
		  oldPassword: currentPassword,
		  newPassword
		});
		if (!ApiResponse) return showToast("Something went wrong. Try again.", "error");

		const { success, message, data } = ApiResponse;
		if (success) {
			showToast(message);
			playSound.success();
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
			updateAuthStatus(data.user);
		} else {
			showToast(message, "error");
			playSound.error();
		}
	};

	useEffect(() => {
		if (user) {
			console.log({ user })
			setFullName(user.fullName);
			setUsername(user.username);
		}
	}, [user]);

	return (
		<>
			<section className="">
				{/* Update Account Form */}
				<form
					className="mb-8"
					onSubmit={handleProfileUpdate}
				>
					<h2 className="heading4 mb-4">Update Profile</h2>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="form-label"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							className="form-field"
							value={username}
							onChange={e => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="fullName"
							className="form-label"
						>
							Full Name
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							className="form-field"
							value={fullName}
							onChange={e => setFullName(e.target.value)}
							required
						/>
					</div>
					<button
						disabled={isUpdatingAccount}
						type="submit"
						className="profile-form-submit-btn"
					>
						{isUpdatingAccount ? "Updating.." : "Update Profile"}
					</button>
				</form>

				{/* Change Password Form */}
				<form
					className=""
					onSubmit={handlePasswordChange}
				>
					<h2 className="heading4 mb-4">Change Password</h2>
					<div className="mb-4">
						<label
							htmlFor="currentPassword"
							className="form-label"
						>
							Current Password
						</label>
						<input
							type="password"
							id="currentPassword"
							name="currentPassword"
							className="form-field"
							value={currentPassword}
							onChange={e => setCurrentPassword(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="newPassword"
							className="form-label"
						>
							New Password
						</label>
						<input
							type="password"
							id="newPassword"
							name="newPassword"
							className="form-field"
							value={newPassword}
							onChange={e => setNewPassword(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="confirmPassword"
							className="form-label"
						>
							Confirm New Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							className="form-field"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<button
						disabled={isChangingPassword}
						type="submit"
						className="profile-form-submit-btn"
					>
						{isChangingPassword ? "Changing Password.." : "Change Password"}
					</button>
				</form>
			</section>
		</>
	);
};
