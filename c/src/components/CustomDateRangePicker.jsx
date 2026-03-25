// components/CustomDateRangePicker.jsx
import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/Button";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const isSameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
const isBetween = (d, start, end) => d > start && d < end;
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const SHORTCUTS = [
  {
    label: "Today",
    getRange: () => {
      const d = today();
      return { start: d, end: d };
    },
  },
  {
    label: "Yesterday",
    getRange: () => {
      const d = today();
      d.setDate(d.getDate() - 1);
      return { start: d, end: d };
    },
  },
  {
    label: "Last 7 days",
    getRange: () => {
      const end = today();
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      return { start, end };
    },
  },
  {
    label: "Last 30 days",
    getRange: () => {
      const end = today();
      const start = new Date(end);
      start.setDate(start.getDate() - 29);
      return { start, end };
    },
  },
  {
    label: "This month",
    getRange: () => {
      const now = new Date();
      return {
        start: new Date(now.getFullYear(), now.getMonth(), 1),
        end: today(),
      };
    },
  },
  {
    label: "Last month",
    getRange: () => {
      const now = new Date();
      return {
        start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        end: new Date(now.getFullYear(), now.getMonth(), 0),
      };
    },
  },
];

const CalendarGrid = ({
  year,
  month,
  startDate,
  endDate,
  hoverDate,
  onDayClick,
  onDayHover,
}) => {
  const firstDay = new Date(year, month, 1).getDay();
  const total = daysInMonth(year, month);
  const cells = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d));

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold text-gray-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} />;

          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const effectiveEnd = endDate || hoverDate;
          const inRange =
            startDate &&
            effectiveEnd &&
            startDate <= effectiveEnd &&
            isBetween(date, startDate, effectiveEnd);
          const isToday = isSameDay(date, today());

          let cls =
            "text-sm h-8 flex items-center justify-center cursor-pointer select-none transition-colors ";

          if (isStart || isEnd) {
            cls += "bg-primary text-white font-semibold rounded-lg z-10 ";
          } else if (inRange) {
            cls += "bg-red-50 text-primary ";
          } else {
            cls += "text-gray-700 hover:bg-gray-100 rounded-lg ";
          }

          if (isToday && !isStart && !isEnd)
            cls += "font-bold underline underline-offset-2 ";

          return (
            <div
              key={date.toISOString()}
              className={cls}
              onClick={() => onDayClick(date)}
              onMouseEnter={() => onDayHover(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CustomDateRangePicker = ({
  onApply,
  buttonText = "Custom Range",
  variant = "outline",
  size = "default",
  className = "",
}) => {
  const now = new Date();
  const [showPicker, setShowPicker] = useState(false);
  const [leftYear, setLeftYear] = useState(now.getFullYear());
  const [leftMonth, setLeftMonth] = useState(now.getMonth());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [appliedRange, setAppliedRange] = useState(null);
  const pickerRef = useRef(null);

  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;

  useEffect(() => {
    const handler = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target))
        setShowPicker(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const prevMonth = () => {
    if (leftMonth === 0) {
      setLeftMonth(11);
      setLeftYear((y) => y - 1);
    } else setLeftMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (leftMonth === 11) {
      setLeftMonth(0);
      setLeftYear((y) => y + 1);
    } else setLeftMonth((m) => m + 1);
  };

  const handleDayClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else setEndDate(date);
    }
  };

  const handleShortcut = ({ getRange }) => {
    const { start, end } = getRange();
    setStartDate(start);
    setEndDate(end);
  };

  const handleApply = () => {
    if (startDate && endDate) {
      setAppliedRange({ start: startDate, end: endDate });
      onApply({
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      });
      setShowPicker(false);
    }
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setAppliedRange(null);
    onApply(null);
    setShowPicker(false);
  };

  const getButtonLabel = () => {
    if (!appliedRange) return buttonText;
    return `${appliedRange.start.toLocaleDateString()} – ${appliedRange.end.toLocaleDateString()}`;
  };

  return (
    <div className={`relative inline-block ${className}`} ref={pickerRef}>
      <Button
        variant={appliedRange ? "primary" : variant}
        size={size}
        icon={<Calendar className="w-4 h-4" />}
        onClick={() => setShowPicker((v) => !v)}
      >
        {getButtonLabel()}
      </Button>

      {showPicker && (
        <div
          className="absolute top-full mt-2 right-0 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 flex overflow-hidden"
          style={{ minWidth: 620 }}
        >
          {/* Dual calendars */}
          <div className="flex flex-col flex-1">
            <div className="flex">
              {/* Left */}
              <div className="p-4 w-64">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={prevMonth}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-sm font-semibold text-gray-800">
                    {MONTHS[leftMonth]} {leftYear}
                  </span>
                  <div className="w-6" />
                </div>
                <CalendarGrid
                  year={leftYear}
                  month={leftMonth}
                  startDate={startDate}
                  endDate={endDate}
                  hoverDate={hoverDate}
                  onDayClick={handleDayClick}
                  onDayHover={setHoverDate}
                />
              </div>

              {/* Right */}
              <div className="p-4 w-64 border-l border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-6" />
                  <span className="text-sm font-semibold text-gray-800">
                    {MONTHS[rightMonth]} {rightYear}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <CalendarGrid
                  year={rightYear}
                  month={rightMonth}
                  startDate={startDate}
                  endDate={endDate}
                  hoverDate={hoverDate}
                  onDayClick={handleDayClick}
                  onDayHover={setHoverDate}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
              <div className="text-xs text-gray-500">
                {!startDate && "Select start date"}
                {startDate && !endDate && "Now select end date"}
                {startDate && endDate && (
                  <span className="font-medium text-gray-700">
                    {startDate.toLocaleDateString()} →{" "}
                    {endDate.toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleClear}>
                  Clear
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApply}
                  disabled={!startDate || !endDate}
                >
                  Apply Range
                </Button>
              </div>
            </div>
          </div>

          {/* Quick select sidebar - moved to right */}
          <div className="w-36 bg-gray-50 border-l border-gray-100 py-4 px-2 flex flex-col gap-0.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">
              Quick select
            </p>
            {SHORTCUTS.map((s) => (
              <button
                key={s.label}
                onClick={() => handleShortcut(s)}
                className="text-left text-sm text-gray-600 hover:text-primary hover:bg-red-50 px-2 py-1.5 rounded-lg transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDateRangePicker;
