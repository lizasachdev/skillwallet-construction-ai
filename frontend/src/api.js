const API = import.meta.env.VITE_API_URL || "https://skillwallet-construction-ai-kpsk.vercel.app/api";

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, options);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }
  return response.json();
}

export const api = {
  project: () => request("/project"),
  skills: () => request("/skills"),
  epics: () => request("/epics"),
  architecture: () => request("/architecture"),
  requirements: () => request("/system-requirements"),
  credits: () => request("/credits"),
  analyze: ({ prompt, context, imageName }) =>
    request("/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        prompt,
        context,
        image_name: imageName || "",
      }),
    }),
  upload: (file) => {
    const body = new FormData();
    body.append("file", file);
    return request("/uploads", { method: "POST", body });
  },
};
