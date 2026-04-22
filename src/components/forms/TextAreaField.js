import FormError from "@/components/forms/FormError";

export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  rows = 5,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <textarea
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-cyan-700"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
      <FormError message={error} />
    </label>
  );
}
