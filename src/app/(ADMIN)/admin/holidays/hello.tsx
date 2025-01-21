"use client";
import React, { useState } from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

export const Hello = () => {
  // Use useState for managing state in functional components
  // const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] =
    useState<EventApi[]>(INITIAL_EVENTS);

  // const handleWeekendsToggle = () => {
  //   setWeekendsVisible(!weekendsVisible);
  // };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt("Please enter a new title for your event");
    console.log(title, typeof title);
    const calendarApi = selectInfo.view.calendar;
    console.table([calendarApi]);
    calendarApi.unselect(); // clear date selection
    console.log(selectInfo.startStr, selectInfo.endStr);
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events); // Update current events
  };

  // Render the sidebar and main calendar UI
  return (
    <div className="demo-app w-screen">
      {renderSidebar()}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        />
      </div>
    </div>
  );

  // Function to render the sidebar
  function renderSidebar() {
    return (
      <div className="demo-app-sidebar mb-24 flex w-full items-start justify-between">
        <div className="demo-app-sidebar-section">
          <h2 className="mb-2 text-lg font-semibold text-white">
            Instruction:
          </h2>
          <ul className="list-inside list-disc space-y-1 text-gray-400">
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map((event, index) => (
              <span key={index} className="flex items-center">
                <svg
                  className="me-2 h-3.5 w-3.5 flex-shrink-0 text-green-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                {renderSidebarEvent(event)}{" "}
                {/* Ensure you are passing the event */}
              </span>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Function to render event content inside the calendar
  function renderEventContent(eventContent: EventContentArg) {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  }

  // Function to render event on the sidebar
  function renderSidebarEvent(event: EventApi) {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start!, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  }
};
