const churchLocation =
    "Christ's Mission Church - Mizpah, Upper Milimani, Thorn Grove Area, Railways Estate - Kitengela";

const weeklyEvents = [
    {
        id: "sunday-worship",
        title: "Sunday Worship Service",
        day: 0,
        startTime: "08:30",
        endTime: "13:00",
        description: "Prayer, worship, Bible teaching, testimonies, announcements, and sermon.",
    },
    {
        id: "monday-prayer-study",
        title: "Church Workers Prayer & Bible Study",
        day: 1,
        startTime: "18:00",
        endTime: "20:30",
        description: "Workers prayer hour followed by Bible Study for all.",
    },
    {
        id: "tuesday-prayer-study",
        title: "Men's Prayer & Bible Study",
        day: 2,
        startTime: "18:00",
        endTime: "20:30",
        description: "Men's and heads of families prayer hour followed by Bible Study for all.",
    },
    {
        id: "wednesday-women",
        title: "Women Meeting, Prayer & Bible Study",
        day: 3,
        startTime: "17:00",
        endTime: "20:00",
        description: "Women meet for prayer and their own Bible Study.",
    },
    {
        id: "thursday-prayer-study",
        title: "Youths & Singles Prayer & Bible Study",
        day: 4,
        startTime: "18:00",
        endTime: "20:30",
        description: "Youths and singles prayer hour followed by Bible Study for all.",
    },
    {
        id: "friday-prayer-study",
        title: "Prayer Hour & Bible Study",
        day: 5,
        startTime: "18:00",
        endTime: "21:30",
        description: "Prayer hour for all followed by Bible Study.",
    },
    {
        id: "saturday-prayer",
        title: "Saturday Prayer",
        day: 6,
        startTime: "17:00",
        endTime: "19:00",
        description: "Saturday prayer gathering.",
    },
];

const datedEvents = [
    {
        id: "kigooco-live-recording-2026",
        title: "Grace Upon Grace SN2: Kigooco Edition Live Recording",
        start: "2026-06-13T13:00:00+03:00",
        end: "2026-06-13T18:00:00+03:00",
        location: "Life Church Limuru, Destiny Grounds",
        description: "Cynthia Wambui presents Grace Upon Grace SN2: Kigooco Edition. Gates open at 1:00 PM. Tickets: https://gigs.madfun.com/event/801. End time to be confirmed.",
    },
    {
        id: "pentecost-friday-2026",
        cardId: "shavuot-2026",
        title: "Shavuot-Pentecost Holy Ghost Power Festival",
        start: "2026-05-22T20:00:00+03:00",
        end: "2026-05-23T00:00:00+03:00",
        description: "Friday Pentecost service and food fellowship.",
    },
    {
        id: "pentecost-saturday-2026",
        cardId: "shavuot-2026",
        title: "Shavuot-Pentecost Holy Ghost Power Festival",
        start: "2026-05-23T14:00:00+03:00",
        end: "2026-05-23T18:00:00+03:00",
        description: "Saturday Pentecost service and food fellowship.",
    },
    {
        id: "pentecost-sunday-2026",
        cardId: "shavuot-2026",
        title: "Shavuot-Pentecost Holy Ghost Power Festival",
        start: "2026-05-24T08:00:00+03:00",
        end: "2026-05-24T13:00:00+03:00",
        description: "Sunday Pentecost service and food fellowship.",
    },
    {
        id: "pesach-2026",
        title: "Pesach - Passover / Unleavened Bread",
        start: "2026-04-01T18:00:00+03:00",
        end: "2026-04-09T19:00:00+03:00",
        description: "Appointed feast of the Lord.",
    },
    {
        id: "firstfruits-2026",
        title: "Firstfruits",
        start: "2026-04-02T18:00:00+03:00",
        end: "2026-04-03T18:00:00+03:00",
        description: "Christ the firstfruits.",
    },
    {
        id: "shavuot-2026",
        title: "Shavuot / Feast of Weeks - Pentecost",
        start: "2026-05-21T18:00:00+03:00",
        end: "2026-05-23T19:00:00+03:00",
        description: "New Testament: Day of Pentecost.",
    },
    {
        id: "yom-teruah-2026",
        title: "Yom Teruah / Rosh Hashanah - Trumpets",
        start: "2026-09-11T18:00:00+03:00",
        end: "2026-09-13T19:00:00+03:00",
        description: "Trumpet imagery and resurrection hope.",
    },
    {
        id: "yom-kippur-2026",
        title: "Yom Kippur / The Fast - Day of Atonement",
        start: "2026-09-20T18:00:00+03:00",
        end: "2026-09-21T19:00:00+03:00",
        description: "New Testament: the Fast.",
    },
    {
        id: "sukkot-2026",
        title: "Sukkot / Feast of Tabernacles",
        start: "2026-09-25T18:00:00+03:00",
        end: "2026-10-02T19:00:00+03:00",
        description: "New Testament: Feast of Tabernacles.",
    },
    {
        id: "shemini-atzeret-2026",
        title: "Shemini Atzeret / Last Great Day",
        start: "2026-10-02T18:00:00+03:00",
        end: "2026-10-04T19:00:00+03:00",
        description: "The last great day of the feast.",
    },
    {
        id: "hanukkah-2026",
        title: "Hanukkah / Festival of Lights - Feast of Dedication",
        start: "2026-12-04T18:00:00+03:00",
        end: "2026-12-12T19:00:00+03:00",
        description: "New Testament: Feast of Dedication.",
    },
];

const now = new Date();

const formatTime = (date) =>
    new Intl.DateTimeFormat("en-KE", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date);

const formatDateTime = (date) =>
    new Intl.DateTimeFormat("en-KE", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date);

const sameDate = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

const setTime = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const eventDate = new Date(date);
    eventDate.setHours(hours, minutes, 0, 0);
    return eventDate;
};

const nextWeeklyOccurrence = (event, fromDate) => {
    const daysUntil = (event.day - fromDate.getDay() + 7) % 7;
    const startDate = new Date(fromDate);
    startDate.setDate(fromDate.getDate() + daysUntil);
    const start = setTime(startDate, event.startTime);
    let end = setTime(startDate, event.endTime);

    if (end <= start) {
        end.setDate(end.getDate() + 1);
    }

    if (end <= fromDate) {
        start.setDate(start.getDate() + 7);
        end.setDate(end.getDate() + 7);
    }

    return { ...event, start, end, isWeekly: true };
};

const datedOccurrence = (event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
    isWeekly: false,
});

const todaysWeeklyEvents = weeklyEvents
    .filter((event) => event.day === now.getDay())
    .map((event) => {
        const start = setTime(now, event.startTime);
        let end = setTime(now, event.endTime);

        if (end <= start) {
            end.setDate(end.getDate() + 1);
        }

        return { ...event, start, end, isWeekly: true };
    });

const datedOccurrences = datedEvents.map(datedOccurrence);
const todaysDatedEvents = datedOccurrences.filter(
    (event) => event.start <= now && event.end >= now || sameDate(event.start, now) || sameDate(event.end, now)
);
const todayEvents = [...todaysWeeklyEvents, ...todaysDatedEvents].sort(
    (first, second) => first.start - second.start
);

const upcomingEvents = [
    ...weeklyEvents.map((event) => nextWeeklyOccurrence(event, now)),
    ...datedOccurrences.filter((event) => event.start >= now),
].sort((first, second) => first.start - second.start);

const toCalendarDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const googleCalendarUrl = (event) => {
    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: event.title,
        dates: `${toCalendarDate(event.start)}/${toCalendarDate(event.end)}`,
        details: event.description,
        location: event.location || churchLocation,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const icsContent = (event) =>
    [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Christs Mission Church//Events//EN",
        "BEGIN:VEVENT",
        `UID:${event.id}-${event.start.getTime()}@christsmissionchurch`,
        `DTSTAMP:${toCalendarDate(new Date())}`,
        `DTSTART:${toCalendarDate(event.start)}`,
        `DTEND:${toCalendarDate(event.end)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location || churchLocation}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");

const icsUrl = (event) =>
    `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent(event))}`;

const calendarEventForCard = (eventId) => {
    const weekly = weeklyEvents.find((event) => event.id === eventId);

    if (weekly) {
        return nextWeeklyOccurrence(weekly, now);
    }

    const special = datedOccurrences.find((event) => event.cardId === eventId && event.end > now);

    if (special) {
        return special;
    }

    const dated = datedOccurrences.find((event) => event.id === eventId);

    if (dated) {
        return dated;
    }

    return datedOccurrences.find((event) => event.cardId === eventId);
};

const addCalendarLinks = () => {
    document.querySelectorAll("[data-event-id]").forEach((card) => {
        const event = calendarEventForCard(card.dataset.eventId);

        if (!event || card.querySelector(".calendar-actions")) {
            return;
        }

        const actions = document.createElement("div");
        actions.className = "calendar-actions";
        actions.innerHTML = `
            <a href="${googleCalendarUrl(event)}" target="_blank" rel="noopener noreferrer">Google Calendar</a>
            <a href="${icsUrl(event)}" download="${event.id}.ics">Apple Calendar</a>
        `;

        const content = card.querySelector("div:last-child") || card;
        content.appendChild(actions);
    });
};

const highlightTodaysCards = () => {
    const todaysIds = new Set();

    todayEvents.forEach((event) => {
        todaysIds.add(event.cardId || event.id);
    });

    todaysIds.forEach((id) => {
        const card = document.querySelector(`[data-event-id="${id}"]`);

        if (!card) {
            return;
        }

        card.classList.add("is-today");

        if (!card.querySelector(".today-badge")) {
            const badge = document.createElement("span");
            badge.className = "today-badge";
            badge.textContent = "Today";
            const content = card.querySelector("div:last-child") || card;
            content.prepend(badge);
        }
    });
};

const updateEventPanels = () => {
    const alert = document.querySelector("#event-alert");
    const todayPanel = document.querySelector("#today-events");
    const upcomingPanel = document.querySelector("#upcoming-event");
    const pentecostToday = todayEvents.find((event) =>
        event.title.toLowerCase().includes("pentecost")
    );

    if (alert && pentecostToday) {
        alert.hidden = false;
        alert.textContent = `Today is Pentecost: ${pentecostToday.title}.`;
    }

    if (todayPanel) {
        todayPanel.textContent = todayEvents.length
            ? todayEvents
                  .map((event) => `${event.title} (${formatTime(event.start)} - ${formatTime(event.end)})`)
                  .join(" | ")
            : "No scheduled event is listed for today.";
    }

    if (upcomingPanel && upcomingEvents.length) {
        const nextEvent = upcomingEvents[0];
        upcomingPanel.textContent = `${nextEvent.title} - ${formatDateTime(nextEvent.start)}.`;
    }
};

addCalendarLinks();
highlightTodaysCards();
updateEventPanels();
