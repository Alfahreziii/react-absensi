import { useEffect, useState } from "react";
import { getProfile } from "../api/services/authService";
import Input from "./form/input/InputField";
import Button from "./ui/button/Button";
import Label from "./form/Label";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data); // asumsi respon: { data: { name, email } }
      } catch (err: any) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // tambahkan nanti fungsi update ke API jika backend sudah mendukung update
    alert("Fitur update profile coming soon!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded shadow">
      <h1 className="mb-4 text-xl font-bold">Your Profile</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input name="name" value={profile.name} onChange={handleChange} />
        </div>
        <div>
          <Label>Email</Label>
          <Input name="email" value={profile.email} onChange={handleChange} disabled />
        </div>
        <div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
