import { Link } from "react-router-dom";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function ResetPasswordPage() {
  return (
    <Card>

      <div className="text-center mb-8">

        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
          <span className="text-3xl text-white">
            🔑
          </span>
        </div>

        <h1 className="text-4xl font-bold text-slate-800">
          Reset Password
        </h1>

        <p className="text-gray-500 mt-3">
          Create a new secure password for your account.
        </p>

      </div>

      <form className="space-y-5">

        <Input
          type="password"
          placeholder="New Password"
        />

        <Input
          type="password"
          placeholder="Confirm New Password"
        />

        <Button>
          Reset Password
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

export default ResetPasswordPage;