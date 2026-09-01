import { useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Hook to attach paste restriction on Monaco Editor instances during challenges and tests.
 * Rules:
 * 1. Intercepts paste events in the editor.
 * 2. Prevents insertion of clipboard text.
 * 3. Shows non-blocking informative message.
 * 4. Allows normal keyboard typing, undo/redo, and general website copy/paste.
 */
export function usePastePrevention(isEnabled = true) {
  const handleEditorDidMount = useCallback((editor, monaco) => {
    if (!isEnabled || !editor) return;

    // Intercept keyboard shortcuts (Ctrl+V / Cmd+V)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
      toast.warning('Pasting code is disabled for practice challenges. Type your solution to continue.', {
        duration: 3500,
        id: 'paste-prevention-toast'
      });
    });

    // Intercept native browser paste event in the editor DOM element
    const domNode = editor.getDomNode();
    if (domNode) {
      domNode.addEventListener('paste', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toast.warning('Pasting code is disabled for practice challenges. Type your solution to continue.', {
          duration: 3500,
          id: 'paste-prevention-toast'
        });
      }, true);
    }
  }, [isEnabled]);

  return { handleEditorDidMount };
}
