"use client";

import { useEffect, useState } from "react";

export function MissionClock() {
  const [time, setTime] = useState("00:00:00");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(n.toUTCString().slice(17, 25));
      setDate(n.toISOString().slice(0, 10).replace(/-/g, "."));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="clock">
      <span className="clock-date">{date}</span>
      <span className="clock-time">{time}</span>
      <span className="clock-z">UTC</span>
    </div>
  );
}
