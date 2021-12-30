/**
 *
 * OfflineWarning
 *
 */

import React, { useState, useEffect, memo } from 'react';
import './OfflineWarning.scss';

export const OfflineWarning = () => {
  const [isOffline, setIsOffline] = useState(false);

  const updateOnlineStatus = () => {
    setIsOffline(!navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return isOffline ? (
    <div className="offline-warning-wrap">
      Warning! No Internet detected. The app is currently serving cached data.
    </div>
  ) : null;
};

export default memo(OfflineWarning);
