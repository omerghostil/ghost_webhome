"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TryGhostButton } from "./try-ghost-button";
import { TryGhostModal } from "./try-ghost-modal";

export function TryGhostWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClose = (redirectToAcademy?: boolean) => {
    setIsOpen(false);
    if (redirectToAcademy) {
      router.push("/academy");
    }
  };

  return (
    <>
      <TryGhostButton onClick={() => setIsOpen(true)} />
      {isOpen && <TryGhostModal onClose={handleClose} />}
    </>
  );
}
