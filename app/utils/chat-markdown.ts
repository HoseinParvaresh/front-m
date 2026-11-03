export interface InlineToken {
  type: "text" | "bold" | "code";
  text: string;
}

export type MarkdownBlock =
  | { type: "paragraph"; tokens: InlineToken[] }
  | { type: "list"; ordered: boolean; items: InlineToken[][] }
  | { type: "code"; lang: string; code: string };

const BULLET = /^\s*[-*•]\s+(.*)/;
const NUMBERED = /^\s*\d+[.)]\s+(.*)/;

function inline(text: string): InlineToken[] {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .filter(Boolean)
    .map<InlineToken>((part) => {
      if (part.length > 4 && part.startsWith("**") && part.endsWith("**"))
        return { type: "bold", text: part.slice(2, -2) };
      if (part.length > 2 && part.startsWith("`") && part.endsWith("`"))
        return { type: "code", text: part.slice(1, -1) };
      return { type: "text", text: part };
    });
}

export function parseMarkdown(source: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = source.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";

    const fence = line.match(/^```(\w*)/);
    if (fence) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !(lines[i] ?? "").startsWith("```"))
        code.push(lines[i++] ?? "");
      i++;
      blocks.push({
        type: "code",
        lang: fence[1] || "text",
        code: code.join("\n"),
      });
      continue;
    }

    const ordered = NUMBERED.test(line);
    if (ordered || BULLET.test(line)) {
      const pattern = ordered ? NUMBERED : BULLET;
      const items: InlineToken[][] = [];
      while (i < lines.length) {
        const match = (lines[i] ?? "").match(pattern);
        if (!match) break;
        items.push(inline(match[1] ?? ""));
        i++;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    const paragraph: string[] = [];
    while (
      i < lines.length &&
      (lines[i] ?? "").trim() &&
      !(lines[i] ?? "").startsWith("```") &&
      !BULLET.test(lines[i] ?? "") &&
      !NUMBERED.test(lines[i] ?? "")
    ) {
      paragraph.push(lines[i++] ?? "");
    }
    blocks.push({ type: "paragraph", tokens: inline(paragraph.join("\n")) });
  }

  return blocks;
}
