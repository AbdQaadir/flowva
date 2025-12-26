import EarnMorePoints from "./components/earn-more-points/earn-more-points";
import ReferAndEarn from "./components/refer-and-earn/refer-and-earn";
import RewardsJourney from "./components/rewards-journey/rewards-journey";

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
