import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://smrbruh-beyond-interface.branchinggerbil8.chatgpt.site"}/sitemap.xml`,
  };
}
