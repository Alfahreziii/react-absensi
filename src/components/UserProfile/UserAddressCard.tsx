import Alert from "../ui/alert/Alert";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/services/authService";

export default function UserAddressCard() {
        const [loading, setLoading] = useState(true);
        const [profile, setProfile] = useState({
          alamat_rt005: "",
          alamat_ktp: "",
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
      
        if (loading) return <p>Loading...</p>;
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Address
            </h4>
              {error && (
                <Alert
                  variant="error"
                  title="Error Message"
                  message={error}
                />
              )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Alamat RT 05
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {profile.alamat_rt005}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Alamat KTP
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {profile.alamat_ktp}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
