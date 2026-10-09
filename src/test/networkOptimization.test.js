import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNetworkAdaptive } from '../hooks/useNetworkAdaptive.js';

describe('Network Adaptive Loading & 100kbps Resilience', () => {
  it('detects default online network status', () => {
    const { result } = renderHook(() => useNetworkAdaptive());
    expect(result.current).toBeDefined();
    expect(typeof result.current.isOnline).toBe('boolean');
    expect(typeof result.current.isLowBandwidth).toBe('boolean');
  });

  it('correctly categorizes 2G and low downlink (<0.35 Mbps) as low bandwidth', () => {
    // Mock navigator.connection
    const originalNavigator = global.navigator;
    global.navigator = {
      ...originalNavigator,
      onLine: true,
      connection: {
        effectiveType: '2g',
        downlink: 0.1, // 100 kbps is 0.1 Mbps
        rtt: 1200,
        saveData: false,
        addEventListener: () => {},
        removeEventListener: () => {}
      }
    };

    const { result } = renderHook(() => useNetworkAdaptive());
    expect(result.current.isLowBandwidth).toBe(true);
    expect(result.current.effectiveType).toBe('2g');
    expect(result.current.downlink).toBe(0.1);

    global.navigator = originalNavigator;
  });

  it('correctly identifies fast 4G connections as non-low-bandwidth', () => {
    const originalNavigator = global.navigator;
    global.navigator = {
      ...originalNavigator,
      onLine: true,
      connection: {
        effectiveType: '4g',
        downlink: 10,
        rtt: 50,
        saveData: false,
        addEventListener: () => {},
        removeEventListener: () => {}
      }
    };

    const { result } = renderHook(() => useNetworkAdaptive());
    expect(result.current.isLowBandwidth).toBe(false);
    expect(result.current.effectiveType).toBe('4g');

    global.navigator = originalNavigator;
  });
});
