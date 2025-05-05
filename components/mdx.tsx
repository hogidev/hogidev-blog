'use client'

import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CustomMDX({ content }: { content: string }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code: any) => {
    void navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="prose dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Customize how code blocks are rendered
          "pre"({ node, children, ...props }) {
            return <div {...props}>{children}</div>; // Use a <div> for <pre> blocks to prevent <p> wrapping
          },
          "code"({ className, children }) {
            const code = String(children).trim();

            return (
              <div className="code-block-wrapper relative border border-gray-200/50 rounded-md">
                <button
                  title="Copy to clipboard"
                  onClick={() => handleCopy(code)}
                  className="copy-button p-1 rounded-md bg-zinc-600/50 text-gray-200 text-xs flex gap-1"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '16px', width: '16px' }}>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  {copiedCode && 'Copied!'}
                </button>
                {/* Code Block */}
                <pre className="text-gray-100 text-sm m-0 p-4 rounded-md" style={{backgroundColor: '#24292e'}}>
                  <code className={className}>{code}</code>
                </pre>
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}