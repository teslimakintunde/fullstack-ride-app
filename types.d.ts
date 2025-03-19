// Step 1: Pickup and Destination Details

type CustomLocation = {
  lat: number;
  lng: number;
  address: string;
  coordinates?: [number, number]; // Optional to avoid strict errors
};

export type StepOneFormData = {
  // pickupDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  pickupTime: string;
  persons: string;
  pickupLocation: CustomLocation | null;
  destinationLocation: CustomLocation | null;
  activeMode: "source" | "destination";
};

// Step 2: Car Selection
export type StepTwoFormData = {
  imgUrl: string;
  title: string;
  desc: string;
  price: string;
  carSlug: string;
};

// Step 3: Contact Information
export type StepThreeFormData = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  comment: string;
};

export type CarOption = {
  imgUrl: string;
  title: string;
  desc: string;
  price: string;
  slug: string;
};

// Step 4: Order Summary
export type StepFourFormData = StepOneFormData &
  StepTwoFormData &
  StepThreeFormData;

// Define the Order type
interface Order {
  imgUrl: string;
  title: string;
  desc: string;
  price: number;
  startDate: Date; // Updated from pickupDate
  endDate: Date; // New field
  pickupTime: string;
  persons: number;
  pickupLocation: JsonValue; // Use JsonValue instead of CustomLocation
  destinationLocation: JsonValue; // Use JsonValue instead of CustomLocation
  userEmail: string;
  carSlug: string;
  comment: string;
  phoneNumber: string;
}
