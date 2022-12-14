# Generátor fotek

Toto je projekt pro předmět VIA na FEL ČVUT.

## Url
https://via-image-generator.onrender.com

## Cíl projektu
Cílem projektu je vytvořit aplikaci, kde bude moc uživatel zadat základní údaje a aplikace mu vygeneruje obrázek podle údajů.

## Funkcionality
- Generování obrázků
- Přihlášení uživatele
- Uložení vygenerovaného obrázku
- Přehled všech vygenerovaných obrázků

## Technologie
### Frontend
Frontend je založený na Angularu verze 14.

### Backend
Backend je založený na NodeJS s využitím ExpressJS

### Databáze
Jako databáze je použita MongoDB. Databáze je hostovaná na MongoDB Atlas.

## Progress
### 8.12.2022
- Vytvoření základních komponent na frontendu
  - Registrace
  - Login
  - Hlavní stránka
- Příprava modelů entit

### 23.11.2022
- Vytvoření základní struktury projektu
- Založení databázového serveru

## 16.12.2022
- Login a Registrace napojena na DB
- Základní endpointy
- Zabezpečení aplikace
  - Jiné rozhraní pro přihlášeného a odhlášeného uživatele

## 5.1.2023
- Napojení na Dall-E 2
- Vytvoření obrazovky galerie
- Vytvoření obrazovky moje obrázky
- Vytvoření jednoduchého generátoru
- Zabezpečení endpointů pomocí jwt

Bohužel již nyní je Dall-E zpoplatněný. Je tam nastavený limit na maximální počet obrázků. při velkém množství přestane aplikace generovat nové obrázky.

## 8.1.2023
- Dokončení profilu
  - Změna nickname a hesla
- Přidání limitu na maximální počet obrázků
- Dodělání úvodní stránky
- Úprava generování fotek
- Přídání hodnocení fotek
- Přidání odstranění fotek
- Obnovení jwt tokenu při každém zabezpečeném volání
- Odhlášení uživatel po 10 minutách neaktivity
- Přidání Swaggeru

## 9.1.2023
- Nasazení projektu na hosting
- Přidání dalšího API na generování random jména obrázku

## 11.1.2023
- Opravení bugů
- Přidání Dockerfile pro build dockeru
- Přidání ENV variable pro definici API_URL
- Finální nasazení