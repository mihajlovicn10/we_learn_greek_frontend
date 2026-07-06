/**
 * Centered auth card on light blue-white background — for Login / Register.
 */
function AuthLayout({ title, children, footer }) {
  return (
    <div className="flex flex-1 flex-col bg-brand-50">
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:py-12">
        <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-card-md sm:p-8">
          {title && (
            <h1 className="mb-8 text-center font-display text-2xl font-bold text-brand-900 sm:text-3xl">
              {title}
            </h1>
          )}
          {children}
          {footer}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
