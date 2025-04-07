# NerdNexus

An e-commerce platform for gaming, anime, and collectibles.

## Current Status

The application has the following features implemented:

- User authentication (registration, login, logout)
- User profile management
- Products listing and details
- Basic error handling for API connectivity issues
- Responsive navigation with role-based UI elements
- Route organization using Next.js route groups
- Shopping cart implementation with add/remove functionality and persistent storage
- Order processing with checkout flow and order history

## Next Steps

Here are the planned next steps for the project:

1. ~~**Shopping Cart Implementation**~~ ✅
   - ~~Create cart state management~~ ✅
   - ~~Add/remove products functionality~~ ✅
   - ~~Cart persistence across sessions~~ ✅

2. ~~**Order Processing**~~ ✅
   - ~~Checkout flow~~ ✅
   - ~~Order history~~ ✅
   - ~~Order details~~ ✅

3. **Product Search and Filtering**
   - Implement search functionality
   - Add category-based filtering
   - Price range filtering

4. **User Reviews and Ratings**
   - Allow users to leave product reviews
   - Implement rating system
   - Show average ratings on product cards

5. **Admin Dashboard**
   - Product management (CRUD)
   - User management
   - Order management
   - Analytics

## Setup Instructions

### Prerequisites
- Node.js 18+ for Frontend
- .NET 9.0 for Backend
- PostgreSQL

### Frontend Setup
1. Navigate to the Frontend directory
2. Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5138
   ```
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

### Backend Setup
1. Navigate to the Backend directory
2. Create a `.env` file with:
   ```
   DATABASE_URL=Host=localhost;Database=NerdNexus;Username=postgres;Password=yourpassword
   JWT_SECRET_KEY=your-secret-key-here
   ```
3. Run `dotnet restore`
4. Run `dotnet run`

## Technologies Used

### Frontend
- Next.js 14 with App Router
- TypeScript
- TailwindCSS
- Lucide React for icons

### Backend
- ASP.NET Core 9.0
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- FluentValidation

## Key Features

### Product Categories
- Video games (new, used, retro)
- Gaming accessories (controllers, headsets, etc.)
- Anime and manga (physical and digital)
- Collectibles and figurines
- Cosplay items and accessories

### User Accounts and Profiles
- Customizable avatars based on popular characters
- Wishlists and collection tracking
- Gamified loyalty program (earn XP for purchases, reviews, etc.)

### Community Features
- User reviews and ratings
- Discussion forums for various fandoms
- User-generated content (fan art, cosplay photos)

### Recommendation Engine
- Suggest products based on user preferences and purchase history
- "If you like this, you might also enjoy..." feature

### Virtual Events
- Online viewing parties for anime premieres
- Live-streamed gaming tournaments

## Technical Implementation

### Frontend (React)

#### Component Structure
- Create reusable components for product cards, review systems, and user profiles
- Implement a responsive design for mobile and desktop users

#### State Management
- Use Redux or Context API for global state management
- Implement real-time updates for inventory and user interactions

#### UI/UX Design
- Design a sleek, modern interface with nerd culture-inspired themes
- Add interactive elements like hover effects on product images

#### Performance Optimization
- Implement lazy loading for images and components
- Use code splitting to improve initial load times

### Backend (C# .NET)

#### API Development
- Create RESTful APIs for product management, user authentication, and order processing
- Implement GraphQL for more efficient data fetching

#### Database Design
- Use Entity Framework Core for ORM
- Design schemas for products, users, orders, and community features

#### Security
- Implement JWT authentication for secure user sessions
- Use HTTPS and implement proper input validation and sanitization

#### Integration
- Connect with payment gateways (e.g., Stripe, PayPal)
- Integrate with external APIs for real-time pricing of collectibles or game keys

#### Scalability
- Implement caching mechanisms (e.g., Redis) for frequently accessed data
- Design the backend to be easily scalable using microservices architecture

## Unique Features to Consider

### Augmented Reality Previews
- Allow users to see how collectibles would look in their space using AR

### Digital Manga Reader
- Integrate a custom manga reader for digital purchases

### Game Key Activation
- Automatic game key delivery and activation through platform integrations (Steam, Epic Games, etc.)

### Cosplay Marketplace
- Allow users to buy, sell, or trade cosplay items

### Loot Box Subscriptions
- Offer mystery boxes with themed items delivered monthly

### Virtual Trading Card Game
- Implement a digital trading card game where users can collect cards through purchases or as bonuses

### 1. Project Setup
- Create the main project directory
- Set up the backend (C# .NET)
- Set up the frontend (React)
- Initialize version control (Git)

### 2. Backend Development (C# .NET)
- Set up the project structure
- Implement user authentication and authorization
- Create data models
- Develop API controllers
- Implement database integration
- Set up middleware and services
- Configure routing and API endpoints
- Implement error handling and logging
- Set up unit tests

### 3. Frontend Development (React)
- Set up the project structure
- Create reusable components
- Implement routing
- Set up state management
- Create API integration services
- Develop main pages and features
- Implement user authentication flow
- Create custom hooks
- Add styling and theming
- Implement responsive design
- Set up unit and integration tests

### 4. Integration and Testing
- Connect frontend with backend APIs
- Implement end-to-end testing
- Perform thorough testing of all features
- Address and fix any bugs or issues

### 5. Deployment and DevOps
- Set up CI/CD pipeline
- Configure production environment
- Deploy backend to a cloud service (e.g., Azure, AWS, render)
- Deploy frontend to a static hosting service (e.g., Netlify, Vercel)
- Set up monitoring and logging

### 6. Post-Launch
- Monitor performance and user feedback
- Implement analytics
- Plan for future features and improvements

## File Structure

### Backend (C# .NET)
Backend/ ├── Controllers/ 
│ ├── AuthController.cs 
│ ├── ProductController.cs 
│ ├── OrderController.cs 
│ ├── UserController.cs 
│ └── CommunityController.cs 
├── Models/ 
│ 
├── Product.cs 
│ ├── Order.cs 
│ ├── User.cs 
│ ├── Review.cs 
│ └── ForumPost.cs 
├── Data/ 
│ 
├── ApplicationDbContext.cs 
│ └── Repositories/ 
│ ├── IRepository.cs 
│ ├── Repository.cs 
│ ├── IProductRepository.cs 
│ └── ProductRepository.cs 
├── Services/ 
│ 
├── IAuthService.cs 
│ 
├── AuthService.cs 
│ 
├── IEmailService.cs 
│ └── EmailService.cs 
├── Middleware/ 
│ ├── ErrorHandlingMiddleware.cs 
│ └── LoggingMiddleware.cs 
├── DTOs/ 
│ 
├── ProductDto.cs 
│ 
├── OrderDto.cs 
│ └── UserDto.cs 
├── Helpers/ 
│ 
├── AutoMapperProfiles.cs 
│ └── JwtTokenGenerator.cs 
├── Configurations/ 
│ 
├── AuthSettings.cs 
│ └── AppSettings.cs 
├── Extensions/ 
│ └── ServiceExtensions.cs 
└── Program.cs


### Frontend (React)

Frontend/ 
├── public/ 
│ 
├── index.html 
│ └── favicon.ico 
├── src/ 
│ 
├── components/ 
│ 
│ 
├── common/ 
│ 
│ 
│ 
├── Header.tsx 
│ 
│ 
│ 
├── Footer.tsx 
│ 
│ 
│ └── LoadingSpinner.tsx 
│ 
│ 
├── products/ 
│ 
│ 
│ 
├── ProductCard.tsx 
│ 
│ 
│ └── ProductList.tsx 
│ 
│ 
├── auth/ 
│ 
│ 
│ 
├── LoginForm.tsx 
│ 
│ 
│ └── RegisterForm.tsx 
│ 
│ └── community/ 
│ 
│ 
├── ForumPost.tsx 
│ 
│ └── ReviewCard.tsx 
│ 
├── pages/ 
│ 
│ 
├── HomePage.tsx 
│ 
│ 
├── ProductPage.tsx 
│ 
│ 
├── CartPage.tsx 
│ 
│ 
├── CheckoutPage.tsx 
│ 
│ 
├── ProfilePage.tsx 
│ 
│ └── CommunityPage.tsx 
│ 
├── hooks/ 
│ 
│ 
├── useAuth.ts 
│ 
│ 
├── useCart.ts 
│ 
│ └── useFetch.ts 
│ 
├── context/ 
│ 
│ 
├── AuthContext.tsx 
│ 
│ └── CartContext.tsx 
│ 
├── services/ 
│ 
│ 
├── api.ts 
│ 
│ 
├── authService.ts 
│ 
│ └── productService.ts 
│ 
├── utils/ 
│ 
│ 
├── formatCurrency.ts 
│ 
│ └── validateInput.ts 
│ 
├── types/ 
│ 
│ 
├── Product.ts 
│ 
 
 ├── User.ts 
 │ 
 │ └── Order.ts 
 │ 
 ├── styles/ 
 │ 
 │ 
 ├── global.css 
 │ 
 │ └── theme.ts 
 │ 
 ├── App.tsx 
 │ └── index.tsx 
 ├── package.json 
 ├── tsconfig.json 
 └── .env
