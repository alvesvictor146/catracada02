@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================================
echo   DEPLOY CATRACADA02 PARA GITHUB E GITHUB PAGES
echo   Repositorio: https://github.com/alvesvictor146/catracada02.git
echo ========================================================

if not exist ".git" (
    git init
)

git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/alvesvictor146/catracada02.git

git add .
git commit -m "feat: Catracada Shopify OS 2.0 redesign + GitHub Pages preview"
git push -u origin main --force

echo.
echo ========================================================
echo   UPLOAD CONCLUIDO!
echo   URL do GitHub Pages (apos ativar Pages na branch main):
echo   https://alvesvictor146.github.io/catracada02/
echo ========================================================
pause
