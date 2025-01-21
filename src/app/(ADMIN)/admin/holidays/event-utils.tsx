import { EventInput } from "@fullcalendar/core";
import { getHolidays } from "@/db/AdminDbQueries";

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
console.log(todayStr, typeof todayStr); // YYYY-MM-DD of today

// Initialize `hk` as an empty array of EventInput objects.
let hk: EventInput[] = [];

async function getEvents(): Promise<EventInput[]> {
  const holidays = await getHolidays();
  // Map the holidays to EventInput array
  return holidays.map((holiday) => {
    const event: EventInput = {
      id: holiday.id.toString(),
      title: holiday.title,
      start: holiday.holiday_date.toISOString().replace(/T.*$/, ""),
    };
    return event;
  });
}

// This function will populate the `hk` array with events.
async function loadEvents() {
  const events = await getEvents(); // Get the events from the `getEvents` function
  hk = events; // Assign the resolved events to `hk`
  console.log(hk); // Now that `hk` is populated, you can log it here
}

// Call `loadEvents` to initialize `hk`
console.log("HKing", hk);
loadEvents();
console.log("HK", hk);
export const INITIAL_EVENTS: EventInput[] = hk;
// This function generates unique event IDs
export function createEventId() {
  return String(eventGuid++);
}
