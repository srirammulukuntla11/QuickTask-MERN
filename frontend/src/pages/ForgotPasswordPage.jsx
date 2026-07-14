import { Link } from "react-router-dom";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function ForgotPasswordPage() {
  return (
    <Card>
      <div className="text-center mb-8">

        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
          <span className="text-3xl text-white">
            🔒
          </span>
        </div>

        <h1 className="text-4xl font-bold text-slate-800">
          Forgot Password
        </h1>

        <p className="text-gray-500 mt-3">
          Enter your registered email to receive a password reset link.
        </p>

      </div>

      <form className="space-y-5">

        <Input
          type="email"
          placeholder="Enter your email address"
        />

        <Button>
          Send Reset Link
        </Button>

      </form>

      <div className="mt-8 border-t pt-6 text-center">

        <Link
          to="/"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Login
        </Link>

      </div>

    </Card>
  );
}

export default ForgotPasswordPage;