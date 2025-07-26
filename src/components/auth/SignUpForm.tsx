import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Alert from "../ui/alert/Alert";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import api from "../../api/lib/axios";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
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
        name,
        email,
        password,
        role: 'user',
      });

      setSuccessMessage(response.data.message || 'Registration successful!');
      setName('');
      setEmail('');
      setPassword('');
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
              <div>
                <Label>Full Name<span className="text-error-500">*</span></Label>
                <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
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

              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} className="w-5 h-5" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  By creating an account, you agree to the{" "}
                  <span className="text-gray-800 dark:text-white/90">Terms and Conditions</span> and{" "}
                  <span className="text-gray-800 dark:text-white">Privacy Policy</span>.
                </p>
              </div>

              {errorMessage && (
                <Alert variant="error" title="Error Message" message={errorMessage} />
              )}

              {successMessage && (
                <Alert variant="success" title="Success!" message={successMessage} />
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 disabled:bg-gray-400"
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-gray-700 dark:text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-cyan-500 hover:text-cyan-600 dark:text-cyan-400">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
