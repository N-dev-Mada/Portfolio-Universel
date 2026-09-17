export default function AmbientBackground() {
  return (
    <div aria-hidden="true">
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-[rgb(var(--acc-1)/0.1)] rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-0 translate-x-1/3 w-[600px] h-[600px] bg-[rgb(var(--acc-2)/0.1)] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[450px] h-[450px] bg-[rgb(var(--acc-3)/0.08)] rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
}
