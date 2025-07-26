import { useEffect, useState } from "react";
import Alert from "../ui/alert/Alert";
import { getProfile } from "../../api/services/authService";

export default function UserInfoCard() {
      const [loading, setLoading] = useState(true);
      const [profile, setProfile] = useState({
        tanggal_lahir: "",
        tempat_lahir: "",
        nomor_kk: "",
        nomor_nik: "",
        jenis_kelamin: "",
        pekerjaan: "",
      });
      const [error, setError] = useState("");
    
      useEffect(() => {
        const fetchProfile = async () => {
          try {
            const res = await getProfile();
            const data = res.data;

            // Jika tanggal_lahir ada, format dulu ke YYYY-MM-DD
            const formattedTanggalLahir = data.tanggal_lahir
              ? data.tanggal_lahir.split('T')[0]
              : '';

            setProfile({
              ...data,
              tanggal_lahir: formattedTanggalLahir,
            });
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
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>
            {error && (
              <Alert
                variant="error"
                title="Error Message"
                message={error}
               />
              )}

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Tanggal Lahir
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {profile.tanggal_lahir}
              </p>
            </div>


            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Tempat Lahir
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {profile.tempat_lahir}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nomor KK
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {profile.nomor_kk}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nomor NIK
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {profile.nomor_nik}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Jenis Kelamin
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {profile.jenis_kelamin}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Pekerjaan
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {profile.pekerjaan}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
