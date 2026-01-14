// app/_components/AmplitudeProvider.tsx
'use client';

import Script from 'next/script';

const AMPLITUDE_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_KEY;

export default function AmplitudeProvider() {
	if (!AMPLITUDE_KEY) return null;

	return (
		<>
			{/* Amplitude Loader Script */}
			<Script src={`https://cdn.amplitude.com/Script/${AMPLITUDE_KEY}.js`} strategy="afterInteractive" />

			{/* Init Script */}
			<Script id="amplitude-init" strategy="afterInteractive">
				{`
          if (window.amplitude && !window.__AMPLITUDE_INITIALIZED__) {
            window.__AMPLITUDE_INITIALIZED__ = true;

            if (window.sessionReplay) {
              window.amplitude.add(
                window.sessionReplay.plugin({ sampleRate: 1 })
              );
            }

            window.amplitude.init(
              "${AMPLITUDE_KEY}",
              {
                fetchRemoteConfig: true,
                autocapture: {
                  attribution: true,
                  fileDownloads: true,
                  formInteractions: true,
                  pageViews: true,
                  sessions: true,
                  elementInteractions: true,
                  networkTracking: true,
                  webVitals: true,
                  frustrationInteractions: true
                }
              }
            );
          }
        `}
			</Script>
		</>
	);
}
