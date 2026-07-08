# ═══════════════════════════════════════════════════════════
#  EverAfter Studios — Copy Featured Stories Images (Updated)
#  Run this script in PowerShell to copy the generated story images
#  and restore the original placeholder images.
# ═══════════════════════════════════════════════════════════

$dst = "d:\EverAfter Studios\EverAfter Studios\assets\images"
$src_old = "C:\Users\NIVETHA\.gemini\antigravity-ide\brain\25650f19-d95c-4b2b-ade7-52741e6b4894"
$src_new = "C:\Users\NIVETHA\.gemini\antigravity-ide\brain\07c37bc8-26dc-47fd-b0ec-8844b9d3c786"

New-Item -ItemType Directory -Force -Path $dst | Out-Null

# 1. Restore the original placeholder images for Candid Photography
Copy-Item "$src_old\gallery_01_1783421748735.png"   "$dst\gallery-01.jpg"   -Force
Copy-Item "$src_old\gallery_02_1783421776486.png"   "$dst\gallery-02.jpg"   -Force
Copy-Item "$src_old\gallery_03_1783421786911.png"   "$dst\gallery-03.jpg"   -Force

# 2. Copy the newly generated images for the Featured Stories
Copy-Item "$src_new\garden_wedding_story_1783532293467.png"   "$dst\story-garden.jpg"   -Force
Copy-Item "$src_new\heritage_wedding_story_1783532311235.png" "$dst\story-heritage.jpg"   -Force
Copy-Item "$src_new\beach_wedding_story_1783532330619.png"    "$dst\story-beach.jpg"   -Force

Write-Host "`n[OK] Original placeholders restored and new Wedding Story images copied successfully!" -ForegroundColor Green
Write-Host "[Info] Location: $dst" -ForegroundColor Cyan
