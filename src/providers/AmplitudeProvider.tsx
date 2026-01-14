// app/_components/AmplitudeProvider.tsx
'use client';

import Script from 'next/script';

const AMPLITUDE_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_KEY;

export default function AmplitudeProvider() {
	if (!AMPLITUDE_KEY) return null;

	return (
		<>
			<Script src="https://cdn.amplitude.com/libs/analytics-browser-2.11.1-min.js.gz" strategy="afterInteractive" />
			<Script src="https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.25.0-min.js.gz" strategy="afterInteractive" />
			<Script id="amplitude-init" strategy="afterInteractive">
				{`
          if (window.amplitude && !window.__AMPLITUDE_INITIALIZED__) {
            window.__AMPLITUDE_INITIALIZED__ = true;

            window.amplitude.add(
              window.sessionReplay.plugin({ sampleRate: 1 })
            );

            window.amplitude.init(
              ${AMPLITUDE_KEY},
              {
                autocapture: {
                  elementInteractions: true
                }
              }
            );
          }
        `}
			</Script>
		</>
	);
}
