"""
Predictive Attrition Risk & Flight Risk Attribution Model
Trains an enterprise ensemble classifier (Random Forest / Gradient Boosting)
predicting flight probability and explaining underlying risk drivers.
"""

import pandas as pd
import numpy as np
import pickle
import os
import sys
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from config.settings import SILVER_DATA_PATH, MODEL_SAVE_PATH, RANDOM_STATE, TEST_SIZE

NUMERIC_FEATURES = [
    "tenure_months", "compa_ratio", "monthly_overtime_hours", 
    "utilization_rate", "performance_rating", "training_hours", 
    "burnout_risk_index", "job_satisfaction_score", 
    "manager_relationship_score", "work_life_balance_score", 
    "growth_opportunity_score", "sentiment_polarity"
]

CATEGORICAL_FEATURES = [
    "service_line", "rank_level", "promotion_last_24m", "manager_change_last_12m"
]

TARGET = "attrition_flag"

def train_attrition_model():
    print("\n--- [ML Training: Predictive Flight Risk Classifier] ---")
    if not SILVER_DATA_PATH.exists():
        raise FileNotFoundError(f"Processed data not found at {SILVER_DATA_PATH}. Run ETL pipeline first.")
        
    df = pd.read_parquet(SILVER_DATA_PATH)
    print(f"Loaded {len(df)} records for training and validation.")
    
    X = df[NUMERIC_FEATURES + CATEGORICAL_FEATURES]
    y = df[TARGET]
    
    # Train / Test split with stratification
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE, stratify=y
    )
    
    # Preprocessing Pipeline
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), NUMERIC_FEATURES),
            ("cat", OneHotEncoder(drop="first", handle_unknown="ignore"), CATEGORICAL_FEATURES)
        ]
    )
    
    # Ensemble Classifier
    classifier = GradientBoostingClassifier(
        n_estimators=150,
        learning_rate=0.08,
        max_depth=4,
        subsample=0.85,
        random_state=RANDOM_STATE
    )
    
    pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("classifier", classifier)
    ])
    
    print("Fitting Gradient Boosting Pipeline...")
    pipeline.fit(X_train, y_train)
    
    # Evaluation
    y_pred = pipeline.predict(X_test)
    y_prob = pipeline.predict_proba(X_test)[:, 1]
    
    roc_auc = roc_auc_score(y_test, y_prob)
    cm = confusion_matrix(y_test, y_pred)
    
    print("\n================ MODEL EVALUATION METRICS ================")
    print(f"ROC-AUC Score: {roc_auc:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=["Retained", "Attrited"]))
    print(f"Confusion Matrix:\n{cm}")
    print("==========================================================")
    
    # Extract Feature Importances
    feature_names = (
        NUMERIC_FEATURES + 
        list(pipeline.named_steps["preprocessor"].named_transformers_["cat"].get_feature_names_out(CATEGORICAL_FEATURES))
    )
    importances = pipeline.named_steps["classifier"].feature_importances_
    
    importance_df = pd.DataFrame({
        "feature": feature_names,
        "importance": importances
    }).sort_values(by="importance", ascending=False)
    
    print("\nTop 7 Risk Predictor Features:")
    for idx, row in importance_df.head(7).iterrows():
        print(f" - {row['feature']}: {row['importance']:.4f}")
        
    # Serialize Pipeline
    MODEL_SAVE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(MODEL_SAVE_PATH, "wb") as f:
        pickle.dump(pipeline, f)
    print(f"\nModel artifacts successfully serialized to {MODEL_SAVE_PATH}")
    
    return pipeline, importance_df

def predict_employee_risk(employee_dict: dict) -> dict:
    """Inference helper: Predicts risk score and pinpoints specific risk factors."""
    with open(MODEL_SAVE_PATH, "rb") as f:
        pipeline = pickle.load(f)
        
    df_single = pd.DataFrame([employee_dict])
    prob = pipeline.predict_proba(df_single)[0, 1]
    
    risk_tier = (
        "Critical" if prob >= 0.75 else
        "High" if prob >= 0.55 else
        "Medium" if prob >= 0.35 else "Low"
    )
    
    # Root cause diagnostic heuristics
    drivers = []
    if employee_dict.get("compa_ratio", 1.0) < 0.90:
        drivers.append("Below-market compensation ratio (<0.90)")
    if employee_dict.get("monthly_overtime_hours", 0) > 30:
        drivers.append("Excessive sustained overtime (>30 hrs/mo)")
    if employee_dict.get("work_life_balance_score", 5) <= 2:
        drivers.append("Depressed work-life balance satisfaction")
    if employee_dict.get("promotion_last_24m", 1) == 0 and employee_dict.get("tenure_months", 0) > 24:
        drivers.append("Career stagnation (no promotion in 24+ months)")
    if employee_dict.get("manager_relationship_score", 5) <= 2:
        drivers.append("Friction in supervisor/manager alignment")

    return {
        "flight_risk_probability": round(float(prob), 4),
        "risk_tier": risk_tier,
        "primary_drivers": drivers
    }

if __name__ == "__main__":
    train_attrition_model()
