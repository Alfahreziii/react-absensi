import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Alert from "../ui/alert/Alert";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import api from '../../api/lib/axios';

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Semua field form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nomorKK, setNomorKK] = useState('');
  const [nomorNIK, setNomorNIK] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [pekerjaan, setPekerjaan] = useState('');
  const [status, setStatus] = useState('');
  const [alamatRT005, setAlamatRT005] = useState('');
  const [alamatKTP, setAlamatKTP] = useState('');
  const [agama, setAgama] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi semua input wajib diisi
    if (
      !name || !email || !password || !nomorKK || !nomorNIK ||
      !tempatLahir || !tanggalLahir || !jenisKelamin || !pekerjaan || !status || !agama ||
      (!alamatRT005 && !alamatKTP) // salah satu harus diisi
    ) {
      setErrorMessage('Please fill in all required fields. Either Alamat RT 005 or Alamat KTP must be filled.');
      return;
    }

    if (!isChecked) {
      setErrorMessage('You must agree to the Terms and Conditions.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/register', {
        name: name,
        email,
        password,
        nomor_kk: nomorKK,
        nomor_nik: nomorNIK,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tanggalLahir,
        jenis_kelamin: jenisKelamin,
        pekerjaan,
        status,
        alamat_rt005: alamatRT005,
        alamat_ktp: alamatKTP,
        agama,
        role: 'user',
      });
setSuccessMessage(response.data.message);


      // Reset semua form fields
      setAgama('');
      setName('');
      setEmail('');
      setPassword('');
      setNomorKK('');
      setNomorNIK('');
      setTempatLahir('');
      setTanggalLahir('');
      setJenisKelamin('');
      setPekerjaan('');
      setStatus('');
      setAlamatRT005('');
      setAlamatKTP('');
      setIsChecked(false);
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Registration failed.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your information to sign up!
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
            {step === 1 && (
              <>
                <div>
                  <Label>Full Name<span className="text-error-500">*</span></Label>
                  <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="First name" />
                </div>

                <div>
                  <Label>Email<span className="text-error-500">*</span></Label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                </div>

                <div>
                  <Label>Password<span className="text-error-500">*</span></Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />}
                    </span>
                  </div>
                </div>
                {errorMessage&& (
                  <Alert
                    variant="error"
                    title="Error Message"
                    message={errorMessage}
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (!name || !email || !password) {
                      setErrorMessage('Please fill in all required fields.');
                      return;
                    }
                    if (!/\S+@\S+\.\S+/.test(email)) {
                      setErrorMessage('Please enter a valid email.');
                      return;
                    }

                    if (password.length < 8) {
                      setErrorMessage('Password must be at least 8 characters.');
                      return;
                    }
                    setErrorMessage('');
                      nextStep();
                  }}
                  className="w-full py-3 text-white bg-cyan-500 rounded-lg hover:bg-cyan-600"
                  >
                    Next
                  </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <Label>Nomor KK<span className="text-error-500">*</span></Label>
                  <Input type="text" value={nomorKK} onChange={e => setNomorKK(e.target.value)} placeholder="Nomor KK" />
                </div>

                <div>
                  <Label>Nomor NIK<span className="text-error-500">*</span></Label>
                  <Input type="text" value={nomorNIK} onChange={e => setNomorNIK(e.target.value)} placeholder="Nomor NIK" />
                </div>

                <div>
                  <Label>Tempat Lahir<span className="text-error-500">*</span></Label>
                  <Input type="text" value={tempatLahir} onChange={e => setTempatLahir(e.target.value)} placeholder="Tempat Lahir" />
                </div>

                <div>
                  <Label>Tanggal Lahir<span className="text-error-500">*</span></Label>
                  <Input type="date" value={tanggalLahir} onChange={e => setTanggalLahir(e.target.value)} />
                </div>

                <div>
                  <Label>Jenis Kelamin<span className="text-error-500">*</span></Label>
                  <select
                    value={jenisKelamin}
                    onChange={e => setJenisKelamin(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="" disabled>Select jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                {errorMessage&& (
                  <Alert
                    variant="error"
                    title="Error Message"
                    message={errorMessage}
                  />
                )}
                <div className="flex gap-3">
                  <button
                      type="button"
                      onClick={prevStep}
                      className="w-full py-3 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800"
                    >
                      Previous
                    </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!nomorKK || !nomorNIK || !tempatLahir || !tanggalLahir || !jenisKelamin) {
                        setErrorMessage('Please fill in all required fields.');
                        return;
                      }
                      setErrorMessage('');
                      nextStep();
                    }}
                    className="w-full py-3 text-white bg-cyan-500 rounded-lg hover:bg-cyan-600"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div>
                  <Label>Agama<span className="text-error-500">*</span></Label>
                  <Input type="text" value={agama} onChange={e => setAgama(e.target.value)} placeholder="Agama" />
                </div>

                <div>
                  <Label>Pekerjaan<span className="text-error-500">*</span></Label>
                  <Input type="text" value={pekerjaan} onChange={e => setPekerjaan(e.target.value)} placeholder="Pekerjaan" />
                </div>

                <div>
                  <Label>Status dalam hubungan keluarga<span className="text-error-500">*</span></Label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="" disabled>Pilih status</option>
                    <option value="kepala keluarga">Kepala Keluarga</option>
                    <option value="suami">Suami</option>
                    <option value="istri">Istri</option>
                    <option value="anak">Anak</option>
                    <option value="menantu">Menantu</option>
                    <option value="orang tua">Orang Tua</option>
                    <option value="mertua">Mertua</option>
                    <option value="cucu">Cucu</option>
                    <option value="family lain">Family Lain</option>
                    <option value="ART(Asisten Rumah Tangga)">ART (Asisten Rumah Tangga)</option>
                    <option value="pekerja">Pekerja</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <Label>Alamat RT 005<span className={alamatKTP ? "" : "text-error-500"}>*</span></Label>
                  <Input
                    type="text"
                    value={alamatRT005}
                    onChange={e => setAlamatRT005(e.target.value)}
                    placeholder="Alamat RT 005"
                  />
                </div>

                <div>
                  <Label>Alamat KTP (Diisi bila beralamat di luar RT.005)<span className={alamatRT005 ? "" : "text-error-500"}>*</span></Label>
                  <Input
                    type="text"
                    value={alamatKTP}
                    onChange={e => setAlamatKTP(e.target.value)}
                    placeholder="Alamat KTP"
                  />
                </div>


                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} className="w-5 h-5" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    By creating an account, you agree to the <span className="text-gray-800 dark:text-white/90">Terms and Conditions</span> and <span className="text-gray-800 dark:text-white">Privacy Policy</span>.
                  </p>
                </div>
                {successMessage && (
                  <Alert
                    variant="success"
                    title="Registration successful! Please Check Your Email."
                    message={successMessage}
                  />
                )}
                {errorMessage&& (
                <Alert
                  variant="error"
                  title="Error Message"
                  message={errorMessage}
                />
                )}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full py-3 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 disabled:bg-gray-400"
                  >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </button>
                </div>
              </>
            )}
            </div>
          </form>
          <p className="mt-5 text-center text-gray-700 dark:text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/signin" className="text-cyan-500 hover:text-cyan-600 dark:text-cyan-400">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
