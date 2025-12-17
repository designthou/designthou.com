import GoogleAnalyticsReport from "@/lib/ga4/GoogleAnalyticsReport";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default function SuspenseGoogleAnalyticsReport() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoogleAnalyticsReport />
    </HydrationBoundary>
  );
}
