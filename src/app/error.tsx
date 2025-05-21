"use client";

import Logo from "@/components/Logo";

export default function Error() {
  return (
    <div className="bg-off-white flex h-screen w-full flex-col items-center justify-center gap-4 pb-6">
      <div className="pb-4">
        <Logo />
      </div>
      <h1 className="text-3xl">Oops, something went wrong!</h1>
      <p>The was an issue on the server. Please try again.</p>
    </div>
  );
}
