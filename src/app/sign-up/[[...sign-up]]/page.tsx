import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return (
      <div className="w-screen h-screen flex justify-center ">
        <SignUp
          className=""
          afterSignUpUrl="/new-user"
          forceRedirectUrl="/new-user"
        />
      </div>
    );
}

export default SignUpPage