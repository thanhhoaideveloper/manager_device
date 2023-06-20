const status = {
	//device in department
	DAMAGED: 'damaged',
	WAITING_FOR_MAINTENANCE: "waiting for maintenance",
	IS_MAINTAINED: "is maintained",
	COMPLETE_MAINTENANCE: "complete maintenance",

	USING: "using",
	NO_USING: "no using"

}

const type = {
	DECREASE:"decrease",
	INCREASE:"increase"
};
module.exports = {
	status,
	type
};