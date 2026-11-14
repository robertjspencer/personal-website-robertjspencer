Robert Spencer Personal Website

This repository contains the source for a personal website branded for
Robert Spencer and intended to live under robertjspencer.com.

The live site is a single page (index.html) with custom copy and styling
(assets/css/custom.css) layered on the shared styles and scripts under assets/.
See LICENSE.txt for third-party licensing (CC BY 3.0) where it applies.

Contents:
- index.html — public site
- assets/ — CSS, JS, webfonts, and site styles
- images/ — photos and favicon
- documents/ — CV PDF

Archiving external profiles:
When adding a university, research centre, employer or media profile link to
index.html, capture public web snapshots immediately so a fallback URL is
always available if the upstream page is later redesigned or retired:
1. Save the live URL on both the Wayback Machine (https://web.archive.org/save)
   and archive.today (https://archive.ph/).
2. Open each permanent snapshot to check that photos rendered. If a page
   lazy-loads portraits via JavaScript (e.g. data-srcset), also save the direct
   full-resolution image URL on the Wayback Machine.
3. Add canonical researcher or organisation profile URLs to JSON-LD sameAs in
   index.html where appropriate, and record the snapshot URLs below for future
   link-rot recovery.

Public snapshot fallbacks:
- SAAFE CRC scholar profile (captured 2026-11-14)
  Live: https://www.crcsaafe.com.au/about-saafe/our-team/robert-spencer
  archive.today (full page + portrait): https://archive.ph/pM5FF
  Wayback page: https://web.archive.org/web/20261114010636/https://www.crcsaafe.com.au/about-saafe/our-team/robert-spencer
  Wayback portrait (1920x2400): https://web.archive.org/web/20261114010745/https://www.crcsaafe.com.au/assets/resized/images/People/35554/EDAR8-6222-1_W1920_H2400.jpg
