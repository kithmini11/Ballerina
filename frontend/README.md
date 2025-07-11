# DentiX - Revolutionizing Orthodontic Care in Sri Lanka

A comprehensive web platform connecting doctors, hospitals, suppliers, and patients to streamline orthodontic supply management while supporting low-income patients through an innovative loyalty points system.

---

## 🌟 Features

### For Hospitals
- **Inventory Management**: Track and manage orthodontic supplies  
- **Patient Management**: Comprehensive patient record system  
- **Loyalty Points System**: Earn points with purchases to subsidize low-income patient care  
- **Support Applications**: Submit and manage applications for patient assistance  
- **Staff Coordination**: Manage doctors and hospital operations  

### For Doctors
- **Patient Management**: Access and manage patient records  
- **Treatment Planning**: Plan and track orthodontic treatments  
- **Supply Requests**: Request supplies from hospital inventory  
- **Dashboard Analytics**: View treatment progress and statistics  

### For Suppliers
- **Inventory Management**: Manage product catalog and stock levels  
- **Order Fulfillment**: Process and fulfill hospital orders  
- **Analytics Dashboard**: Track sales and inventory metrics  
- **Automated Alerts**: Get notified about low stock and reorder levels  

### Core Platform Features
- **Multi-channel Ordering**: Order via WhatsApp, SMS, or web platform  
- **Community Support**: Support low-income patients through loyalty points  
- **Role-based Access**: Secure dashboards for each user type  
- **Real-time Notifications**: Stay updated on orders, appointments, and treatments  
- **Responsive Design**: Works seamlessly across desktop and mobile devices  

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/dentix-prototype.git
cd dentix-prototype

# Install dependencies
npm install

# Start the development server
npm start
```

Open your browser and navigate to http://localhost:3000
The app will automatically reload when you make changes.

## 📁 Project Structure

```
dentix-prototype/
├── public/
│   ├── images/             # Static images and logos
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   │   ├── Common/         # Shared components
│   │   │   ├── AboutUs.js
│   │   │   ├── Features.js
│   │   │   ├── HowItWorks.js
│   │   │   ├── Login.js
│   │   │   ├── Navigation.js
│   │   │   └── Signup/
│   │   ├── Doctor/         # Doctor-specific components
│   │   ├── Hospital/       # Hospital-specific components
│   │   ├── Supplier/       # Supplier-specific components
│   │   └── HomePage.js     # Main landing page
│   ├── context/
│   │   └── AuthContext.js  # Authentication context
│   ├── App.js              # Main app component
│   ├── index.js            # App entry point
│   └── index.css           # Global styles
├── package.json
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md
```
## 🛠 Available Scripts

```bash
npm start          # Runs the app in development mode
npm test           # Launches the test runner in watch mode
npm run build      # Builds the app for production
npm run eject      # Ejects CRA setup (irreversible)
```
## 🏥 User Roles & Access
| Role           | Access Path  | Features                                                               |
| -------------- | ------------ | ---------------------------------------------------------------------- |
| Hospital Staff | `/hospital`  | Patient management, inventory tracking, loyalty program administration |
| Doctors        | `/doctor`    | Patient records, treatment planning, supply requests                   |
| Suppliers      | `/supplier`  | Inventory management, order fulfillment, analytics                     |
| Patients       | (via portal) | Treatment tracking, appointment scheduling                             |

## 🎨 Technologies Used
- Frontend: React 18, React Router DOM
- Styling: Tailwind CSS
- State Management: React Context API
- Build Tool: Create React App
- Icons: Heroicons
- Authentication: Custom JWT-based system

## 🔧 Configuration
-Tailwind CSS
  -Configuration can be found in tailwind.config.js

-Environment Setup
  -For production, configure your backend API endpoint variables.

## 📊 Key Components

-Authentication System
 -AuthContext.js: Manages user authentication state
 -Role-based access control per user type

-Main Pages
 -HomePage.js: Landing page with features overview
 -AboutUs.js: Company information and mission
 -Features.js: Detailed feature descriptions
 -HowItWorks.js: Platform usage guide

-Dashboards
 -Hospital: Patient management, loyalty programs, analytics
 -Doctor: Patient records, treatment planning
 -Supplier: Inventory management, order processing

##📝 License
This project is licensed under the MIT License – see the LICENSE file for details.

##🙏 Acknowledgments
-Sri Lankan healthcare professionals who inspired this project
-The open source community
-Government hospitals participating in the orthodontic care initiative

### DentiX – Transforming orthodontic care accessibility in Sri Lanka, one smile at a time. 🦷✨
