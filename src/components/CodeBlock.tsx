"use client";

import { Highlight, themes, Language } from "prism-react-renderer";

type CodeBlockProps = {
  children: string;
  lang?: Language;
};

export default function CodeBlock({ children, lang = "javascript" }: CodeBlockProps) {
  return (
    <Highlight
      code={children.trim()}
      language={lang}
      // The theme prop is now required.
      // You can choose any theme, e.g., themes.github, themes.dracula, etc.
      theme={themes.vsDark}
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto font-mono text-sm">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}