import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "./mdx-elements";

type MDXContentProps = {
  source: string;
};

export async function MDXContent({ source }: MDXContentProps) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    format: "mdx",
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          keepBackground: false,
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
        },
      ],
    ],
  });

  return <Content components={mdxComponents} />;
}
