"use client";

import { useEffect, useState } from "react";
import { CompressIcon, ExpandIcon } from "@/components/icons";

type Labels = {
  enter: string;
  exit: string;
};

export default function FullscreenToggle({ labels }: { labels: Labels }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement !== null);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isFullscreen ? labels.exit : labels.enter}
      className="text-muted hover:text-foreground transition-colors p-1"
    >
      {isFullscreen ? <CompressIcon className="h-4 w-4" /> : <ExpandIcon className="h-4 w-4" />}
    </button>
  );
}
