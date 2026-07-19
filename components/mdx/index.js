import { PersonaStepper, Persona, Goals, Frustrations } from "./PersonaStepper";
import { ProblemQuote } from "./ProblemQuote";
import { ImageText } from "./ImageText";
import { FullWidthImage } from "./FullWidthImage";

/**
 * MDX component map for next-mdx-remote.
 * These components are available to authors writing MDX in Outstatic.
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

export default mdxComponents;
export {
  PersonaStepper,
  Persona,
  Goals,
  Frustrations,
  ProblemQuote,
  ImageText,
  FullWidthImage,
};
