import { toast } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

import { LOCAL_CLIENT_ADDRESS } from "@/constants";
const ENV_MODE = import.meta.env.VITE_ENV_MODE;
const CLIENT_ADDRESS = ENV_MODE === "dev" ? LOCAL_CLIENT_ADDRESS : import.meta.env.VITE_REMOTE_CLIENT_ADDRESS;


export const cn = (...inputs) => {
	return twMerge(clsx(inputs));
};

export const showToast = (
	msg = "Here is your toast",
	type = "success",
	time = 2000,
	primaryColor = "hsl(135.1,88.3%,38.1%)",
) => {
	toast[type](msg, {
		duration: time,
		position: "top-center",
		// icon: "👏",
		iconTheme: {
			primary: type === "success" ? primaryColor : "hsl(25, 95%, 53.1%)",
			secondary: "#f8f8f8",
		},
	});
};

export const showAlert = (title, text, type) => {
	Swal.fire({
		title: title,
		text: text,
		icon: type,
	});
};

// Function to convert the first character of a string to uppercase
export function capitalizeFirstLetter(string) {
	if (string?.length > 0) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	} else {
		return string;
	}
}

// Function to convert MongoDB date format to a custom format
export function convertMongoDBDate(mongoDate) {
	// Convert MongoDB date string to JavaScript Date object
	var dateObj = new Date(mongoDate);

	// Get month, day, year, hours, and minutes
	var month = dateObj.toLocaleString("default", { month: "short" });
	var day = dateObj.getDate();
	var year = dateObj.getFullYear();
	var hours = dateObj.getHours();
	var minutes = dateObj.getMinutes();

	// Convert hours to 12-hour format
	var period = "am";
	if (hours >= 12) {
		period = "pm";
		if (hours > 12) {
			hours -= 12;
		}
	}

	// Add leading zero if minutes are less than 10
	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	// Format the date and time string
	var formattedDate = capitalizeFirstLetter(month) + " " + day + ", " + year;
	var formattedTime = hours + ":" + minutes + period;

	// Return formatted date and time
	return { Date: formattedDate, Time: formattedTime };
}

export const formatDate = date => {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

// LocalStorage Manager
export class LocalStorage {
	static setItem = (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	static getItem = key => {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	};

	static removeItem = key => {
		localStorage.removeItem(key);
	};
}

export const validateEmail = email => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email?.trim());
};

export const validatePassword = password => {
	return password.length >= 8;
};

export const validateURL = url => {
	const urlPattern = new RegExp(
		"^(https?:\\/\\/)?" + // protocol (optional)
			"((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" + // domain name
			"localhost|" + // localhost
			"\\d{1,3}(\\.\\d{1,3}){3})" + // OR IP (v4) address
			"(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?" + // port and path
			"(\\?[;&a-zA-Z0-9%_.~+=-]*)?" + // query string
			"(#[-a-zA-Z0-9_]*)?$",
		"i", // fragment locator
	);

	return !!urlPattern.test(url);
};

export const copyToClipboard = async text => {
	// Check if the Clipboard API is available
	if (navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(text);
			showToast("Link copied successful.");
		} catch (err) {
			console.log(err);
			showToast("Failed to copy the link.", "error");
		}
	} else {
		// Fallback for older browsers
		const textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			const successful = document.execCommand("copy");
			if (!successful) throw Error;
			showToast("Link copied successful.");
		} catch (err) {
			console.error(err);
			showToast("Failed to copy the link.", "error");
		}

		document.body.removeChild(textArea);
	}
};

export const generateShortUrl = link => {
	const shortUrl = `${CLIENT_ADDRESS}/${link.shortId}`
	return shortUrl;
};

class playSound {
	static error() {
		const errorSound = new Audio("../../assets/sounds/oops.wav");
		errorSound.play();
	}

	static success() {
		const successSound = new Audio("../../assets/sounds/success.wav");
		successSound.play();
	}
}

export { playSound };
