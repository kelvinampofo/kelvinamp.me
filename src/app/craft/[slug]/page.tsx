import { createRoute } from "../../../content/route";

const craftRoute = createRoute("craft");

export default craftRoute.EntryPage;
export const generateMetadata = craftRoute.generateMetadata;
export const generateStaticParams = craftRoute.generateStaticParams;

// disable dynamic fallback so unknown slugs immediately 404
export const dynamicParams = false;
