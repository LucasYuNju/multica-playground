# Make it yours

This site uses an illustrative photographer identity, session rates, and Unsplash photographs. Replace them before publishing.

## Identity and sessions

- Edit `lib/content.ts`: `profile.name`, `profile.email`, `profile.location`, `profile.introduction`, and `profile.about`.
- `hello@example.com` is a reserved example address. Replace it with your real public contact email. All enquiry links read from this one value and open the visitor’s email app with a subject; no backend mail service is configured.
- Edit `sessions` in the same file. The current $350 portrait and $750 story rates are sample starting prices in USD. Change package details, currency, travel terms, and usage terms to match your services. The terms paragraph lives in `app/page.tsx`.
- Edit photograph titles, categories, years, location descriptions, and alt text in `photographs`.
- Update the hero copy, photo label, and `AM.` monogram in `app/page.tsx`. The header, footer, and metadata use the configured name.
- The type pairing is Cormorant Garamond (headings) and Manrope (body), loaded and self-hosted through `next/font`. The initial build needs access to Google Fonts.

## Replace all eight placeholder photos

All paths below are relative to `portfolio/public/images/`. Local copies keep the site independent of the placeholder image host at runtime. Their original Unsplash URLs are preserved in `sources.json` for reference; none of these photographs are the site owner’s work.

1. `mountains.jpg` — the large opening landscape in `app/page.tsx`. Use your signature landscape, ideally at least 2200px wide. Update its alt text and check the mobile center crop.
2. `coast.jpg` — “Where the land ends,” the first selected work. Replace with a landscape from your Places collection.
3. `portrait.jpg` — “In a quiet moment,” the People photograph. Replace with a portrait you have permission to publish.
4. `forest.jpg` — “A little further in,” a vertical Places photograph.
5. `architecture.jpg` — “Lines of the city,” an Everyday photograph.
6. `hills.jpg` — “Before the world wakes,” a horizontal Places photograph.
7. `field.jpg` — “Nothing in a hurry,” the vertical desert road photograph in Everyday.
8. `camera.jpg` — the Behind the lens image in `app/page.tsx`. Replace with your own portrait or a behind-the-scenes photograph; update its alt text.

Gallery images and their enlarged views share the same source in `lib/content.ts`, so each replacement updates both. Keep these filenames or update their `src` values. For hero and about images, update the source and alt text directly in `app/page.tsx`. Check crops, captions, and alt text after replacing any image. Remove or update `sources.json` when the placeholders are replaced.

## Review before launch

- Confirm the public email and each enquiry subject by clicking the links in your email app.
- Review the name, location, biography, all sample dates, and pricing.
- Replace the default template favicon in `app/favicon.ico` with your own mark.
- Run the checks listed in the root README, then review phone and desktop layouts with your real photographs.
