import SignInForm from "./form";

export default function signInPage() {
  return (
    <main>
      <div className="w-fit mx-auto my-12">
        <h1 className="text-2xl mb-6 text-center">Sign In</h1>
        <SignInForm />
      </div>
    </main>
  );
}
