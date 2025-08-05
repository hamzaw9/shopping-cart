# 🛍️ Shopping Cart <a name="about-project"></a>

This is a **shopping cart application** built with **React (TypeScript)**, **Vite**, and **Tailwind CSS v4**. It demonstrates core React concepts like *component-based architecture*, *state management*, and *page navigation*.

## 🧩 Features

- Two main pages: **Home** and **Shop**, with navigation using **React Router**.
- A **shared navigation bar** on all pages that:
  - Links between pages.
  - Displays the **current cart item count**.
  - Includes a placeholder **“Go to Cart”** button (non-functional).
- **Product cards** display:
  - **Title**, **quantity input**, and **Add to Cart** button.
  - Buttons to **increment** or **decrement** the quantity.
- **Products are fetched** from the [FakeStore API](https://fakestoreapi.com/).
- When a user adds an item to the cart:
  - The **cart updates in real-time**.
  - Quantity logic is handled via **controlled inputs** and **state updates**.
