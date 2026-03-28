"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TryGhostButton } from "./try-ghost-button";
import { TryGhostModal } from "./try-ghost-modal";
import { MobileBottomNav } from "./mobile-bottom-nav";

const HIDDEN_ROUTES = ["/neweb"];

export function TryGhostWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = (redirectToAcademy?: boolean) => {
    setIsOpen(false);
    if (redirectToAcademy) {
      router.push("/academy");
    }
  };

  if (HIDDEN_ROUTES.includes(pathname)) return null;

  return (
    <>
      <TryGhostButton onClick={() => setIsOpen(true)} />
      <MobileBottomNav onTryGhost={() => setIsOpen(true)} />
      {isOpen && <TryGhostModal onClose={handleClose} />}
    </>
  );
}
