// pages/api/revalidate.js

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    console.log("req.query.secret", req.query.secret);
    return res.status(401).json({ message: "Invalid token" });
  }
  // each page built as (SSG way) needs a separated statement to revalidate its data
  try {
    await res.unstable_revalidate("/");
    await res.unstable_revalidate("/team");
    await res.unstable_revalidate("/about");
    await res.unstable_revalidate("/contactus");
    await res.unstable_revalidate("/faq");
    await res.unstable_revalidate("/gallery");
    await res.unstable_revalidate("/news");
    await res.unstable_revalidate("/projects");
    await res.unstable_revalidate("/services");
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send(err.message);
  }
}
