import React from "react";
//Used react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute    from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Auth pages
import Login          from "./pages/auth/Login";
import Register       from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Customer pages 
import CustomerDashboard  from "./pages/customer/CustomerDashboard";
import Accounts           from "./pages/customer/Accounts";
import OpenAccount        from "./pages/customer/OpenAccount";
import Deposit            from "./pages/customer/Deposit";
import Withdraw           from "./pages/customer/Withdraw";
import Transfer           from "./pages/customer/Transfer";
import TransactionHistory from "./pages/customer/TransactionHistory";
import Beneficiaries      from "./pages/customer/Beneficiaries";
import LoanProducts       from "./pages/customer/LoanProducts";
import ApplyLoan          from "./pages/customer/ApplyLoan";
import MyLoans            from "./pages/customer/MyLoans";

// Employee pages
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ManageAccounts    from "./pages/employee/ManageAccounts";
import ManageLoans       from "./pages/employee/ManageLoans";
import AllTransactions   from "./pages/employee/AllTransactions";
import Reports           from "./pages/employee/Reports";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers    from "./pages/admin/ManageUsers";
import AddEmployee    from "./pages/admin/AddEmployee";
import Unauthorized from "./pages/Unauthorized";

const App: React.FC = () => {
  return (
    
        <Routes>
          {/* Default */}
          <Route path="/" element={<Home />} />

          {/* Public */}
          <Route path="/login"           element={<Login />} />
          <Route
  path="/about"
  element={<About />}
/>

<Route
  path="/contact"
  element={<Contact />}
/>
          <Route path="/register"        element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Customer */}
          <Route path="/customer/dashboard"    element={<PrivateRoute allowedRoles={["Customer"]}><CustomerDashboard /></PrivateRoute>} />
          <Route path="/customer/accounts"     element={<PrivateRoute allowedRoles={["Customer"]}><Accounts /></PrivateRoute>} />
          <Route path="/customer/open-account" element={<PrivateRoute allowedRoles={["Customer"]}><OpenAccount /></PrivateRoute>} />
          <Route path="/customer/deposit"      element={<PrivateRoute allowedRoles={["Customer"]}><Deposit /></PrivateRoute>} />
          <Route path="/customer/withdraw"     element={<PrivateRoute allowedRoles={["Customer"]}><Withdraw /></PrivateRoute>} />
          <Route path="/customer/transfer"     element={<PrivateRoute allowedRoles={["Customer"]}><Transfer /></PrivateRoute>} />
          <Route path="/customer/transactions" element={<PrivateRoute allowedRoles={["Customer"]}><TransactionHistory /></PrivateRoute>} />
          <Route path="/customer/beneficiaries"element={<PrivateRoute allowedRoles={["Customer"]}><Beneficiaries /></PrivateRoute>} />
          <Route path="/customer/loan-products"element={<PrivateRoute allowedRoles={["Customer"]}><LoanProducts /></PrivateRoute>} />
          <Route path="/customer/apply-loan"   element={<PrivateRoute allowedRoles={["Customer"]}><ApplyLoan /></PrivateRoute>} />
          <Route path="/customer/my-loans"     element={<PrivateRoute allowedRoles={["Customer"]}><MyLoans /></PrivateRoute>} />

          {/* Employee */}
          <Route path="/employee/dashboard"    element={<PrivateRoute allowedRoles={["Employee"]}><EmployeeDashboard /></PrivateRoute>} />
          <Route path="/employee/accounts"     element={<PrivateRoute allowedRoles={["Employee"]}><ManageAccounts /></PrivateRoute>} />
          <Route path="/employee/loans"        element={<PrivateRoute allowedRoles={["Employee"]}><ManageLoans /></PrivateRoute>} />
          <Route path="/employee/transactions" element={<PrivateRoute allowedRoles={["Employee"]}><AllTransactions /></PrivateRoute>} />
          <Route path="/employee/reports"      element={<PrivateRoute allowedRoles={["Employee"]}><Reports /></PrivateRoute>} />

          {/* Admin */}
          <Route path="/admin/dashboard"    element={<PrivateRoute allowedRoles={["Admin"]}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/users"        element={<PrivateRoute allowedRoles={["Admin"]}><ManageUsers /></PrivateRoute>} />
          <Route path="/admin/add-employee" element={<PrivateRoute allowedRoles={["Admin"]}><AddEmployee /></PrivateRoute>} />

          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />
          
          <Route
            path="*"
              element={<NotFound />} 
          />

        </Routes>
      
  );
};

export default App;