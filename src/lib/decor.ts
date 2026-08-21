// Real decorative art extracted from the Ladipage reference template
// (nawngs.com/naunhatmau), served from /public/decor.
//
// See the same basePath note as src/lib/images.ts: next/image's basePath
// auto-prefixing doesn't apply once `images.unoptimized` is on (required for
// the GitHub Pages static export), so it's added by hand here too.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const decor = (file: string) => `${basePath}/decor/${file}`

// White satin/fabric texture — ambient backdrop, reused across several sections.
export const heroBg = decor('hero-bg.png')
export const invitationBg = decor('invitation-bg.png')
export const fabricDrape = decor('fabric-drape.png')
// Plain paper-grain texture — subtle base background for most sections.
export const plasterTexture = decor('plaster-texture.png')
// Scalloped-edge stationery card shape — the invitation-details card backdrop.
export const paperCard = decor('paper-card.png')
export const flowerBranch = decor('flower-branch.png')
export const pearl = decor('pearl.png')
export const logo = decor('logo.png')
// Decorative "and" script, used between the couple's names in the hero.
export const ampersand = decor('ampersand.png')
// Polaroid-style photo frame overlay (transparent window) for the love-story photo.
export const photoFrame = decor('photo-frame.png')
// Handshake + heart line icon (togetherness), not a photo.
export const iconHandshake = decor('icon-handshake.png')
export const dividerBand = decor('divider-band.png')
export const ringSingle = decor('ring-single.png')
export const ringsPair = decor('rings-pair.png')
export const iconCar = decor('icon-car.png')
export const iconFood = decor('icon-food.png')
export const iconDance = decor('icon-dance.png')
// Gold script "Timeline" title graphic (a wordmark, not a line/strip).
export const timelineWordmark = decor('timeline-wordmark.png')
// Gold script "Dresscode" title graphic.
export const dresscode = decor('dresscode.png')
// Gold script "DREAM" wordmark — the save-the-date section's big backdrop word.
export const dreamWordmark = decor('dream-wordmark.png')
export const ornamentQuoteB = decor('ornament-quote-b.png')

// From the "tonewhitenude" reference template — used for the bride-side
// invitation card, which has its own distinct nude/taupe palette.
export const brideCardPaper = decor('bride-card-paper.png')
export const brideCardAmpersand = decor('bride-card-ampersand.png')
export const brideCardOrchidCorner = decor('bride-card-orchid-corner.png')
export const brideCardOrchidTop = decor('bride-card-orchid-top.png')
export const brideCardMonogramFrame = decor('bride-card-monogram-frame.png')
export const brideCardOrchidSpray = decor('bride-card-orchid-spray.png')
