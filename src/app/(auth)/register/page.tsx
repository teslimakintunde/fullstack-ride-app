import RegisterForm from "@/components/register-form/RegisterForm";

const RegisterPage = () => {
  return (
    <section>
      <div className="max-w-[600px] mx-auto py-[100px] px-5">
        <h1 className="lg:text-4xl text-[32px] font-medium text-center font-Abril_Fatface">
          Create Account
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
