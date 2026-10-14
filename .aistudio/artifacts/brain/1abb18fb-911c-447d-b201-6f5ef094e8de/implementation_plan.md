# Photobooth Social Media Sharing & Minimalist QR Plan

Redo the social media sharing architecture for the Indochine train journey photobooth so that sharing is reserved exclusively for the final framed result (Step 4), featuring native Web Share API with quick Facebook, Zalo, and link-copy actions, complemented by a minimalist subtle website QR badge at the bottom corner of the completed frame.

## User Review & Critical Decisions

> [!IMPORTANT]
> Key design and flow decisions have been realigned based on your latest feedback:

- **Confirmed Decision 1 (Sharing Placement)**: Social media sharing is now restricted **exclusively to Step 4 (Final Framed Result)**. Users will never see a premature share prompt right after taking a photo or before their Vietnamese attire and frame are fully composed.
- **Confirmed Decision 2 (Social Channels & Actions)**: Primary integration uses the **Web Share API** (with direct file attachment support where available), paired with quick-access links for **Facebook**, **Zalo**, and **Clipboard Link Copy** with feedback toasts.
- **Confirmed Decision 3 (QR Code Appearance)**: Replaces bulky postal decorations with a **minimalist subtle QR badge** rendered cleanly in the bottom corner of the exported image and frame preview, directing viewers to the train journey website.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                PHOTOBOOTH FLOW REVISION                                │
│                                                                                        │
│  [Step 1: Chụp ảnh]    -->  [Step 2: Chọn trang phục]  -->  [Step 3: Tạo ảnh AI]       │
│  (No sharing button)        (Explore Indochine catalog)     (Gemini garment synthesis) │
│                                                                                        │
│                                           │                                            │
│                                           ▼                                            │
│                              [Step 4: Ghép khung kỷ niệm]                             │
│                    ┌──────────────────────────────────────────────┐                    │
│                    │  • Complete slots with photos / AI portraits │                    │
│                    │  • Live preview with Minimalist QR badge     │                    │
│                    │  • Action: [📤 Chia sẻ frame] (Step 4 ONLY)  │                    │
│                    │  • Action: [📥 Tải frame PNG]                │                    │
│                    └──────────────────────────────────────────────┘                    │
│                                           │                                            │
│                                           ▼                                            │
│                             [Social Share Dialog Modal]                                │
│               ┌────────────────────────────────────────────────────────┐               │
│               │  [Native Web Share] [Facebook] [Zalo] [Sao chép link]  │               │
│               └────────────────────────────────────────────────────────┘               │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Overview & Core Concept

- **What It Does**: Allows train passengers and virtual travelers to share their finalized, framed Vietnamese heritage portraits directly to social networks (Facebook, Zalo, native device sheet) or download high-resolution PNGs with an embedded website QR badge.
- **Target Audience / Persona**: Travelers, culture enthusiasts, and photobooth visitors who want to share a polished heritage keepsake rather than an unedited raw selfie.
- **Key Value**: Enforces quality and narrative integrity—sharing only occurs when the memory is fully dressed in Vietnamese attire and set within the commemorative train frame.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Step 1 (Raw Photo Capture / Upload)**:
   - User snaps a selfie or uploads a photo.
   - Clean, focused UI showing the photo preview with a direct call to action: **"Chọn trang phục này →"**.
   - No share button is rendered at this step, eliminating accidental or premature sharing of uncostumed photos.

2. **Step 2 & 3 (Attire Selection & AI Generation)**:
   - User picks from traditional Vietnamese attire (Nhật Bình, Ngũ Thân, Giao Lĩnh, Áo Bà Ba, ethnic garments).
   - Generates heritage portrait using the AI pipeline.

3. **Step 4 (Final Framed Result - Exclusive Sharing Hub)**:
   - User assigns photos/portraits into the vintage train frame slots.
   - Once all slots are filled, the primary action **"📤 Chia sẻ frame"** unlocks alongside **"📥 Tải frame PNG"**.
   - The live frame preview exhibits a sleek, non-intrusive **minimalist QR badge** at the bottom-right corner.

4. **Social Sharing Modal**:
   - Opens an Indochine-themed dialog displaying the framed memory thumbnail and quick action buttons:
     - **Chia sẻ qua thiết bị (Web Share API)**: Invokes the native OS share sheet (iOS/Android/macOS/Windows) with image file attachment if supported.
     - **Facebook**: Opens Facebook share dialog with customized journey text and link.
     - **Zalo**: Opens Zalo sharing interface for fast chat/feed broadcasting.
     - **Sao chép liên kết**: Copies the experience URL to clipboard and triggers a warm emerald toast: *"✓ Đã sao chép liên kết chuyến tàu!"*.

### Visual Identity & Theme

- **Minimalist QR Badge Design**:
  - Embedded in canvas export: 8%–10% of frame height, clean rounded rectangle (`r = 6px`), pale ivory background (`#fcfbf7`), hairline warm border (`#d8d2be`), dark spruce green QR matrix (`#253c35`), and subtle uppercase micro-typography: `"QUÉT ĐỂ LÊN TÀU"`.
  - Non-obtrusive: positioned with balanced margin ($16\text{px}$) inside the bottom corner, preserving the visual prominence of the portraits.
- **Color Palette & Tone**:
  - Primary Canvas: Warm antique paper (`#f3efe3`), deep forest spruce (`#253c35`), antique gold accent (`#c5b895`).
  - Social Brand Accents: Authentic Facebook blue (`#1877f2`), Zalo blue (`#0068ff`), neutral warm beige (`#faf7ee`).
- **Typography**:
  - Header: Georgia serif / 'Be Vietnam Pro' for refined editorial warmth.
  - Controls: Clean sans-serif with clear touch targets ($44\text{px}$ minimum height).

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Single Touchpoint (Step 4 Only) vs. Multi-Touchpoint Sharing
- **Chosen Approach**: Exclusive placement at Step 4 upon frame completion.
- **Why**: Protects user journey coherence. The photobooth's core delight is transforming travelers into historic Vietnamese figures within an Indochine train compartment; raw selfies lack context and brand value.
- **Trade-Off**: Users cannot share raw intermediate photos directly, but they can still download them or proceed smoothly to framing.

### Decision 2: Minimalist Subtle Badge vs. Elaborate Postal Stamp
- **Chosen Approach**: Minimalist, clean QR badge with subtle outline and micro-label.
- **Why**: Keeps visual focus on the people and garments while retaining functional scannability for social discovery. Avoids visual clutter on smaller mobile frames.

### Decision 3: Hybrid Web Share API with Direct Social Fallbacks
- **Chosen Approach**: Test `navigator.canShare({ files: [file] })` for native file sharing. If unsupported or desktop browser, provide instant Facebook and Zalo Web URLs and clipboard copy.
- **Why**: Maximizes mobile reach (native sharing to Instagram Stories, WhatsApp, AirDrop) while ensuring desktop users have immediate 1-click sharing to Vietnam's most popular networks.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    TECHNICAL ARCHITECTURE & EXPORT FLOW                    │
│                                                                            │
│   User Action: Click "📤 Chia sẻ frame" (Step 4)                           │
│        │                                                                   │
│        ▼                                                                   │
│   composeFrameCanvas()                                                     │
│   ├── Draws frame background & slot images with cover-fit math             │
│   ├── Draws header/footer typography ("VIỆT PHỤC · KỶ NIỆM TRÊN TÀU")      │
│   └── drawMinimalistQrBadge(ctx, width, height)                            │
│        ├── Generates client-side QR via bundled QRCode.toCanvas()          │
│        ├── Renders subtle ivory container & dark spruce modules            │
│        └── Adds compact micro-caption ("QUÉT ĐỂ LÊN TÀU")                  │
│        │                                                                   │
│        ▼                                                                   │
│   canvas.toBlob('image/png')                                               │
│        │                                                                   │
│        ├── Action: "download" ──> Direct <a> trigger                       │
│        └── Action: "share"    ──> openShareModal({ blob, title, isFrame }) │
│                                         │                                  │
│                                         ├── navigator.share({ files })     │
│                                         ├── Facebook Web Dialog            │
│                                         ├── Zalo Share API                 │
│                                         └── Clipboard.writeText() + Toast  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Component & Data Specifications

1. **`photobooth.js`**:
   - `renderPhotoShowcase()`: Pure selection preview with `"Chọn trang phục này →"` and optional local download; NO share button for original photos or in Step 1.
   - `renderComposition()`: Step 4 layout rendering slots, live minimalist QR badge indicator, and enabled `📤 Chia sẻ frame` / `📥 Tải frame PNG` buttons once all slots are assigned.
   - `drawMinimalistQrBadge(ctx, frameW, frameH)`: Compact canvas routine drawing the subtle QR badge at the bottom corner.
   - `openShareModal({ blob, title, filename })`: Renders the Indochine modal dialog with Web Share API, Facebook, Zalo, and link copy triggers.

2. **`server.js`**:
   - Fallback route `/api/qrcode?text=...` using the server-side `qrcode` package for dynamic asset generation if required.

3. **`index.html` & `photobooth.css`**:
   - Bundled `qrcode.min.js` client-side library for zero-latency, offline-capable canvas stamping.
   - Polished responsive styling for modal backdrop, share buttons, and mobile sheet adaptation.
