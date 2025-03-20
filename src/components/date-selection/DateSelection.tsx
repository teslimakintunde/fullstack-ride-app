// "use client";

// import { useState, useEffect } from "react";
// import { Menu } from "@headlessui/react";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { DateRange, RangeKeyDict } from "react-date-range";
// import { format, addDays } from "date-fns";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { StepOneFormData } from "../../../types"; // Adjust path

// interface DateRangeState {
//   startDate: Date;
//   endDate: Date;
//   key: string;
// }

// interface DateSelectionProps {
//   formData: StepOneFormData;
//   setFormData: React.Dispatch<React.SetStateAction<StepOneFormData>>;
//   reset?: boolean; // New prop to trigger reset
// }

// const DateSelection: React.FC<DateSelectionProps> = ({
//   formData,
//   setFormData,
//   reset = false,
// }) => {
//   const [date, setDate] = useState<DateRangeState[]>([
//     {
//       startDate: formData.startDate || new Date(),
//       endDate: formData.endDate || addDays(new Date(), 1),
//       key: "selection",
//     },
//   ]);

//   // Reset dates when reset prop changes to true
//   useEffect(() => {
//     if (reset) {
//       setDate([
//         {
//           startDate: new Date(),
//           endDate: addDays(new Date(), 1),
//           key: "selection",
//         },
//       ]);
//       setFormData((prev) => ({
//         ...prev,
//         startDate: null,
//         endDate: null,
//       }));
//     }
//   }, [reset, setFormData]);

//   const handleDateChange = (item: RangeKeyDict) => {
//     const selection = item.selection;
//     const newDate = {
//       startDate: selection.startDate ?? new Date(),
//       endDate: selection.endDate ?? addDays(new Date(), 1),
//       key: "selection",
//     };
//     setDate([newDate]);
//     setFormData((prev) => ({
//       ...prev,
//       startDate: newDate.startDate,
//       endDate: newDate.endDate,
//     }));
//   };

//   // Determine display text
//   const startText = formData.startDate
//     ? format(formData.startDate, "dd/MM/yyyy")
//     : "Start";
//   const endText = formData.endDate
//     ? format(formData.endDate, "dd/MM/yyyy")
//     : "End";

//   return (
//     <Menu as="div" className="w-full h-full flex xl:flex-row">
//       <div className="relative flex-1 border justify-start">
//         <Menu.Button className="dropdown-btn w-full h-full flex flex-col justify-center items-center xl:items-start xl:pl-8">
//           <div className="flex mb-3 p-2 -ml-5 flex-col xl:flex-row items-center xl:gap-x-2 gap-y-2 xl:gap-y-0">
//             <FaCalendarAlt className="text-black" />
//             <div className="text-[15px] uppercase font-bold">
//               Select Date Range
//             </div>
//           </div>
//           <div className="flex items-center gap-x-3">
//             <div className="text-[16px] font-medium text-black">
//               {startText}
//             </div>
//             <FaArrowRightLong className="text-black text-[16px]" />
//             <div className="text-[16px] font-medium text-black">{endText}</div>
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

import { useState, useEffect } from "react";
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
  reset?: boolean;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  formData,
  setFormData,
  reset = false,
}) => {
  const [date, setDate] = useState<DateRangeState[]>([
    {
      startDate: formData.startDate || new Date(),
      endDate: formData.endDate || addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  // Reset dates when reset prop changes to true
  useEffect(() => {
    if (reset) {
      setDate([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 1),
          key: "selection",
        },
      ]);
      setFormData((prev) => ({
        ...prev,
        startDate: null,
        endDate: null,
      }));
    }
  }, [reset, setFormData]);

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

  // Determine display text
  const startText = formData.startDate
    ? format(formData.startDate, "dd/MM/yyyy")
    : "Start";
  const endText = formData.endDate
    ? format(formData.endDate, "dd/MM/yyyy")
    : "End";

  return (
    <Menu as="div" className="w-full h-full flex xl:flex-row">
      <div className="relative flex-1 border justify-start">
        <Menu.Button className="dropdown-btn w-full h-full flex flex-col items-start ">
          <div className="flex mb-3 p-2 flex-row items-center gap-y-2 xl:gap-y-0">
            <FaCalendarAlt className="text-black mr-2" />
            <div className="text-[15px] uppercase font-bold">
              Select Date Range
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="text-[16px] font-medium text-black">
              {startText}
            </div>
            <FaArrowRightLong className="text-black text-[16px]" />
            <div className="text-[16px] font-medium text-black">{endText}</div>
          </div>
        </Menu.Button>
        <Menu.Items className="dropdown-menu shadow-lg absolute top-full xl:top-[90px] left-0 z-50 w-full bg-white max-w-[332px] max-h-[70vh] overflow-y-auto rounded-[10px]">
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
