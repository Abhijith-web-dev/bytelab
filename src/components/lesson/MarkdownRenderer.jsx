import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Play, Info, AlertTriangle, Lightbulb, CheckCircle2, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button.jsx';

function CodeBlockWithActions({ codeText, language, onTryCode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy code', err);
    }
  };

  return (
    <div className="my-6 rounded-[14px] bg-[#17171c] text-[#f4f4f5] border border-[#2e2e38] overflow-hidden shadow-xs not-prose">
      <div className="px-4 py-2.5 bg-[#212128] border-b border-[#2e2e38] flex items-center justify-between">
        <span className="text-[12px] font-mono font-medium text-[#a1a1aa] uppercase tracking-wider">
          {language || 'code'}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 text-[12px] font-medium text-[#d4d4d8] hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 cursor-pointer"
            aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          {onTryCode && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onTryCode(codeText, language)}
              className="py-1 px-3 text-[12px] h-auto font-medium"
              aria-label="Run code in interactive sandbox"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Run Code</span>
            </Button>
          )}
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-[13.5px] leading-relaxed font-mono selection:bg-[#ff7759]/30">
        <code>{codeText}</code>
      </pre>
    </div>
  );
}

export function MarkdownRendererComponent({ content = '', onTryCode }) {
  return (
    <div className="prose-bytelab text-[#17171c]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          // Code blocks with "Try It Yourself" interactive button + Copy button
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeText = String(children).replace(/\n$/, '');

            if (!inline && match) {
              return (
                <CodeBlockWithActions
                  codeText={codeText}
                  language={match[1]}
                  onTryCode={onTryCode}
                />
              );
            }

            return (
              <code className="px-1.5 py-0.5 rounded-[5px] bg-[#eeece7]/70 text-[#17171c] font-mono text-[13.5px] border border-[#d9d9dd]" {...props}>
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
              note: 'bg-blue-50/90 border-blue-600 text-blue-950',
              tip: 'bg-emerald-50/90 border-emerald-600 text-emerald-950',
              warning: 'bg-amber-50/90 border-amber-600 text-amber-950',
              important: 'bg-purple-50/90 border-purple-600 text-purple-950'
            };

            const alertIcons = {
              note: <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />,
              tip: <Lightbulb className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />,
              warning: <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />,
              important: <CheckCircle2 className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" aria-hidden="true" />
            };

            return (
              <aside
                aria-label={`${alertType} callout`}
                className={`my-5 p-4 rounded-[12px] border-l-4 flex items-start gap-3.5 text-[14.5px] leading-relaxed shadow-2xs ${alertStyles[alertType]}`}
              >
                {alertIcons[alertType]}
                <div className="flex-1 font-normal">{cleanChildren}</div>
              </aside>
            );
          },

          // Accessible Tables
          table({ node, ...props }) {
            return (
              <div className="my-6 overflow-x-auto rounded-[12px] border border-[#d9d9dd] bg-white shadow-2xs">
                <table className="w-full text-[14px] text-left border-collapse" {...props} />
              </div>
            );
          },
          th({ node, ...props }) {
            return (
              <th className="bg-[#eeece7]/60 px-4 py-2.5 font-semibold text-[#17171c] border-b border-[#d9d9dd] text-[13px]" {...props} />
            );
          },
          td({ node, ...props }) {
            return (
              <td className="px-4 py-2.5 border-b border-[#d9d9dd]/60 text-[#212121] text-[13.5px]" {...props} />
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
