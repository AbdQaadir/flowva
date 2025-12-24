import EarnMorePoints from "../../-components/EarnMorePoints";
import ReferAndEarn from "../../-components/ReferAndEarn";
import RewardsJourney from "../../-components/RewardsJourney";

function EarnPoints() {
	return (
		<div className="w-full flex flex-col gap-6">
			<RewardsJourney />
			<EarnMorePoints />
			<ReferAndEarn />
		</div>
	);
}

export default EarnPoints;
