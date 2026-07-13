import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function ResetPasswordPage() {
  return (
    <Card>
      <h1>Reset Password</h1>

      <form>
        <Input
          type="password"
          placeholder="New Password"
        />

        <br />
        <br />

        <Input
          type="password"
          placeholder="Confirm Password"
        />

        <br />
        <br />

        <Button>
          Reset Password
        </Button>
      </form>
    </Card>
  );
}

export default ResetPasswordPage;