import InputForm from "../inputform/InputForm";

// Define the types for formData
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  comment: string;
}

// Define the props type for the Contact component
interface ContactProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Contact: React.FC<ContactProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 mx-10 md:mx-[10%] my-10">
        <form className="w-full bg-white p-5 shadow-md border">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputForm
                id="firstname"
                label="First Name"
                name="firstname"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputForm
                id="lastname"
                label="Last Name"
                name="lastname"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputForm
                id="email"
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputForm
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                type="number"
                placeholder="Enter your Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <InputForm
                id="comment"
                label="Comment"
                name="comment"
                type="text"
                placeholder="Enter a Comment"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
