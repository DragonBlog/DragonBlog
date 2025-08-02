import type { Root } from "mdast";
import type { VFile } from "vfile";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return (tree: Root, file: VFile) => {
    const textContent = toString(tree);
    const readingTime = getReadingTime(textContent);
    // 阅读时间
    file.data.astro!.frontmatter!.readingTime = readingTime.time;
    // 阅读时间
    file.data.astro!.frontmatter!.text = readingTime.minutes;
    // 阅读字数
    file.data.astro!.frontmatter!.words = readingTime.words;
  };
}
