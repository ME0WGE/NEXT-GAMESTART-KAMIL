# GameStart

[![wakatime](https://wakatime.com/badge/user/0c2f7862-9823-4099-98a5-9f50e857da53/project/1b6b4449-f321-44f8-b50e-0aa01621b88e.svg)](https://wakatime.com/badge/user/0c2f7862-9823-4099-98a5-9f50e857da53/project/1b6b4449-f321-44f8-b50e-0aa01621b88e)

## Features

### Credit Point System

- Users can add credits to their account balance through the profile page
- Credit balance is displayed in the navbar next to the username
- At checkout, users can choose between banking card or credit balance payment
- Credit balance is automatically deducted when purchasing with credits
- Insufficient credit balance shows appropriate error messages and disables the credit payment option

### Game Management

- Browse and search free-to-play games
- Add games to cart and checkout
- View game details and videos
- Filter games by category and platform

### User Authentication

- Local authentication with email/password
- OAuth authentication with Google
- Protected routes and user profiles
- Purchase history tracking

## Videos

https://www.freetogame.com//g/{id}/videoplayback.webm

---

## Color Palette

--color-rosy: #bf988a;
--color-ivory: #f6f3ee;
--color-plum: #7c5e6a;
--color-pine: #247c6d;
--color-moss: #a3b18a;
--color-copper: #b87333;
--color-midnight: #031c26;
--color-slate: #475569;

---

## API Endpoints

/games: Retrieve a list of all free-to-play games.
/game?id={game_id}: Retrieve details of a specific game by its ID.
/games?category={category_name}: Retrieve a list of all available games from a specific genre.
/games?platform={platform_name}: Retrieve a list of all available games from a specific platform.
/games?sort-by={sort_name}: Sort games by release date, alphabetical or relevance.

### User Management

/api/users/auth: Authenticate user with email/password
/api/users/oauth: Sync OAuth user data
/api/users/add-credits: Add credits to user account
/api/users/purchase-with-credits: Purchase games using credit balance
/api/users/purchase: Purchase games with regular payment
/api/users/update: Update user profile information
