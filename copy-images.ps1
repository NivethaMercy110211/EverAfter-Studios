# ═══════════════════════════════════════════════════════════
#  EverAfter Studios — Copy Images to Project
#  Paste ALL lines below into PowerShell and press Enter
# ═══════════════════════════════════════════════════════════

$dst = "d:\EverAfter Studios\EverAfter Studios\assets\images"
$src = "C:\Users\NIVETHA\.gemini\antigravity-ide\brain\25650f19-d95c-4b2b-ade7-52741e6b4894"
$src_cta = "C:\Users\NIVETHA\.gemini\antigravity-ide\brain\f11403dc-0fec-4ff8-bd0e-04053eb3df12"

New-Item -ItemType Directory -Force -Path $dst | Out-Null

Copy-Item "$src\logo_1783421276454.png"             "$dst\logo.png"             -Force
Copy-Item "$src_cta\home1_hero_1783490481971.png"       "$dst\home1-hero.jpg"       -Force
Copy-Item "$src_cta\home2_hero_1783490505065.png"       "$dst\home2-hero.jpg"       -Force
Copy-Item "$src_cta\about_hero_1783490532639.png"       "$dst\about-hero.jpg"       -Force
Copy-Item "$src_cta\photography_hero_1783490550525.png" "$dst\photography-hero.jpg" -Force
Copy-Item "$src_cta\videography_hero_1783490573139.png" "$dst\videography-hero.jpg" -Force
Copy-Item "$src_cta\portfolio_hero_1783490590915.png"   "$dst\portfolio-hero.jpg"   -Force
Copy-Item "$src_cta\blog_hero_1783490613144.png"        "$dst\blog-hero.jpg"        -Force
Copy-Item "$src_cta\contact_hero_1783490637067.png"     "$dst\contact-hero.jpg"     -Force
Copy-Item "$src\login_bg_1783421428937.png"         "$dst\login-bg.jpg"         -Force
Copy-Item "$src\signup_bg_1783421441198.png"        "$dst\signup-bg.jpg"        -Force
Copy-Item "$src\forgot_bg_1783421682717.png"        "$dst\forgot-bg.jpg"        -Force
Copy-Item "$src\gallery_01_1783421748735.png"       "$dst\gallery-01.jpg"       -Force
Copy-Item "$src\gallery_02_1783421776486.png"       "$dst\gallery-02.jpg"       -Force
Copy-Item "$src\gallery_03_1783421786911.png"       "$dst\gallery-03.jpg"       -Force
Copy-Item "$src\gallery_04_1783421808171.png"       "$dst\gallery-04.jpg"       -Force
Copy-Item "$src\gallery_05_1783421818799.png"       "$dst\gallery-05.jpg"       -Force

# ─── CTA Background Images ────────────────────────────────
Copy-Item "$src_cta\cta_home_1783489915647.png"        "$dst\cta-home.jpg"        -Force
Copy-Item "$src_cta\cta_about_1783489936913.png"       "$dst\cta-about.jpg"       -Force
Copy-Item "$src_cta\cta_photography_1783489959894.png" "$dst\cta-photography.jpg" -Force
Copy-Item "$src_cta\cta_videography_1783489978752.png" "$dst\cta-videography.jpg" -Force
Copy-Item "$src_cta\cta_portfolio_1783490000720.png"   "$dst\cta-portfolio.jpg"   -Force
Copy-Item "$src_cta\cta_blog_1783490016333.png"        "$dst\cta-blog.jpg"        -Force

Write-Host "`n✅ All 23 images copied successfully!" -ForegroundColor Green
Write-Host "📂 Location: $dst" -ForegroundColor Cyan
