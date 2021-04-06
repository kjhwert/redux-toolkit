import React from "react";
import { useAppSelector } from "../../app/hooks";
import { profileShow } from "./profileSlice";
import { Redirect } from "react-router-dom";

const Profile = () => {
  const profile = useAppSelector(profileShow);

  if (!profile) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>로그인 사용자</h1>
      <p>{profile.id}</p>
      <p>{profile.email}</p>
      <p>{profile.fieldCareer}</p>
    </div>
  );
};

export default Profile;
