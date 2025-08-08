export default function StatusBar() {
  return (
    <div className="h-11 bg-black text-white flex items-center justify-between px-6">
      <div className="text-sm font-semibold">9:41</div>
      <div className="flex items-center gap-1">
        <div className="w-4 h-2 bg-white rounded-sm"></div>
        <div className="w-4 h-2 bg-white rounded-sm"></div>
        <div className="w-4 h-2 bg-white rounded-sm"></div>
      </div>
    </div>
  );
}
