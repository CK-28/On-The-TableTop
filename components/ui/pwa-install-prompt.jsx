'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (isStandalone) return null;

  if (isIOS) {
    return (
      <div className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <h3 className="font-semibold mb-2">Install this App</h3>
        <p className="text-sm mb-3">Tap the share icon → “Add to Home Screen”</p>
      </div>
    );
  }

  if (showInstall && (deferredPrompt)) {
    return (
      <button
        onClick={async () => {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          toast[outcome === 'accepted' ? 'success' : 'info'](`User ${outcome} install`);
          setShowInstall(false);
        }}
        className="fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
      >
        Install Our App!
      </button>
    );
  }

  return null;
}