import { createContentRoute } from "../../../utils/content-route";

const craftRoute = createContentRoute("craft");

export default craftRoute.ContentPage;
export const generateMetadata = craftRoute.generateMetadata;
export const generateStaticParams = craftRoute.generateStaticParams;

// disable dynamic fallback so unknown slugs immediately 404
export const dynamicParams = false;
