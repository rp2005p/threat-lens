from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import numpy as np

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model assets
model = joblib.load("model/model.pkl")
scaler = joblib.load("model/scaler.pkl")
train_columns = joblib.load("model/columns.pkl")

# Column names
raw_columns = [
    "duration","protocol_type","service","flag","src_bytes","dst_bytes",
    "land","wrong_fragment","urgent","hot","num_failed_logins","logged_in",
    "num_compromised","root_shell","su_attempted","num_root",
    "num_file_creations","num_shells","num_access_files","num_outbound_cmds",
    "is_host_login","is_guest_login","count","srv_count","serror_rate",
    "srv_serror_rate","rerror_rate","srv_rerror_rate","same_srv_rate",
    "diff_srv_rate","srv_diff_host_rate","dst_host_count",
    "dst_host_srv_count","dst_host_same_srv_rate",
    "dst_host_diff_srv_rate","dst_host_same_src_port_rate",
    "dst_host_srv_diff_host_rate","dst_host_serror_rate",
    "dst_host_srv_serror_rate","dst_host_rerror_rate",
    "dst_host_srv_rerror_rate","label"
]

@app.get("/")
def home():
    return {"message": "Backend is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # ✅ Read file ONCE
        df = pd.read_csv(file.file, names=raw_columns)

        # Keep original for service analysis
        original_df = df.copy()

        # Drop label for prediction
        df = df.drop("label", axis=1)

        # One-hot encoding
        categorical_cols = ['protocol_type', 'service', 'flag']
        df = pd.get_dummies(df, columns=categorical_cols)

        # Align columns
        for col in train_columns:
            if col not in df.columns:
                df[col] = 0

        df = df[train_columns]

        # Scale
        X = scaler.transform(df)

        # Predict
        preds = model.predict(X)

        total = len(preds)
        attacks = int(sum(preds != 0))
        normal = total - attacks

        # 🔥 1. Attack Density (segmentation)
        chunks = np.array_split(preds, 5)
        density_data = [
            {"segment": f"S{i+1}", "attacks": int(sum(chunk != 0))}
            for i, chunk in enumerate(chunks)
        ]

        # 🔥 2. Severity
        ratio = attacks / total
        if ratio > 0.7:
            severity = "High"
        elif ratio > 0.3:
            severity = "Moderate"
        else:
            severity = "Low"

        # 🔥 3. Service-based Analysis (KEY FEATURE)
        services = original_df["service"]

        service_counts = {}

        for s, pred in zip(services, preds):
            if s not in service_counts:
                service_counts[s] = {"total": 0, "attacks": 0}

            service_counts[s]["total"] += 1

            if pred != 0:
                service_counts[s]["attacks"] += 1

        service_data = [
            {
                "service": k,
                "total": v["total"],
                "attacks": v["attacks"],
                "rate": round(v["attacks"] / v["total"] * 100, 2)
            }
            for k, v in service_counts.items()
        ]

        # Sort by highest risk
        service_data = sorted(
            service_data,
            key=lambda x: x["attacks"],
            reverse=True
        )[:8]

        return {
            "total": total,
            "attacks": attacks,
            "normal": normal,
            "attack_percentage": float(ratio * 100),
            "density": density_data,
            "severity": severity,
            "services": service_data   # 🔥 NEW DATA FOR TABLE
        }

    except Exception as e:
        return {"error": str(e)}