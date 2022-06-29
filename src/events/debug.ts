import { Event } from "../structures/Event";

export default new Event("debug", (data) => {
    console.log(data);
});
