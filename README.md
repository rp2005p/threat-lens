🚀 ThreatLens

AI-Powered Network Intrusion Detection & Cyber Threat Analysis Dashboard

ThreatLens is a full-stack machine learning application designed to detect cyber attacks from network traffic logs and visualize insights through a modern dashboard.

---

🧠 Overview

ThreatLens allows users to:

- Upload network log data (CSV)
- Detect malicious traffic using ML models
- Analyze attack density and risk levels
- View service-level vulnerability insights

---

⚙️ Machine Learning Pipeline

🔹 Dataset

Trained on structured network intrusion dataset (KDD-style).

---

🔹 Preprocessing

- One-hot encoding:
  - "protocol_type"
  - "service"
  - "flag"
- Feature scaling using StandardScaler
- Label transformation (normal vs attack)

---

🔹 Feature Selection

Performed using:

- Correlation filtering
- Tree-based feature importance
- Domain knowledge (network relevance)

Goal:

- Reduce noise
- Improve performance
- Enhance generalization

---

🔹 Models Evaluated

- Decision Tree
- Random Forest
- KNN
- Naive Bayes

---

✅ Final Model: Random Forest

Why Random Forest?

- Handles high-dimensional tabular data
- Reduces overfitting vs Decision Tree
- Captures non-linear relationships
- Provides stable and accurate predictions

---

🌐 Web Application

🔹 Frontend

- React (Vite)
- Tailwind CSS
- Recharts

Features:

- Donut chart (traffic distribution)
- Gradient bar chart (attack density)
- Area chart (attack flow)
- Service risk analysis table

---

🔹 Backend

- FastAPI
- Handles:
  - File upload
  - Data preprocessing
  - Feature alignment
  - Model inference

---

📊 Input CSV Format

The input must follow KDD-style structure.

Required Columns:

duration, protocol_type, service, flag,
src_bytes, dst_bytes,
land, wrong_fragment, urgent, hot,
num_failed_logins, logged_in, num_compromised,
root_shell, su_attempted, num_root,
num_file_creations, num_shells, num_access_files,
num_outbound_cmds, is_host_login, is_guest_login,
count, srv_count, serror_rate, srv_serror_rate,
rerror_rate, srv_rerror_rate, same_srv_rate,
diff_srv_rate, srv_diff_host_rate,
dst_host_count, dst_host_srv_count,
dst_host_same_srv_rate, dst_host_diff_srv_rate,
dst_host_same_src_port_rate, dst_host_srv_diff_host_rate,
dst_host_serror_rate, dst_host_srv_serror_rate,
dst_host_rerror_rate, dst_host_srv_rerror_rate

📌 Notes:

- Extra columns are ignored
- Missing columns are auto-filled
- Sample CSV provided

---

📁 Project Structure

CYBER_SAAS/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── model/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── nid.ipynb
├── README.md
└── .gitignore

---

🚀 Deployment

- Frontend → Vercel
- Backend → Render

---

🧪 Usage

1. Open the web app
2. Upload CSV file
3. Click Analyze
4. View:
   - Attack percentage
   - Risk level
   - Charts and insights

---

🤝 Collaboration

Developed collaboratively using GitHub with role-based contributions:

- ML & Backend Development
- Frontend & UI/UX Design

---

🛠️ Tech Stack

- React (Vite), Tailwind CSS
- FastAPI (Python)
- Scikit-learn, Pandas, NumPy
- Vercel & Render

---

🔥 Conclusion

ThreatLens demonstrates practical application of machine learning in cybersecurity, combining strong data modeling with an intuitive user interface.

---