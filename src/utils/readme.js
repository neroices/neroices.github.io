import { Marked } from "marked";
import fs from "node:fs";
import path from "node:path";

/**
 * Fetch and process the README markdown for a given project.
 * Automatically ignores top-level '#' or 'h1' from the markdown to avoid duplicating
 * the project page's main <h1> title and preserve heading hierarchy.
 * @param {{ readme?: boolean | string; fetchReadme?: boolean | string; link?: string }} project
 * @returns {Promise<{ html: string; rawUrl?: string; repoUrl?: string } | null>}
 */
export async function getProjectReadme(project) {
  const readmeConfig = project.readme ?? project.fetchReadme;
  if (!readmeConfig) {
    return null;
  }

  let rawMarkdown = "";
  let rawUrl = "";
  let repoUrl = "";
  let rawBaseUrl = "";
  let repoBaseUrl = "";

  try {
    if (typeof readmeConfig === "string" && /^https?:\/\//i.test(readmeConfig)) {
      rawUrl = readmeConfig;
      const res = await fetch(rawUrl);
      if (!res.ok) {
        console.warn(`[readme] Failed to fetch ${rawUrl}: ${res.status}`);
        return null;
      }
      rawMarkdown = await res.text();
    } else if (typeof readmeConfig === "string") {
      // Local file path
      const resolvedPath = path.isAbsolute(readmeConfig)
        ? readmeConfig
        : path.resolve(process.cwd(), readmeConfig);

      if (fs.existsSync(resolvedPath)) {
        rawMarkdown = fs.readFileSync(resolvedPath, "utf-8");
      } else {
        console.warn(`[readme] Local file not found: ${resolvedPath}`);
        return null;
      }
    } else if (project.link && /github\.com\/([^/]+)\/([^/]+)/i.test(project.link)) {
      // Automatic fetch from GitHub repository link
      const match = project.link.match(/github\.com\/([^/]+)\/([^/]+)/i);
      if (!match) return null;

      const owner = match[1];
      const repo = match[2].replace(/\.git$/i, "");
      repoUrl = `https://github.com/${owner}/${repo}`;

      // Try main branch first, then master branch
      const branches = ["main", "master"];
      let fetched = false;

      for (const branch of branches) {
        const candidateUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
        try {
          const res = await fetch(candidateUrl);
          if (res.ok) {
            rawMarkdown = await res.text();
            rawUrl = candidateUrl;
            rawBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;
            repoBaseUrl = `https://github.com/${owner}/${repo}/blob/${branch}`;
            fetched = true;
            break;
          }
        } catch {
          // Continue to next candidate branch
        }
      }

      // If remote fetch failed (e.g. offline dev), attempt local repository sibling fallback
      if (!fetched) {
        const localCandidates = [
          path.resolve(process.cwd(), `../${repo}/README.md`),
          path.resolve(process.cwd(), `../${repo.replace(/stats$/, "")}/README.md`),
          path.resolve(process.cwd(), `../${project.slug}/README.md`),
        ];
        for (const localPath of localCandidates) {
          if (fs.existsSync(localPath)) {
            rawMarkdown = fs.readFileSync(localPath, "utf-8");
            fetched = true;
            break;
          }
        }
      }

      if (!fetched || !rawMarkdown) {
        console.warn(`[readme] Could not locate README for ${owner}/${repo}`);
        return null;
      }
    } else {
      return null;
    }

    if (!rawMarkdown.trim()) {
      return null;
    }

    // Configure Marked with custom renderer to:
    // 1. Ignore top-level '#' (depth 1) headings
    // 2. Ignore <h1> HTML tags
    // 3. Resolve relative image and anchor links if GitHub base URL is known
    // 4. Ensure external links open in a new tab
    const marked = new Marked({
      renderer: {
        heading({ depth, text }) {
          // Strictly ignore any '#' or 'h1' level headings
          if (depth === 1) {
            return "";
          }
          return `<h${depth}>${text}</h${depth}>`;
        },
        html({ text }) {
          // Strip any <h1>...</h1> HTML blocks while keeping others
          return text.replace(/<h1[\s\S]*?<\/h1>/gi, "");
        },
        image({ href, title, text }) {
          let src = href;
          if (rawBaseUrl && !/^https?:\/\/|^data:/i.test(src)) {
            src = `${rawBaseUrl}/${src.replace(/^\.?\//, "")}`;
          }
          const titleAttr = title ? ` title="${title}"` : "";
          const altAttr = text ? ` alt="${text}"` : "";
          return `<img src="${src}"${altAttr}${titleAttr} loading="lazy" class="rounded-lg max-w-full my-3" />`;
        },
        link({ href, title, text }) {
          let resolvedHref = href;
          const isAnchor = resolvedHref.startsWith("#");
          if (!isAnchor && repoBaseUrl && !/^https?:\/\/|^mailto:/i.test(resolvedHref)) {
            resolvedHref = `${repoBaseUrl}/${resolvedHref.replace(/^\.?\//, "")}`;
          }
          const target = !isAnchor ? ' target="_blank" rel="noopener noreferrer"' : "";
          const titleAttr = title ? ` title="${title}"` : "";
          return `<a href="${resolvedHref}"${target}${titleAttr}>${text}</a>`;
        },
      },
    });

    const parsedHtml = marked.parse(rawMarkdown);

    return {
      html: parsedHtml,
      rawUrl: rawUrl || undefined,
      repoUrl: repoUrl || project.link,
    };
  } catch (err) {
    console.error(`[readme] Error processing README for ${project.slug}:`, err);
    return null;
  }
}
