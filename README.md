# Digital Wedding Invitation

A static, animated, mobile-first wedding invitation inspired by the supplied olive-green botanical wedding stationery reference.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts (loaded from Google Fonts when online)
- No backend
- No database
- No build process
- GitHub Pages compatible

## Folder structure

```text
digital-wedding-invitation/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
├── data/
│   └── wedding-data.js   <-- EDIT THIS FILE
└── assets/
    ├── images/
    │   ├── couple-main.svg
    │   ├── photo1.svg
    │   ├── photo2.svg
    │   ├── photo3.svg
    │   └── photo4.svg
    └── music/
```

## Customize the invitation

Open:

`data/wedding-data.js`

This is the main file you should edit.

You can change:

- Bride and groom names
- Initials
- Wedding date
- Wedding time
- Invitation wording
- Venue
- Address
- Google Maps link
- Story timeline
- Events
- Gallery photos
- Family names
- RSVP form link
- WhatsApp number/message
- Music
- QR code
- Theme colors

You should not need to edit `index.html`, `style.css`, or `script.js` for normal customization.

## Add your own photographs

Replace the SVG placeholders in:

`assets/images/`

with JPG, PNG, or WebP photographs.

Then change the paths in `data/wedding-data.js`, for example:

```js
gallery: [
  "assets/images/couple-main.jpg",
  "assets/images/photo1.jpg",
  "assets/images/photo2.jpg",
  "assets/images/photo3.jpg",
  "assets/images/photo4.jpg"
]
```

The first gallery image is also used as the main photograph.

For good performance, resize large photographs before uploading. Around 1600–2200px on the longest side is usually plenty for this kind of site.

## Add music

Put an MP3 file in:

`assets/music/wedding.mp3`

Then change:

```js
music: {
  enabled: true,
  file: "assets/music/wedding.mp3"
}
```

The site does not force audio autoplay before user interaction. After the visitor taps "Open Invitation", the browser is allowed to start playback where supported.

## RSVP

For a Google Form:

```js
rsvp: {
  enabled: true,
  message: "Please confirm your presence.",
  url: "YOUR_GOOGLE_FORM_URL",
  whatsappNumber: "919876543210",
  whatsappMessage: "Hi! I would like to RSVP for the wedding."
}
```

The WhatsApp number should include the country code without `+` or spaces.

## QR code

Set:

```js
qr: {
  enabled: true,
  image: "assets/images/qr-code.png"
}
```

Then put your QR image at that path.

## Change colors

At the bottom of `wedding-data.js`:

```js
theme: {
  primaryColor: "#4F5940",
  secondaryColor: "#AAB6A0",
  paperColor: "#F7F3E9",
  textColor: "#30362C",
  accentColor: "#B89B5E"
}
```

These values are automatically converted into CSS variables.

## Test locally

### Simplest method

You can try opening `index.html` directly in a browser.

### Recommended method: VS Code Live Server

1. Install Visual Studio Code.
2. Open this project folder.
3. Install the **Live Server** extension.
4. Right-click `index.html`.
5. Select **Open with Live Server**.

This gives you a local URL such as:

`http://127.0.0.1:5500/`

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of this folder.
3. Make sure `index.html` is in the repository root.
4. Open repository **Settings**.
5. Open **Pages**.
6. Under deployment/source, choose the branch containing the website and `/ (root)`.
7. Save.
8. GitHub will provide the Pages URL.

The website uses relative paths such as:

`assets/images/photo1.jpg`

rather than root paths such as:

`/assets/images/photo1.jpg`

That allows it to work inside a GitHub repository URL.

## Important GitHub Pages note

If your repository is:

`username.github.io/wedding/`

the website is designed to work from that subdirectory.

## Main features

- Animated invitation opening screen
- Elegant botanical olive/ivory theme
- Responsive mobile-first design
- Couple hero section
- Story timeline
- Dynamic event cards
- Live wedding countdown
- Downloadable `.ics` calendar event
- Venue / directions button
- Responsive photo gallery
- Fullscreen lightbox
- Swipe navigation on mobile
- RSVP link
- WhatsApp RSVP
- Optional background music
- Optional QR code
- Family blessings
- Scroll reveal animations
- Reduced-motion accessibility support
- All wedding data separated from the HTML

## Design philosophy

The site is intentionally built with vanilla HTML/CSS/JS so it can remain inexpensive, portable and easy to host. There is no server or database.

For the best result, use high-resolution couple photographs and compress them to web-friendly JPG/WebP files.
