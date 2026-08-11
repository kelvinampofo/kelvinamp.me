import { createRoute } from "../../../content/route";

const writingRoute = createRoute("writing");

export default writingRoute.EntryPage;
export const generateMetadata = writingRoute.generateMetadata;
export const generateStaticParams = writingRoute.generateStaticParams;

// disable dynamic fallback so unknown slugs immediately 404
export const dynamicParams = false;
