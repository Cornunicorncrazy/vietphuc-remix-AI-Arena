# Revised Implementation Plan - Background Garment Try-On Processing with Notification

Allow users to trigger traditional Vietnamese garment try-on (virtual fitting / dressing) in the photobooth and continue exploring other carriages on the train while waiting. Once the garment fitting / generation is complete, display a floating notification badge on screen accompanied by a soft train horn sound effect.

## Proposed Changes

### 1. Photobooth Garment Try-On Processing (`train-journey/dist/photobooth.js`)
- Make garment try-on / fitting run asynchronously in the background when requested.
- Allow users to close the photobooth overlay or navigate other carriages while fitting is in progress.
- Add a background task indicator / toast state.

### 2. Floating Notification & Train Horn (`train-journey/dist/train-audio.js` and `train-journey/dist/photobooth.js`)
- Expose a helper function to trigger the train horn sound programmatically (`window.trainPlayHorn?.()`).
- Create a floating notification toast element (`.generation-toast`) in the DOM that appears when the garment try-on / fitting is ready.
- Clicking the notification allows the user to instantly jump back to view the final try-on photo.

### 3. Styling (`train-journey/dist/photobooth.css`)
- Add smooth CSS animations and styling for the floating notification badge (toast) at the bottom-right/top-right of the screen with a subtle pulse and quick action button.

## Verification Plan
- Trigger garment try-on in the photobooth.
- Switch to another carriage / close photobooth while try-on processes in the background.
- Verify floating notification appears upon completion along with the train horn sound.
- Click notification to view the completed try-on photo.
