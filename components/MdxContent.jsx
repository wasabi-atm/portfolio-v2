import { MDXRemote } from "next-mdx-remote/rsc";
import { PersonaStepper, Persona, Goals, Frustrations } from "@/components/mdx/PersonaStepper";
import { ProblemQuote } from "@/components/mdx/ProblemQuote";
import { ImageText } from "@/components/mdx/ImageText";
import { FullWidthImage } from "@/components/mdx/FullWidthImage";

/**
 * MDX component map.
 * Client components (with useState/useEffect) work here because
 * next-mdx-remote/rsc handles the serialization boundary automatically.
 */
const mdxComponents = {
  PersonaStepper,
  Persona,
  Goals,
  Frustrations,
  ProblemQuote,
  ImageText,
  FullWidthImage,
};

/**
 * Server-side MDX renderer for Next.js App Router.
 * Renders raw MDX source string with custom components.
 * Must be used inside an async server component.
 */
export default function MdxRenderer({ source }) {
  return <MDXRemote source={source} components={mdxComponents} />;
}
