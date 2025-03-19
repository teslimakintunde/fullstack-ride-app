"use client";

import StepFour from "@/components/step-four/StepFour";
import StepOne from "@/components/step-one/StepOne";
import { steps } from "@/constants/appdata";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  StepOneFormData,
  StepTwoFormData,
  StepThreeFormData,
} from "../../../types";
import Insights from "@/components/insights/Insights";
import Contact from "@/components/contact/Contact";
import { addDays } from "date-fns";

const BookingPageContent = () => {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState<number>(
    parseInt(searchParams.get("index") || "1", 10)
  );

  const [isDateRangeAvailable, setIsDateRangeAvailable] =
    useState<boolean>(true); // New state

  // Form state using useState instead of useForm
  const [stepOneForm, setStepOneForm] = useState<StepOneFormData>({
    startDate: null, // Updated from pickupDate
    endDate: null, // New field
    pickupTime: "",
    persons: "",
    pickupLocation: null, // Stores selected pickup location
    destinationLocation: null, // Stores selected destination location
    activeMode: "source", // Tracks whether user is selecting source or destination
  });
  const [stepTwoForm, setStepTwoForm] = useState<StepTwoFormData>({
    imgUrl: "",
    title: "",
    desc: "",
    price: "",
    carSlug: "",
  });

  const [stepThreeForm, setStepThreeForm] = useState<StepThreeFormData>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    comment: "",
  });

  // Update the URL query string without causing an infinite loop
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   console.log(queryParams);
  //   queryParams.set("index", current.toString());
  //   window.history.replaceState(null, "", "?" + queryParams.toString()); // Update the URL without reloading
  // }, [current]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      console.log(queryParams);
      queryParams.set("index", current.toString());
      window.history.replaceState(null, "", "?" + queryParams.toString());
    }
  }, [current]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <div className="lg:pt-20 border font-roboto">
      <div className="hidden lg:flex justify-center items-center lg:mt-10  ml-24">
        <div className="grid grid-cols-4 gap-5 mt-5 items-center w-[75%]">
          {steps.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-5">
                <svg
                  className="w-10 h-10 cursor-pointer"
                  viewBox="0 0 38 38"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 19C0 8.50547 8.50547 0 19 0C29.4945 0 38 8.50547 38 19C38 29.4945 29.4945 38 19 38C8.50547 38 0 29.4945 0 19ZM27.5945 15.7195C28.4035 14.9105 28.4035 13.5895 27.5945 12.7805C26.7855 11.9715 25.4645 11.9715 24.6555 12.7805L16.625 20.8109L13.3445 17.5305C12.5355 16.7215 11.2145 16.7215 10.4055 17.5305C9.59648 18.3395 9.59648 19.6605 10.4055 20.4695L15.1555 25.2195C15.9645 26.0285 17.2855 26.0285 18.0945 25.2195L27.5945 15.7195Z"
                    fill={current >= index + 1 ? "#26d4e0" : "black"}
                  />
                </svg>
                {index !== 3 && (
                  <div
                    className={`w-full h-0.5 ${
                      current > index + 1 ? "bg-red-500" : "bg-black"
                    } rounded`}
                  ></div>
                )}
              </div>
              <p className="w-full font-roboto font-semibold text-sm uppercase my-2 text-slate-400">
                Step {index + 1}
              </p>
              <p className="w-full font-roboto font-semibold text-sm uppercase text-slate-400">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {current === 1 && (
        <StepOne
          formData={stepOneForm}
          setFormData={setStepOneForm}
          setIsDateRangeAvailable={setIsDateRangeAvailable}
        />
      )}
      {current === 2 && (
        <Insights
          isForm={true}
          formData={stepTwoForm}
          setFormData={setStepTwoForm}
        />
      )}
      {current === 3 && (
        <Contact formData={stepThreeForm} setFormData={setStepThreeForm} />
      )}
      {current === 4 && (
        <StepFour
          formData={{
            ...stepOneForm,
            startDate: stepOneForm.startDate
              ? stepOneForm.startDate.toISOString()
              : new Date().toISOString(),
            endDate: stepOneForm.endDate
              ? stepOneForm.endDate.toISOString()
              : addDays(new Date(), 1).toISOString(),
            ...stepTwoForm,
            ...stepThreeForm,
          }}
        />
      )}

      <div className="flex justify-between items-center px-[10%] py-3">
        <button
          onClick={() => setCurrent(current - 1)} // Go back to the previous step
          className=" disabled:opacity-0 bg-black text-white px-10 py-3 rounded-full"
          disabled={current === 1}
        >
          Back
        </button>
        <button
          onClick={() => setCurrent(current + 1)} // Go to the next step
          className="disabled:opacity-70 disabled:cursor-not-allowed  bg-black text-white px-10 py-3 rounded-full"
          disabled={current === 4 || (current === 1 && !isDateRangeAvailable)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Wrap the BookingPageContent in a Suspense Boundary
const BookingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
};

export default BookingPage;
// "use client"; // Ensures this is a client-side component

// import StepFour from "@/components/step-four/StepFour";
// import StepOne from "@/components/step-one/StepOne";
// import { steps } from "@/constants/appdata";
// import { useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   StepOneFormData,
//   StepTwoFormData,
//   StepThreeFormData,
// } from "../../../types";
// import Insights from "@/components/insights/Insights";
// import Contact from "@/components/contact/Contact";
// import dynamic from "next/dynamic";

// // Ensure `window` is only used on the client
// const isClient = typeof window !== "undefined";

// const BookingPageComponent = () => {
//   const { status } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Prevent server-side issues
//   const [current, setCurrent] = useState<number>(
//     isClient ? parseInt(searchParams.get("index") || "1", 10) : 1
//   );

//   // Ensure this runs only on the client
//   useEffect(() => {
//     if (isClient) {
//       const queryParams = new URLSearchParams(window.location.search);
//       queryParams.set("index", current.toString());
//       window.history.replaceState(null, "", "?" + queryParams.toString());
//     }
//   }, [current]);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

//   // **Form state**
//   const [stepOneForm, setStepOneForm] = useState<StepOneFormData>({
//     pickupDate: null,
//     pickupTime: "",
//     persons: "",
//     pickupLocation: null,
//     destinationLocation: null,
//     activeMode: "source",
//   });

//   const [stepTwoForm, setStepTwoForm] = useState<StepTwoFormData>({
//     imgUrl: "",
//     title: "",
//     desc: "",
//     price: "",
//     carSlug: "",
//   });

//   const [stepThreeForm, setStepThreeForm] = useState<StepThreeFormData>({
//     firstname: "",
//     lastname: "",
//     email: "",
//     phoneNumber: "",
//     comment: "",
//   });

//   return (
//     <div className="lg:pt-20 border">
//       {/* Step Progress UI */}
//       <div className="hidden lg:flex justify-center items-center lg:mt-10 ml-24">
//         <div className="grid grid-cols-4 gap-5 mt-5 items-center w-[75%]">
//           {steps.map((item, index) => (
//             <div key={index}>
//               <div className="flex items-center gap-5">
//                 <svg
//                   className="w-10 h-10 cursor-pointer"
//                   viewBox="0 0 38 38"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M0 19C0 8.50547 8.50547 0 19 0C29.4945 0 38 8.50547 38 19C38 29.4945 29.4945 19.4945 19 38C8.50547 38 0 29.4945 0 19ZM27.5945 15.7195C28.4035 14.9105 28.4035 13.5895 27.5945 12.7805C26.7855 11.9715 25.4645 11.9715 24.6555 12.7805L16.625 20.8109L13.3445 17.5305C12.5355 16.7215 11.2145 16.7215 10.4055 17.5305C9.59648 18.3395 9.59648 19.6605 10.4055 20.4695L15.1555 25.2195C15.9645 26.0285 17.2855 26.0285 18.0945 25.2195L27.5945 15.7195Z"
//                     fill={current >= index + 1 ? "#26d4e0" : "black"}
//                   />
//                 </svg>
//                 {index !== 3 && (
//                   <div
//                     className={`w-full h-0.5 ${
//                       current > index + 1 ? "bg-red-500" : "bg-black"
//                     } rounded`}
//                   ></div>
//                 )}
//               </div>
//               <p className="w-full font-roboto font-semibold text-sm uppercase my-2 text-slate-400">
//                 Step {index + 1}
//               </p>
//               <p className="w-full font-roboto font-semibold text-sm uppercase text-slate-400">
//                 {item.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Step Components */}
//       {current === 1 && (
//         <StepOne formData={stepOneForm} setFormData={setStepOneForm} />
//       )}
//       {current === 2 && (
//         <Insights
//           isForm={true}
//           formData={stepTwoForm}
//           setFormData={setStepTwoForm}
//         />
//       )}
//       {current === 3 && (
//         <Contact formData={stepThreeForm} setFormData={setStepThreeForm} />
//       )}
//       {current === 4 && (
//         <StepFour
//           formData={{
//             ...stepOneForm,
//             pickupDate: stepOneForm.pickupDate
//               ? stepOneForm.pickupDate.toISOString()
//               : new Date().toISOString(),
//             ...stepTwoForm,
//             ...stepThreeForm,
//           }}
//         />
//       )}

//       {/* Navigation Buttons */}
//       <div className="flex justify-between items-center px-[10%] py-3">
//         <button
//           onClick={() => setCurrent(current - 1)}
//           className="disabled:opacity-0 bg-black text-white px-10 py-3 rounded-full"
//           disabled={current === 1}
//         >
//           Back
//         </button>
//         <button
//           onClick={() => setCurrent(current + 1)}
//           className="disabled:opacity-70 disabled:cursor-not-allowed bg-black text-white px-10 py-3 rounded-full"
//           disabled={current === 4}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// // **Fix Dynamic Import (this should wrap the entire component)**
// const BookingPageContent = dynamic(
//   () => Promise.resolve(BookingPageComponent),
//   {
//     ssr: false,
//   }
// );

// export default BookingPageContent;
