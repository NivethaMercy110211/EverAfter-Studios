# ═══════════════════════════════════════════════════════════
#  EverAfter Studios — Copy New Hero Images to Project
#  Run this script in PowerShell to copy the generated hero images
# ═══════════════════════════════════════════════════════════

$dst = "d:\EverAfter Studios\EverAfter Studios\assets\images"
$src = "C:\Users\NIVETHA\.gemini\antigravity-ide\brain\156edf5f-8873-4dca-ab97-5cdba1b6baf6"

New-Item -ItemType Directory -Force -Path $dst | Out-Null

Copy-Item "$src\logo_1783504541182.png"             "$dst\logo.png"             -Force
Copy-Item "$src\home1_hero_1783500695292.png"       "$dst\home1-hero.jpg"       -Force
Copy-Item "$src\home2_hero_1783500711262.png"       "$dst\home2-hero.jpg"       -Force
Copy-Item "$src\about_hero_1783500723571.png"       "$dst\about-hero.jpg"       -Force
Copy-Item "$src\photography_hero_1783500736776.png" "$dst\photography-hero.jpg" -Force
Copy-Item "$src\videography_hero_1783500750038.png" "$dst\videography-hero.jpg" -Force
Copy-Item "$src\portfolio_hero_1783500764610.png"   "$dst\portfolio-hero.jpg"   -Force
Copy-Item "$src\blog_hero_1783500780528.png"        "$dst\blog-hero.jpg"        -Force
Copy-Item "$src\contact_hero_1783500795887.png"     "$dst\contact-hero.jpg"     -Force
Copy-Item "$src\album_garden_1783505618762.png"     "$dst\album-garden.jpg"     -Force
Copy-Item "$src\album_heritage_1783505635685.png"   "$dst\album-heritage.jpg"   -Force
Copy-Item "$src\album_ballroom_1783505649493.png"   "$dst\album-ballroom.jpg"   -Force
Copy-Item "$src\avatar_ananya_1783515774633.png"     "$dst\avatar-ananya.jpg"    -Force
Copy-Item "$src\avatar_priya_1783515792209.png"      "$dst\avatar-priya.jpg"     -Force
Copy-Item "$src\avatar_riya_1783518721624.png"      "$dst\avatar-riya.jpg"     -Force
Write-Host "`n[OK] New logo, 8 hero banners, 3 featured albums, and couple avatars copied successfully!" -ForegroundColor Green
Write-Host "[Info] Location: $dst" -ForegroundColor Cyan
