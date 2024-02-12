import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data }: any = useSession();
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Hello, {(data && data?.user.fullname) || data?.user.name}</p>
    </div>
  );
};

export default ProfilePage;
