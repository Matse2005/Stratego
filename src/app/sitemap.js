export default function sitemap() {
  return [
    {
      url: "https://stratego.jeugdwerk.org",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://stratego.jeugdwerk.org/dev",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
  ];
}
