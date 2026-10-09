import { useState, useEffect } from 'react';

/**
 * Hook to detect connection speed and low-bandwidth (e.g. 100kbps 2G/3G) conditions
 * allowing the UI to adaptively defer heavy non-critical assets and reduce animation overhead.
 */
export function useNetworkAdaptive() {
  const [networkStatus, setNetworkStatus] = useState(() => {
    const nav = typeof navigator !== 'undefined' ? navigator : null;
    const conn = nav?.connection || nav?.mozConnection || nav?.webkitConnection;
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

    const effectiveType = conn?.effectiveType || '4g';
    const saveData = Boolean(conn?.saveData);
    const downlink = typeof conn?.downlink === 'number' ? conn.downlink : 10;
    const rtt = typeof conn?.rtt === 'number' ? conn.rtt : 50;

    // Treat 'slow-2g', '2g', downlink < 0.35 Mbps, or rtt > 800ms as low-bandwidth (100kbps tier)
    const isLowBandwidth = effectiveType === '2g' || effectiveType === 'slow-2g' || downlink < 0.35 || rtt > 800 || saveData;

    return {
      isOnline,
      isLowBandwidth,
      effectiveType,
      saveData,
      downlink,
      rtt
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

    const nav = navigator;
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;

    const updateStatus = () => {
      const isOnline = nav.onLine;
      const effectiveType = conn?.effectiveType || '4g';
      const saveData = Boolean(conn?.saveData);
      const downlink = typeof conn?.downlink === 'number' ? conn.downlink : 10;
      const rtt = typeof conn?.rtt === 'number' ? conn.rtt : 50;

      const isLowBandwidth = effectiveType === '2g' || effectiveType === 'slow-2g' || downlink < 0.35 || rtt > 800 || saveData;

      setNetworkStatus({
        isOnline,
        isLowBandwidth,
        effectiveType,
        saveData,
        downlink,
        rtt
      });
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    if (conn) {
      conn.addEventListener('change', updateStatus);
    }

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
      if (conn) {
        conn.removeEventListener('change', updateStatus);
      }
    };
  }, []);

  return networkStatus;
}
