export default function Loading({ label = 'جاري التحميل...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-slate-950">
      <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-emerald-400 font-medium">{label}</p>
    </div>
  );
}
