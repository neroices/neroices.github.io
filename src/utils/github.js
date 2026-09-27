/**
 * In-memory cache for GitHub repo metadata during build
 * @type {Map<string, { license?: string; lastUpdated?: string }>}
 */
const repoCache = new Map();

/**
 * Get project metadata including License and Last Updated date,
 * combining static fields from project definition with GitHub API fallbacks.
 *
 * @param {{ link?: string; license?: string; lastUpdated?: string }} project
 * @returns {Promise<{ license?: string; lastUpdated?: string }>}
 */
export async function getProjectMetadata(project) {
  // Do not add license or last update to organization projects
  if (project.type === "organization") {
    return { license: undefined, lastUpdated: undefined };
  }

  let license = project.license;
  let lastUpdated = project.lastUpdated;

  // If both are already statically provided, no need to query GitHub API
  if (license && lastUpdated) {
    return { license, lastUpdated };
  }

  // Check if project has a GitHub repo link (format: github.com/:owner/:repo)
  if (project.link && /github\.com\/([^/]+)\/([^/]+)/i.test(project.link)) {
    const match = project.link.match(/github\.com\/([^/]+)\/([^/]+)/i);
    if (match) {
      const owner = match[1];
      const repo = match[2].replace(/\.git$/i, "");
      const repoKey = `${owner}/${repo}`.toLowerCase();

      if (repoCache.has(repoKey)) {
        const cached = repoCache.get(repoKey);
        return {
          license: license ?? cached?.license ?? "Unlicense",
          lastUpdated: lastUpdated ?? cached?.lastUpdated,
        };
      }

      try {
        /** @type {Record<string, string>} */
        const headers = {
          "User-Agent": "portfolio-site",
          Accept: "application/vnd.github.v3+json",
        };

        if (typeof process !== "undefined" && process.env?.GITHUB_TOKEN) {
          headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        }

        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
          headers,
          signal: AbortSignal.timeout(4000),
        });

        if (res.ok) {
          const data = await res.json();
          const fetchedLicense =
            data.license?.spdx_id && data.license.spdx_id !== "NOASSERTION"
              ? data.license.spdx_id
              : data.license?.name ?? undefined;

          let fetchedLastUpdated = undefined;
          const dateStr = data.pushed_at || data.updated_at;
          if (dateStr) {
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
              fetchedLastUpdated = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
            }
          }

          const cached = { license: fetchedLicense, lastUpdated: fetchedLastUpdated };
          repoCache.set(repoKey, cached);

          return {
            license: license ?? cached.license ?? "Unlicense",
            lastUpdated: lastUpdated ?? cached.lastUpdated,
          };
        } else {
          repoCache.set(repoKey, {});
        }
      } catch {
        // Silently handle timeout/offline/rate limit without interrupting build
        repoCache.set(repoKey, {});
      }
    }
  }

  return { license: license ?? "Unlicense", lastUpdated };
}
