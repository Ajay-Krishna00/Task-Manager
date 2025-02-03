import { useState } from "react";
import "./Calendar.css";
import { useColorMode, Box, Button } from "@chakra-ui/react";
import { StyledText } from "./StyledComponenets";

const Calendar = () => {
  // Initializing the current date
  const [currentDate, setCurrentDate] = useState(new Date());
  const { colorMode } = useColorMode();
  // Get the current month and year
  const currentMonth = currentDate.getMonth(); // 0 to 11
  const currentYear = currentDate.getFullYear();

  // Helper function to get the first day of the month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Helper function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate an array of days for the calendar
  const generateCalendarDays = (year, month) => {
    const firstDay = getFirstDayOfMonth(year, month); // First day of the month (0 - Sunday, 6 - Saturday)
    const daysInMonth = getDaysInMonth(year, month); // Number of days in the month
    const days = [];

    // Fill empty days before the start of the month (empty spaces)
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Handle navigating to the previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  // Handle navigating to the next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  const days = generateCalendarDays(currentYear, currentMonth);

  const dayBG = colorMode === "light" ? "yellow.200" : "#a59d0390";

  return (
    <Box
      className="calendar-container"
      backgroundColor={colorMode === "light" ? "white" : "#151b23"}
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      {/* Calendar Header (Month and Year) */}
      <div className="calendar-header">
        <Button
          className="nav-btn"
          variant={"outline"}
          background={colorMode === "light" ? "white" : "#151b23"}
          border={"1px solid"}
          borderColor={colorMode === "dark" ? "white" : "black"}
          onClick={prevMonth}
          _hover={{
            backgroundColor: colorMode === "light" ? "white" : "gray.700",
          }}
          pl={2}
          pr={2}
        >
          <StyledText fSize="12px"> Prev</StyledText>
        </Button>
        <StyledText fSize="14px">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentYear}
        </StyledText>
        <Button
          className="nav-btn"
          onClick={nextMonth}
          variant={"outline"}
          background={colorMode === "light" ? "white" : "#151b23"}
          border={"1px solid"}
          borderColor={colorMode === "dark" ? "white" : "black"}
          _hover={{
            backgroundColor: colorMode === "light" ? "white" : "gray.700",
          }}
          pl={2}
          pr={2}
        >
          <StyledText fSize="12px"> Next</StyledText>
        </Button>
      </div>

      {/* Days of the Week */}
      <Box className="calendar-weekdays" gap={0.5}>
        <StyledText fSize="12px" backgroundColor={dayBG} borderRadius="25px">
          {" "}
          Sun
        </StyledText>
        <StyledText fSize="12px" backgroundColor={dayBG} borderRadius="25px">
          {" "}
          Mon
        </StyledText>
        <StyledText fSize="12px" backgroundColor={dayBG} borderRadius="25px">
          {" "}
          Tue
        </StyledText>
        <StyledText fSize="12px" backgroundColor={dayBG} borderRadius="25px">
          {" "}
          Wed
        </StyledText>
        <StyledText fSize="12px" backgroundColor={dayBG} borderRadius="25px">
          {" "}
          Thu
        </StyledText>
        <StyledText fSize="12px" backgroundColor={dayBG} borderRadius="25px">
          {" "}
          Fri
        </StyledText>
        <StyledText fSize="12px" backgroundColor={dayBG} borderRadius="25px">
          {" "}
          Sat
        </StyledText>
      </Box>

      {/* Calendar Days Grid */}
      <div className="calendar-days">
        {days.map((day, index) => (
          <Box
            key={index}
            className={`calendar-day ${
              day === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear()
                ? "today"
                : ""
            }`}
            backgroundColor={
              day === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear()
                ? "#3182ce"
                : colorMode === "light"
                  ? "#edf2f7"
                  : "#1a202c"
            }
            color={
              day === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear()
                ? "white"
                : colorMode === "light"
                  ? "black"
                  : "white"
            }
          >
            {day}
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default Calendar;
