import React from 'react';

export const MobileShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex justify-center">
      <main className="w-full max-w-md bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 shadow-2xl relative flex flex-col">
        {children}
      </main>
    </div>
  );
};
