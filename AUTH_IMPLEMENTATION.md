# Authentication Implementation - Schritt für Schritt

## 1. Auth Service erstellen
**Datei:** `src/app/services/auth.service.ts`

Service für Authentifizierung mit folgenden Methoden:
- `login(email: string, password: string)` - Login API-Call
- `logout()` - Token entfernen und User abmelden
- `isAuthenticated()` - Prüft ob User angemeldet ist
- `getToken()` - Token aus localStorage holen
- `saveToken(token: string)` - Token speichern
- Verwendet Signals für reactive state management

---

## 2. Auth Guard implementieren
**Datei:** `src/app/guards/auth.guard.ts`

Functional Guard erstellen, der:
- Prüft ob User angemeldet ist (über AuthService)
- Bei nicht-authentifizierten Usern: Umleitung auf `/auth/login`
- Bei authentifizierten Usern: Route erlauben

---

## 3. Login Component erstellen
**Pfad:** `src/app/features/auth/login/`

Component mit:
- Reactive Form für E-Mail und Passwort
- Validierung (required, email-Format)
- Ruft `AuthService.login()` auf
- Leitet bei Erfolg zum Dashboard um (`/dashboard`)
- Zeigt Fehlermeldungen bei fehlgeschlagenem Login

---

## 4. Register Component erstellen
**Pfad:** `src/app/features/auth/register/`

Component mit:
- Reactive Form für Registrierung (E-Mail, Passwort, Passwort-Bestätigung)
- Validierung (Passwörter müssen übereinstimmen, Mindestlänge)
- API-Call zur Registrierung
- Umleitung zum Login nach erfolgreicher Registrierung

---

## 5. Auth Layout Component implementieren
**Pfad:** `src/app/layouts/auth-layout/`

Layout-Component für Login/Register Seiten:
- Zentriertes Design
- Gold/Lila Farbpalette anwenden
- `<router-outlet />` für Login/Register Components
- Responsive Design (Mobile First)

---

## 6. Routes konfigurieren
**Datei:** `src/app/app.routes.ts`

Route-Struktur:
```
/auth (AuthLayoutComponent)
  ├── /auth/login
  └── /auth/register

/ (MainLayoutComponent) - mit authGuard geschützt
  ├── /dashboard
  └── ... weitere geschützte Routes
```

Default-Route (`''`) umleiten auf `/auth/login` wenn nicht angemeldet

---

## 7. HTTP Interceptor für Auth Token
**Datei:** `src/app/interceptors/auth.interceptor.ts`

Interceptor erstellen, der:
- Bei jedem API-Request automatisch den `Authorization` Header hinzufügt
- Format: `Bearer <token>`
- Nur bei Requests an die API (z.B. `api/*`)
- In `app.config.ts` registrieren mit `provideHttpClient(withInterceptors([authInterceptor]))`

---

## 8. App-Initialisierung prüfen
**Datei:** `src/app/app.config.ts`

Beim App-Start:
- Prüfen ob Token im localStorage vorhanden ist
- Wenn ja: User-Session wiederherstellen (optional: Token-Validierung)
- AuthService initialisieren

---

## API-Endpoints (für Referenz)

- **POST** `/api/auth/register` - Registrierung
- **POST** `/api/auth/login` - Login
- **GET** `/api/auth/me` - Aktuellen User abrufen (mit Token)

---

## Farbpalette (für Auth Layout)

```css
--gold: #D4AF37;
--dark-purple: #3D1F47;
--burnt-orange: #CC5500;
--chocolate: #5C4033;
--light-gold: #F4D03F;
--cream: #F5E6D3;
--dark-brown: #3E2723;
```
