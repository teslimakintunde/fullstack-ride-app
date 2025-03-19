// "use client";

// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { Calendar } from "../ui/calendar";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Label } from "../ui/label";

// // Define the module shape exported by calendar.tsx
// // interface CalendarModule {
// //   default: React.ComponentType<DayPickerProps>;
// // }

// // const Calendar = dynamic(() => import("../ui/calendar") as Promise<CalendarModule>, {
// //   ssr: false,
// // });

// type DateTimeFormProps = {
//   id: string;
//   label: string;
//   value: Date | null;
//   onChange: (date: Date | null) => void;
// };
// const DateTimeForm: React.FC<DateTimeFormProps> = ({
//   id,
//   label,
//   value,
//   onChange,
// }) => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Normalize time to avoid timezone issues

//   const handleSelectDate = (date: Date | undefined) => {
//     const newDate = date || null; // Ensure it is either Date or null
//     setSelectedDate(newDate);
//     onChange(newDate); // Pass selected date to parent component
//   };
//   return (
//     <div>
//       <Label htmlFor={id} className="font-semibold text-md">
//         {label}
//       </Label>
//       <div className="flex flex-col py-3">
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant={"outline"}
//               className={cn(
//                 "pl-3 text-left font-normal",
//                 !selectedDate && "text-muted-foreground"
//               )}
//             >
//               {selectedDate ? (
//                 format(selectedDate, "PPP")
//               ) : (
//                 <span>Pick a date</span>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="" align="start">
//             <Calendar
//               mode="single"
//               selected={selectedDate || undefined}
//               onSelect={handleSelectDate}
//               disabled={(date) => date < today} // Disable past dates
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>
//       </div>
//     </div>
//   );
// };

// export default DateTimeForm;
"use client";
import { Label } from "@radix-ui/react-label";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type DateTimeFormProps = {
  id: string;
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
};
const DateTimeForm: React.FC<DateTimeFormProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize time to avoid timezone issues

  const handleSelectDate = (date: Date | undefined) => {
    const newDate = date || null; // Ensure it is either Date or null
    setSelectedDate(newDate);
    onChange(newDate); // Pass selected date to parent component
  };
  return (
    <div>
      <Label htmlFor={id} className="font-semibold text-md">
        {label}
      </Label>
      <div className="flex flex-col py-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "pl-3 text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="" align="start">
            <Calendar
              mode="single"
              selected={selectedDate || undefined}
              onSelect={handleSelectDate}
              disabled={(date) => date < today} // Disable past dates
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateTimeForm;
