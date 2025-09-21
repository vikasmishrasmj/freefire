import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/auth/authSlice.js";
import "../style/ProfilePage.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user]);

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      {loading && <p>Loading profile...</p>}
      {error && <p className="error">{error}</p>}

      {user ? (
        <div className="profile-card">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Free Fire ID:</strong> {user.freefireId}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        !loading && <p className="profile-card">No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
