export default function AdminJobActions() {
  return (
    <div className="rounded-lg bg-white p-4 shadow-xs">
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-md bg-green-500 px-4 py-2 text-white transition-all duration-300 hover:rounded hover:bg-green-600"
        >
          Complete the Job
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white transition-all duration-300 hover:rounded hover:bg-red-600"
        >
          Cancel the Job
        </button>
      </div>
      <div>

      </div>
    </div>
  );
}
