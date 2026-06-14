const emitEvent = (
    req,
    eventName,
    data = {}
) => {

    const io = req.app.get("io");

    io.to("adminRoom").emit(
        eventName,
        {
            type: eventName,

            message:
                `${eventName} event triggered`,

            timestamp: new Date(),

            data,
        }
    );
};

module.exports = emitEvent;