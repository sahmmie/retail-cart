# RetailCart

RetailCart is a simple single-page application (SPA) built with **Angular 18** that simulates a retail shopping cart. Users can browse products, add them to a cart, manage quantities, apply discount codes, and view a real-time total calculation.

## Features

### 🛍️ Product List

- Displays a list of available products.
- Each product has a **name**, **price**, and an **image** (or placeholder).
- Users can add products to the cart.

### 🛒 Shopping Cart

- View added products with their **name, price, and quantity**.
- Modify product quantities or remove items from the cart.
- Calculates **subtotal** (price \* quantity) for each product.
- Shows the **grand total** (sum of all subtotals).

### 🎟️ Discount Code

- Users can apply a discount code.
- Supports:
  - **SAVE10** → 10% off the grand total
  - **SAVE5** → $5 off the grand total
- Displays an error message for invalid codes.

### 🖥️ UI/UX

- Clean and user-friendly interface using **Tailwind CSS**.
- Clear navigation flow:
  - Browse products
  - Add to cart
  - View cart and apply discount
- Navbar with cart item count badge.

### 🔄 Persistence (Bonus)

- Uses **LocalStorage** to persist the cart state across page reloads.

## Tech Stack

- **Angular 18** (framework)
- **TypeScript** (strongly typed JavaScript)
- **Tailwind CSS** (styling)
- **RxJS** (reactive state management)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or later)
- **Angular CLI** (v18.2.13)

### Installation & Setup

```sh
# Clone the repository
git clone https://github.com/yourusername/retail-cart.git
cd retail-cart

# Install dependencies
npm install

# Start the development server
ng serve
```

Navigate to **http://localhost:4200/** in your browser.

---

## 📁 Project Structure

```
retail-cart/
│── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── product-list/
│   │   │   ├── cart/
│   │   ├── services/
│   │   │   ├── cart.service.ts
│   │   ├── interfaces/
│   │   │   ├── product.model.ts
│   │   │   ├── cart-item.model.ts
│   ├── assets/
│   ├── styles/
│   │   ├── styles.scss
```

### Key Components

- **ProductListComponent** → Displays products & "Add to Cart" button.
- **CartComponent** → Shows cart items, allows quantity changes & discount code input.
- **CartService** → Manages cart state across the app.

---

## ✅ Running Tests

### Unit Tests

```sh
ng test
```

Runs tests using **Karma**.

### End-to-End Tests

## 🚀 Deployment

You can deploy the application using **Vercel, Firebase, or Netlify**.

```sh
ng build --prod
```

Then, deploy the `dist/` folder to your preferred hosting platform.

---

## 🔗 Live Demo

Check out the deployed version here: [Live Demo](https://retailcart.netlify.app)

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ibrahim**

- GitHub: [@sahmmie](https://github.com/sahmmie)
- LinkedIn: [Ibrahim Samson](https://linkedin.com/in/ibrahim-samson)

Feel free to contribute or provide feedback! 🚀
