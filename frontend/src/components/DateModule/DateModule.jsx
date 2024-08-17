import * as React from "react"

import { Calendar } from "../ui/calendar"

export function CalendarDemo() {
    const [date, setDate] = React.useState()

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
        />
    )
}
