import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import Card from "../components/common/Card";

function ProfilePage() {

  const { token } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchProfile = async () => {
    try {

      const response = await axiosClient.get(
        "/auth/me",
        {
          headers,
        }
      );

      setUser(response.data.user);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
    if (!user) {
    return (
      <Card>
        <h2>Loading Profile...</h2>
      </Card>
    );
  }

  return (
    <Card>

      <h1>My Profile</h1>

      <hr />

      <h3>Name</h3>

      <p>{user.name}</p>

      <hr />

      <h3>Email</h3>

      <p>{user.email}</p>

      <hr />

      <h3>Role</h3>

      <p>{user.role}</p>

      <hr />

      <h3>Account Created</h3>

      <p>
        {new Date(user.createdAt).toLocaleString()}
      </p>

      <hr />
            <h3>User ID</h3>

      <p
        style={{
          wordBreak: "break-all",
        }}
      >
        {user._id}
      </p>

      <hr />

    </Card>
  );
}

export default ProfilePage;