import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function ForgotPasswordPage() {
  return (
    <Card>
      <h1>Forgot Password</h1>

      <form>
        <Input
          type="email"
          placeholder="Enter your email"
        />

        <br />
        <br />

        <Button>
          Send Reset Link
        </Button>
      </form>
    </Card>
  );
}

export default ForgotPasswordPage;