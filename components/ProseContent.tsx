export function ProseContent({ html, className = "" }: { html: string; className?: string }) {
  return (
    <div
      className={`prose prose-neutral max-w-none prose-headings:text-primary prose-a:text-accent ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
