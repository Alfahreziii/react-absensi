import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/plugins/monthSelect/style.css";

type PropsType = {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (selectedDates: Date[], dateStr: string) => void;
  mode?: "default" | "month"; // Tambahan
};

export default function DatePicker({
  id,
  label,
  placeholder,
  value,
  disabled,
  onChange,
  mode = "default", // default = pilih tanggal lengkap
}: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const config: flatpickr.Options.Options = {
      dateFormat: mode === "month" ? "Y-m" : "Y-m-d",
      onChange,
    };

    if (mode === "month") {
      config.plugins = [
        new (monthSelectPlugin as any)({
          shorthand: true,
          dateFormat: "Y-m",
          altFormat: "F Y",
        })
      ];
    }

    pickerRef.current = flatpickr(inputRef.current, config);

    return () => {
      pickerRef.current?.destroy?.();
    };
  }, []);

  useEffect(() => {
    if (pickerRef.current && value) {
      pickerRef.current.setDate(value, false);
    }
  }, [value]);

  return (
    <div>
      {label && <label htmlFor={id} className="block mb-1 font-medium text-sm">
        {label}
      </label>}
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded border px-4 py-2"
        />
      </div>
    </div>
  );
}
