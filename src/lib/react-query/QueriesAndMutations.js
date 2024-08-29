import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

import QUERY_KEYS from "./queryKeys";
import {
	createUserAccount,
	confirmAccount,
	loginUserAccount,
	socialLogin,
	getUser,
	changePassword,
	updateAccount,
	getLinks,
	getLinkByShortId,
	shortenLink,
	shortenLinkAnonymously,
	changeLinkAlias,
	deleteLink
} from "../api";

// =====================================================================================================================
// Users & Auth
// =====================================================================================================================
export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: user => createUserAccount(user),
	});
};

export const useConfirmAccount = () => {
	return useMutation({
		mutationFn: data => confirmAccount(data),
	});
};

export const useLoginUserAccount = () => {
	return useMutation({
		mutationFn: user => loginUserAccount(user),
	});
};

export const useSocialLogin = () => {
	return useMutation({
		mutationFn: data => socialLogin(data),
	});
};

export const useChangePassword = () => {
	return useMutation({
		mutationFn: data => changePassword(data),
	});
};

export const useUpdateAccount = () => {
	return useMutation({
		mutationFn: data => updateAccount(data),
	});
};

export const useGetUser = user => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USER],
		queryFn: getUser,
		enabled: !!user,
	});
};

// =====================================================================================================================
// Links Related Operation
// =====================================================================================================================
export const useGetLinks = isLoggedIn => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_LINKS],
		queryFn: getLinks,
		enabled: isLoggedIn,
		refetchOnWindowFocus: false,
	});
};

export const useGetLinkByShortId = shortId => {
	return useQuery({
		queryKey: [shortId],
		queryFn: () => getLinkByShortId(shortId),
		enabled: !!shortId,
		// refetchOnWindowFocus: false,
	});
};

export const useShortenLink = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: originalUrl => shortenLink(originalUrl),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_LINKS] });
		},
	});
};

export const useShortenLinkAnonymously = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: originalUrl => shortenLinkAnonymously(originalUrl),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_LINKS] });
		},
	});
};

export const useChangeLinkAlias = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: data => changeLinkAlias(data),
		onSuccess: ApiResponse => {
			queryClient.invalidateQueries({ queryKey: [ApiResponse?.data?.link.shortId] });
		},
	});
};

export const useDeleteLink = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: shortId => deleteLink(shortId),
		onSuccess: ApiResponse => {
		// 	queryClient.invalidateQueries({ queryKey: [ApiResponse?.data?.link.shortId] });
		},
	});
};
