# Budget Buddy

Budget Buddy is a personal budget management application that helps you keep track of your expenses and income.

## Features

- **Transaction History:** View a history of your transactions.
- **Expense Tracking:** Categorize and track your expenses.
- **Income Tracking:** Log your income sources.
- **Create Budgets:** Set and manage budgets for specific time periods.

## Technologies Used

- Frontend: React
- Backend: FastAPI (Python)
- Database: MySQL

## Getting Started

### Prerequisites

- Node.js
- npm
- Python
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/budget-buddy.git
   ```

2. Install dependencies:

```bash
cd budget-buddy/frontend
npm install
cd budget-buddy/backend
pip install -r requirements.txt
```

3. Configure Database in `backend/app/models/database.py`:

`SQLALCHEMY_DATABASE_URL = "URL/of/your/database"`

4. Run the application:

```bash
# Frontend
cd budget-buddy/frontend/react_app
npm run dev

# Backend
cd budget-buddy/backend/app
uvicorn main:app --reload

```

### Contributing

If you'd like to contribute, please fork the repository and create a pull request. Open issues for feedback, bug reports, or feature requests.

**Happy Budgeting!** ⭐️

Feel free to customize the sections, add badges, and provide more detailed information based on your project's structure and requirements.
