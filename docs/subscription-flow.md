### **Registration Flow**  
- User starts at **`/register`** route.  
- Fills out the registration form with:  
  - Email address  
  - Name  
- Backend creates a **Stripe customer** using the `createCustomer` API.  
- After successful registration, user is redirected to **`/prices`**.  

### **Subscription Selection**  
- At **`/prices`**, user sees available subscription plans.  
- Each plan displays:  
  - Product name  
  - Monthly price  
  - Subscribe button  
- When user selects a plan:  
  - Frontend sends **price ID** and **customer ID**.  
  - Backend creates a **Stripe subscription** using the `createSubscription` API.  
  - User is redirected to **`/subscribe`** with a **client secret**.  

### **Payment Setup**  
- At **`/subscribe`**, user enters card details using **Stripe Elements**.  
- Test cards available:  
  - **Success:** `4242 4242 4242 4242`  
  - **SCA required:** `4000 0025 0000 3155`  
- After successful payment confirmation:  
  - User is redirected to **`/account`**.  

### **Account Management**  
- At **`/account`**, user can view active subscriptions.  
- Each subscription shows:  
  - Subscription ID  
  - Status  
  - Card last 4 digits  
  - Link to view invoices  

### **Invoice Listing**  
- At **`/invoices`**, displays all invoices in a table with:  
  - Date  
  - Invoice ID  
  - Amount  
  - Status (**color-coded**)  
  - Description  
  - **Download PDF** link  
- If no invoices exist, an empty state is shown.  

### **List of used ednpoints**  
1. **Customer Creation**  
2. **Price Listing**  
3. **Subscription Creation**  
4. **Invoice Listing**  
5. **Subscription Listing**  