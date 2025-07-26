import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/services/authService";
import { updateProfile } from '../../api/services/userService';

import Alert from "../ui/alert/Alert";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(true);
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

        setForm({
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


  const [form, setForm] = useState({
    name: '',
    nomor_kk: '',
    nomor_nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    pekerjaan: '',
    alamat_rt005: '',
    alamat_ktp: '',
    status: '',

    role: '',
    email: '',
    // tambahkan field lain sesuai kebutuhan
  });
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await updateProfile(form);
      setMessage(res.message || 'Profile updated!');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {form.name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {form.role}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {form.email}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {form.status}
                </p>
              </div>
            </div>

          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            <span className="block w-20">
              Edit Profile
            </span>
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
              {error && (
              <Alert
                variant="error"
                title="Error Message"
                message={error}
               />
              )}
              {message && (
              <Alert
                variant="success"
                title="Succes"
                message={message}
               />
              )}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Full Name</Label>
                    <Input type="text" name="name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email</Label>
                    <Input type="text" name="email" value={form.email} onChange={handleChange} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nomor KK</Label>
                    <Input type="text" name="nomor_kk" value={form.nomor_kk} onChange={handleChange}  />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nomor NIK</Label>
                    <Input type="text" name="nomor_nik" value={form.nomor_nik} onChange={handleChange}  />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Tempat Lahir</Label>
                    <Input type="text" name="tempat_lahir" value={form.tempat_lahir} onChange={handleChange}  />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Tanggal Lahir</Label>
                   

                    <Input type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleChange} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Jenis Kelamin</Label>
                    <Select
                      defaultValue={form.jenis_kelamin}
                      onChange={(value) =>
                        setForm({ ...form, jenis_kelamin: value })
                      }
                      options={[
                        { value: "L", label: "Laki-laki" },
                        { value: "P", label: "Perempuan" },
                      ]}
                      placeholder="-- Pilih Jenis Kelamin --"
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Pekerjaan</Label>
                    <Input type="text" name="pekerjaan" value={form.pekerjaan} onChange={handleChange} />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Status</Label>
                    <Input type="text" name="status" value={form.status} onChange={handleChange} />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Alamat RT 05</Label>
                    <Input type="text" name="alamat_rt005" value={form.alamat_rt005} onChange={handleChange} />
                  </div>

                  <div className="col-span-2">
                    <Label>Alamat KTP</Label>
                    <Input type="text" name="tanggal_lahir" value={form.alamat_ktp} onChange={handleChange}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
