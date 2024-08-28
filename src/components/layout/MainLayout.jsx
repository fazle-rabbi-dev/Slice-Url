import { cn } from "@/lib/utils";

export const MainLayout = ({ children, className }) => {
	return <main className={cn("max-contaner padding-container", className)}>{children}</main>;
};
