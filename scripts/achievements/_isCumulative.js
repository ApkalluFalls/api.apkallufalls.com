'use strict';

// This function determines if an achievement has shared progress with other achievements.
// I.e. if an achievement asks you to kill 10 enemies, then another asks you to kill 100, you
// will have already completed 10/100 on the other achievement, thus making it cumulative.
module.exports = function(achievement) {
	// The following are all cumulative.
	if (achievement.Type == 3
		|| achievement.Type == 4
		|| achievement.Type == 10
		|| achievement.Type == 12
		|| achievement.Type == 13
		|| achievement.Type == 17
		|| achievement.Type == 19)
		return true;

	// The following are not cumulative.
	if (achievement.Type == 2
		|| achievement.Type == 5
		|| achievement.Type == 6
		|| achievement.Type == 7
		|| achievement.Type == 8
		|| achievement.Type == 9
		|| achievement.Type == 14
		|| achievement.Type == 20
		|| achievement.Type == 23
		|| achievement.Type == 24)
		return false;

	// The rest are cumulative if their requirement_1 property contains any of the following values.
	const data_0_cumulative_keys = [
		"0","1","2","3","4","5","6","7","8","11",
		"12","13","14","15","16","17","18","19","20","21",
		"22","138","139","140","141","142","143","144","145","146",
		"147","148","149","162","163","164","165","166","167","168",
		"169","170","179","180","181","182","183","184","185","186",
		"187","188","189","190","191","192","193","194","195","196",
		"197","198","199","200","201","202","203","204","205","206",
		"207","208","209","210","211","212","213","214","215","216",
		"217","218","219","238","239","240","244","251","266","267",
		"268","277","278","284","285","286","290","291","292","294",
		"348","352","353","354","355","356","357","358","362","363",
		"364","365","366","369","370","371","372","373","374","423",
		"433","444","460","461","462","463","464","465","466","467",
		"468","469","470","471","472","473","474","498","499","500",
		"501","511","512","532","539","540","544","545","546","548",
		"549","567"
	];

	return data_0_cumulative_keys.indexOf("" + achievement.Data_0) !== -1
}