import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Play, Info, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button.jsx';

export function MarkdownRendererComponent({ content = '', onTryCode }) {
  return (
    <div className="prose-bytelab">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          // Code blocks with "Try It Yourself" interactive button
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeText = String(children).replace(/\n$/, '');

            if (!inline && match) {
              return (
                <div className="my-6 rounded-[14px] bg-[#1d1d1f] text-[#f5f5f7] border border-white/10 overflow-hidden shadow-sm not-prose">
                  <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
                    <span className="text-[12px] font-mono text-[#a1a1a6] uppercase">{match[1]}</span>
                    {onTryCode && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onTryCode(codeText, match[1])}
                        className="py-1 px-3 text-[12px]"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Try It Yourself</span>
                      </Button>
                    )}
                  </div>
                  <pre className="p-4 overflow-x-auto text-[14px] leading-relaxed font-mono">
                    <code>{codeText}</code>
                  </pre>
                </div>
              );
            }

            return (
              <code className="px-1.5 py-0.5 rounded-[5px] bg-[#f5f5f7] text-[#0066cc] font-mono text-[14px] border border-[#e0e0e0]/60" {...props}>
                {children}
              </code>
            );
          },

          // Blockquote / Alerts
          blockquote({ node, children, ...props }) {
            const childrenArray = React.Children.toArray(children);
            const rawText = childrenArray.map(c => c?.props?.children || '').flat().join(' ');

            let alertType = 'note';
            if (rawText.includes('[!WARNING]')) alertType = 'warning';
            else if (rawText.includes('[!TIP]')) alertType = 'tip';
            else if (rawText.includes('[!IMPORTANT]')) alertType = 'important';

            const cleanChildren = React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  children: React.Children.map(child.props.children, textNode => {
                    if (typeof textNode === 'string') {
                      return textNode.replace(/\[!(NOTE|TIP|WARNING|IMPORTANT)\]/g, '').trim();
                    }
                    return textNode;
                  })
                });
              }
              return child;
            });

            const alertStyles = {
              note: 'bg-blue-50/80 border-blue-400 text-blue-950',
              tip: 'bg-emerald-50/80 border-emerald-400 text-emerald-950',
              warning: 'bg-amber-50/80 border-amber-400 text-amber-950',
              important: 'bg-purple-50/80 border-purple-400 text-purple-950'
            };

            const alertIcons = {
              note: <Info className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />,
              tip: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
              warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
              important: <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            };

            return (
              <div className={`my-5 p-4 rounded-[12px] border-l-4 flex items-start gap-3 text-[15px] ${alertStyles[alertType]}`}>
                {alertIcons[alertType]}
                <div className="flex-1 leading-relaxed">{cleanChildren}</div>
              </div>
            );
          },

          // Tables
          table({ node, ...props }) {
            return (
              <div className="my-6 overflow-x-auto rounded-[12px] border border-[#e0e0e0]">
                <table className="w-full text-[14px]" {...props} />
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

export const MarkdownRenderer = React.memo(MarkdownRendererComponent);
