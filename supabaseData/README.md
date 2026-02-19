# Database Architecture Documentation

This document provides an overview of the database architecture for the Electrones project, detailing the schema for various entities.

## Tables

### Users
- **user_id**: Unique identifier for the user (Primary Key)
- **username**: User's chosen username
- **email**: User's email address
- **password_hash**: Hashed password for secure storage
- **created_at**: Timestamp of user creation

### Transactions
- **transaction_id**: Unique identifier for the transaction (Primary Key)
- **user_id**: Identifier linking to the Users table (Foreign Key)
- **amount**: Amount of the transaction
- **transaction_type**: Type of transaction (e.g., credit, debit)
- **created_at**: Timestamp of transaction creation

### Achievements
- **achievement_id**: Unique identifier for the achievement (Primary Key)
- **user_id**: Identifier linking to the Users table (Foreign Key)
- **title**: Title of the achievement
- **description**: Description of the achievement
- **date_awarded**: Date the achievement was awarded

### Products
- **product_id**: Unique identifier for the product (Primary Key)
- **name**: Name of the product
- **description**: Description of the product
- **price**: Sale price of the product
- **stock_quantity**: Available quantity of the product

### Crowdfunding Campaigns
- **campaign_id**: Unique identifier for the campaign (Primary Key)
- **title**: Title of the crowdfunding campaign
- **description**: Description of the campaign
- **goal_amount**: Financial goal for the campaign
- **amount_raised**: Total amount raised
- **start_date**: Campaign start date
- **end_date**: Campaign end date

### Team Assignments
- **assignment_id**: Unique identifier for the team assignment (Primary Key)
- **user_id**: Identifier linking to the Users table (Foreign Key)
- **campaign_id**: Identifier linking to the Crowdfunding Campaigns table (Foreign Key)
- **role**: Role of the user in the campaign
- **assigned_at**: Date the assignment was made

---

This schema serves as a foundation for the Electrones project, ensuring clarity in data management and relationships among entities.