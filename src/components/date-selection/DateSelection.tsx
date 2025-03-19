// "use client";

// import { useState } from "react";
// import { Menu } from "@headlessui/react";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { DateRange, RangeKeyDict } from "react-date-range";
// import { format, addDays } from "date-fns";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

// interface DateRangeState {
//   startDate: Date;
//   endDate: Date;
//   key: string;
// }

// const DateSelection = () => {
//   const [date, setDate] = useState<DateRangeState[]>([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 1),
//       key: "selection",
//     },
//   ]);

//   const handleDateChange = (item: RangeKeyDict) => {
//     const selection = item.selection;
//     setDate([
//       {
//         startDate: selection.startDate ?? new Date(),
//         endDate: selection.endDate ?? addDays(new Date(), 1),
//         key: "selection",
//       },
//     ]);
//   };

//   return (
//     <Menu as="div" className="w-full h-full flex xl:flex-row">
//       <div className="relative flex-1">
//         <Menu.Button className="dropdown-btn w-full h-full flex flex-col justify-center items-center xl:items-start xl:pl-8">
//           <div className="flex flex-col xl:flex-row items-center xl:gap-x-2 gap-y-2 xl:gap-y-0">
//             <FaCalendarAlt className="text-accent" />
//             <div className="text-[15px] uppercase font-bold">Select Date</div>
//           </div>
//           <div className="flex items-center gap-x-3 xl:ml-6">
//             <div className="text-[13px] font-medium text-secondary">
//               {format(date[0].startDate, "dd/MM/yyyy")}
//             </div>
//             <FaArrowRightLong className="text-accent text-[12px]" />
//             <div className="text-[13px] font-medium text-secondary">
//               {format(date[0].endDate, "dd/MM/yyyy")}
//             </div>
//           </div>
//         </Menu.Button>
//         <Menu.Items className="dropdown-menu shadow-lg absolute -top-96 xl:top-[90px] left-1/2 xl:left-0 z-50 transform -translate-x-1/2 xl:-translate-x-0 text-sm text-center xl:text-left w-full bg-white max-w-[332px] rounded-[10px] overflow-hidden">
//           <DateRange
//             onChange={handleDateChange}
//             editableDateInputs={true}
//             moveRangeOnFirstSelection={false}
//             ranges={date}
//             rangeColors={["#ed1d24"]}
//             minDate={new Date()}
//           />
//         </Menu.Items>
//       </div>
//     </Menu>
//   );
// };

// export default DateSelection;
"use client";

import { useState } from "react";
import { Menu } from "@headlessui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format, addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { StepOneFormData } from "../../../types"; // Adjust path

interface DateRangeState {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface DateSelectionProps {
  formData: StepOneFormData;
  setFormData: React.Dispatch<React.SetStateAction<StepOneFormData>>;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  formData,
  setFormData,
}) => {
  const [date, setDate] = useState<DateRangeState[]>([
    {
      startDate: formData.startDate || new Date(),
      endDate: formData.endDate || addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const handleDateChange = (item: RangeKeyDict) => {
    const selection = item.selection;
    const newDate = {
      startDate: selection.startDate ?? new Date(),
      endDate: selection.endDate ?? addDays(new Date(), 1),
      key: "selection",
    };
    setDate([newDate]);
    setFormData((prev) => ({
      ...prev,
      startDate: newDate.startDate,
      endDate: newDate.endDate,
    }));
  };

  return (
    <Menu as="div" className="w-full h-full flex xl:flex-row">
      <div className="relative flex-1">
        <Menu.Button className="dropdown-btn w-full h-full flex flex-col justify-center items-center xl:items-start xl:pl-8">
          <div className="flex flex-col xl:flex-row items-center xl:gap-x-2 gap-y-2 xl:gap-y-0">
            <FaCalendarAlt className="text-black" />
            <div className="text-[15px] uppercase font-bold">
              Select Date Range
            </div>
          </div>
          <div className="flex items-center gap-x-3 xl:ml-6">
            <div className="text-[13px] font-medium text-black">
              {format(date[0].startDate, "dd/MM/yyyy")}
            </div>
            <FaArrowRightLong className="text-black text-[12px]" />
            <div className="text-[13px] font-medium text-black">
              {format(date[0].endDate, "dd/MM/yyyy")}
            </div>
          </div>
        </Menu.Button>
        <Menu.Items className="dropdown-menu shadow-lg absolute -top-96 xl:top-[90px] left-1/2 xl:left-0 z-50 transform -translate-x-1/2 xl:-translate-x-0 text-sm text-center xl:text-left w-full bg-white max-w-[332px] rounded-[10px] overflow-hidden">
          <DateRange
            onChange={handleDateChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={date}
            rangeColors={["#ed1d24"]}
            minDate={new Date()}
          />
        </Menu.Items>
      </div>
    </Menu>
  );
};

export default DateSelection;
