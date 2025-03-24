import React from 'react'
import { FaChartLine, FaWallet, FaHandshake, FaCreditCard } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const Feature = () => {
  return (
    <>

   <section className="features-section mt-15">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Track Spending</h3>
            <p>
              Monitor your expenses and income with easy-to-read charts and
              reports.
            </p>
          </div>
          <div className="feature-card">
            <FaWallet className="feature-icon" />
            <h3>Budgeting Tools</h3>
            <p>
              Create and manage budgets to stay on top of your financial goals.
            </p>
          </div>
          <div className="feature-card">
            <FaHandshake className="feature-icon" />
            <h3>Investment Advice</h3>
            <p>
              Get expert advice to grow your wealth and make smart investment
              decisions.
            </p>
          </div>
          <div className="feature-card">
            <FaCreditCard className="feature-icon" />
            <h3>Secure Transactions</h3>
            <p>
              Enjoy secure and seamless transactions with our advanced
              encryption technology.
            </p>
          </div>
        </div>
      </section>

      
    
    </>
  )
}

export default Feature
