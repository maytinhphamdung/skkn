
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      className="prose prose-sm sm:prose-base max-w-none text-gray-800"
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom component for code blocks to add Tailwind styles
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <pre className="p-3 my-2 bg-gray-700 text-gray-50 rounded-md overflow-x-auto text-sm">
              <code className={`language-${match[1]}`} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded-md text-sm" {...props}>
              {children}
            </code>
          );
        },
        // Custom component for paragraphs to ensure good spacing
        p: ({ node, ...props }) => <p className="mb-2" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
