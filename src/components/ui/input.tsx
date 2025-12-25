import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

type InputProps = React.ComponentProps<"input"> & {
	searchIcon?: boolean;
	label?: string;
	required?: boolean;
	error?: boolean;
	errorText?: string;
};
function Input({
	className,
	type,
	searchIcon,
	label,
	required,
	error,
	errorText,
	...props
}: InputProps) {
	return (
		<div className="w-full flex flex-col gap-2">
			{label && (
				<Label
					htmlFor={props.id}
					className="text-sm font-outfit text-primary font-medium"
				>
					{label}
					{required && <span className="text-destructive">*</span>}
				</Label>
			)}
			<div className="relative">
				{searchIcon && (
					<div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
						<SearchIcon className="size-4" />
						<span className="sr-only">Search</span>
					</div>
				)}
				<input
					type={type}
					data-slot="input"
					className={cn(
						"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-11 md:h-15 w-full min-w-0 rounded-[30px] border bg-transparent px-6 py-4 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F2F2F2] md:text-sm",
						"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
						"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
						className,
					)}
					{...props}
				/>
			</div>

			{error && errorText && (
				<p className="text-destructive text-sm">{errorText}</p>
			)}
		</div>
	);
}

export { Input };
