import { SignupForm } from "@/components";

export default async function SignUpPage() {
  return (
    <>
      <h2 className="font-bold text-base text-center sm:text-2xl">
        Create your Designthou account
      </h2>
      <SignupForm />
    </>
  );
}
