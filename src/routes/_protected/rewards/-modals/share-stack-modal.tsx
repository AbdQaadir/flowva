import { Layers } from "lucide-react";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
	trigger: React.ReactNode;
};
function ShareStackModal({ trigger }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={(value) => setOpen(value)}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent className="max-w-[90vw] md:max-w-90 justify-center text-center gap-4">
				<DialogHeader>
					<DialogTitle className="font-black text-center text-xl">
						Share Your Stack
					</DialogTitle>
				</DialogHeader>

				<div className="flex items-center justify-center mx-auto rounded-full h-10 w-10 bg-primary/30 text-primary">
					<Layers className="text-primary h-5 w-5" />
				</div>

				<p className="text-sm">
					You have no stack created yet, go to Tech Stack to create one.
				</p>
			</DialogContent>
		</Dialog>
	);
}

export default ShareStackModal;
