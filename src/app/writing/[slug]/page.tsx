import { createContentRoute } from "../../../utils/content-route";

const writingRoute = createContentRoute("writing");

export default writingRoute.ContentPage;
export const generateMetadata = writingRoute.generateMetadata;
export const generateStaticParams = writingRoute.generateStaticParams;

// disable dynamic fallback so unknown slugs immediately 404
export const dynamicParams = false;
