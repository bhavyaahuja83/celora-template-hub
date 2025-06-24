
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import razorpay
import os
from typing import Optional, List
import uuid
from datetime import datetime
import json

app = FastAPI(title="Celora Backend API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Razorpay client (initialize with your keys)
razorpay_client = razorpay.Client(auth=(
    os.getenv("RAZORPAY_KEY_ID", "your_key_id"),
    os.getenv("RAZORPAY_KEY_SECRET", "your_key_secret")
))

# Mock database (replace with actual database in production)
templates_db = []
users_db = []
purchases_db = []

# Models
class Template:
    def __init__(self, id: str, title: str, description: str, price: int, 
                 user_id: str, category: str, tags: List[str], file_url: str, 
                 thumbnail: str, status: str = "pending"):
        self.id = id
        self.title = title
        self.description = description
        self.price = price
        self.user_id = user_id
        self.category = category
        self.tags = tags
        self.file_url = file_url
        self.thumbnail = thumbnail
        self.status = status
        self.created_at = datetime.now()
        self.downloads = 0
        self.rating = 0.0
        self.reviews = []

class User:
    def __init__(self, id: str, email: str, name: str):
        self.id = id
        self.email = email
        self.name = name
        self.created_at = datetime.now()
        self.is_verified = False

class Purchase:
    def __init__(self, id: str, user_id: str, template_id: str, amount: int, payment_id: str):
        self.id = id
        self.user_id = user_id
        self.template_id = template_id
        self.amount = amount
        self.payment_id = payment_id
        self.created_at = datetime.now()

# Helper functions
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    # In production, validate JWT token here
    # For now, return mock user
    return {"id": "user123", "email": "user@example.com", "name": "John Doe"}

# Auth endpoints
@app.post("/auth/signup")
async def signup(email: str = Form(...), password: str = Form(...), name: str = Form(...)):
    """User registration endpoint"""
    # Check if user already exists
    existing_user = next((u for u in users_db if u.email == email), None)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create new user
    user_id = str(uuid.uuid4())
    new_user = User(id=user_id, email=email, name=name)
    users_db.append(new_user)
    
    # In production, hash password and create JWT token
    token = f"mock_token_{user_id}"
    
    return {
        "success": True,
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "name": new_user.name
        },
        "token": token
    }

@app.post("/auth/login")
async def login(email: str = Form(...), password: str = Form(...)):
    """User login endpoint"""
    # Find user
    user = next((u for u in users_db if u.email == email), None)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # In production, verify password hash and create JWT token
    token = f"mock_token_{user.id}"
    
    return {
        "success": True,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name
        },
        "token": token
    }

# Template endpoints
@app.get("/templates")
async def get_templates(category: Optional[str] = None, limit: int = 20, offset: int = 0):
    """Get list of templates with optional filtering"""
    filtered_templates = templates_db
    
    if category:
        filtered_templates = [t for t in templates_db if t.category.lower() == category.lower()]
    
    # Apply pagination
    paginated = filtered_templates[offset:offset + limit]
    
    return {
        "templates": [
            {
                "id": t.id,
                "title": t.title,
                "description": t.description,
                "price": t.price,
                "category": t.category,
                "tags": t.tags,
                "thumbnail": t.thumbnail,
                "downloads": t.downloads,
                "rating": t.rating,
                "created_at": t.created_at.isoformat()
            }
            for t in paginated
        ],
        "total": len(filtered_templates)
    }

@app.get("/templates/{template_id}")
async def get_template(template_id: str):
    """Get specific template details"""
    template = next((t for t in templates_db if t.id == template_id), None)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    return {
        "id": template.id,
        "title": template.title,
        "description": template.description,
        "price": template.price,
        "category": template.category,
        "tags": template.tags,
        "thumbnail": template.thumbnail,
        "file_url": template.file_url,
        "downloads": template.downloads,
        "rating": template.rating,
        "status": template.status,
        "created_at": template.created_at.isoformat()
    }

@app.post("/templates/upload")
async def upload_template(
    title: str = Form(...),
    description: str = Form(...),
    price: int = Form(...),
    category: str = Form(...),
    tags: str = Form(...),
    template_file: UploadFile = File(...),
    thumbnail: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Upload a new template"""
    # Parse tags
    tag_list = [tag.strip() for tag in tags.split(",")]
    
    # In production, upload files to cloud storage (S3, Supabase Storage, etc.)
    template_id = str(uuid.uuid4())
    file_url = f"/storage/templates/{template_id}/{template_file.filename}"
    thumbnail_url = f"/storage/thumbnails/{template_id}/{thumbnail.filename}"
    
    # Create template
    new_template = Template(
        id=template_id,
        title=title,
        description=description,
        price=price,
        user_id=current_user["id"],
        category=category,
        tags=tag_list,
        file_url=file_url,
        thumbnail=thumbnail_url
    )
    
    templates_db.append(new_template)
    
    return {
        "success": True,
        "template": {
            "id": new_template.id,
            "title": new_template.title,
            "status": new_template.status
        }
    }

@app.get("/templates/user/{user_id}")
async def get_user_templates(user_id: str, current_user: dict = Depends(get_current_user)):
    """Get templates uploaded by a specific user"""
    user_templates = [t for t in templates_db if t.user_id == user_id]
    
    return {
        "templates": [
            {
                "id": t.id,
                "title": t.title,
                "description": t.description,
                "price": t.price,
                "category": t.category,
                "status": t.status,
                "downloads": t.downloads,
                "created_at": t.created_at.isoformat()
            }
            for t in user_templates
        ]
    }

# Payment endpoints
@app.post("/payment/create-order")
async def create_payment_order(
    template_id: str = Form(...),
    current_user: dict = Depends(get_current_user)
):
    """Create Razorpay order for template purchase"""
    # Find template
    template = next((t for t in templates_db if t.id == template_id), None)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    # Check if user already purchased this template
    existing_purchase = next(
        (p for p in purchases_db if p.user_id == current_user["id"] and p.template_id == template_id),
        None
    )
    if existing_purchase:
        raise HTTPException(status_code=400, detail="Template already purchased")
    
    # Create Razorpay order
    order_data = {
        "amount": template.price * 100,  # Amount in paise
        "currency": "INR",
        "receipt": f"template_{template_id}_{current_user['id']}",
        "notes": {
            "template_id": template_id,
            "user_id": current_user["id"]
        }
    }
    
    try:
        order = razorpay_client.order.create(data=order_data)
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "template": {
                "id": template.id,
                "title": template.title,
                "price": template.price
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")

@app.post("/payment/verify")
async def verify_payment(
    order_id: str = Form(...),
    payment_id: str = Form(...),
    signature: str = Form(...),
    current_user: dict = Depends(get_current_user)
):
    """Verify Razorpay payment and complete purchase"""
    try:
        # Verify payment signature
        params_dict = {
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        }
        
        razorpay_client.utility.verify_payment_signature(params_dict)
        
        # Get order details to find template
        order = razorpay_client.order.fetch(order_id)
        template_id = order["notes"]["template_id"]
        
        # Find template
        template = next((t for t in templates_db if t.id == template_id), None)
        if not template:
            raise HTTPException(status_code=404, detail="Template not found")
        
        # Create purchase record
        purchase_id = str(uuid.uuid4())
        new_purchase = Purchase(
            id=purchase_id,
            user_id=current_user["id"],
            template_id=template_id,
            amount=template.price,
            payment_id=payment_id
        )
        
        purchases_db.append(new_purchase)
        
        # Update template download count
        template.downloads += 1
        
        return {
            "success": True,
            "purchase_id": purchase_id,
            "download_url": template.file_url
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Payment verification failed: {str(e)}")

# Dashboard endpoints
@app.get("/dashboard/stats")
async def get_dashboard_stats(current_user: dict = Depends(get_current_user)):
    """Get user dashboard statistics"""
    user_templates = [t for t in templates_db if t.user_id == current_user["id"]]
    user_purchases = [p for p in purchases_db if any(t.id == p.template_id and t.user_id == current_user["id"] for t in templates_db)]
    
    total_earnings = sum(p.amount for p in user_purchases)
    total_downloads = sum(t.downloads for t in user_templates)
    total_views = sum(getattr(t, 'views', 0) for t in user_templates)
    
    return {
        "total_earnings": total_earnings,
        "total_downloads": total_downloads,
        "total_templates": len(user_templates),
        "total_views": total_views,
        "recent_purchases": [
            {
                "template_id": p.template_id,
                "amount": p.amount,
                "created_at": p.created_at.isoformat()
            }
            for p in user_purchases[-5:]  # Last 5 purchases
        ]
    }

# Admin endpoints
@app.get("/admin/templates/pending")
async def get_pending_templates(current_user: dict = Depends(get_current_user)):
    """Get templates pending approval (admin only)"""
    # In production, check if user is admin
    pending_templates = [t for t in templates_db if t.status == "pending"]
    
    return {
        "templates": [
            {
                "id": t.id,
                "title": t.title,
                "description": t.description,
                "user_id": t.user_id,
                "category": t.category,
                "price": t.price,
                "created_at": t.created_at.isoformat()
            }
            for t in pending_templates
        ]
    }

@app.post("/admin/templates/{template_id}/approve")
async def approve_template(template_id: str, current_user: dict = Depends(get_current_user)):
    """Approve a template (admin only)"""
    template = next((t for t in templates_db if t.id == template_id), None)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    template.status = "approved"
    
    return {"success": True, "message": "Template approved"}

@app.post("/admin/templates/{template_id}/reject")
async def reject_template(template_id: str, reason: str = Form(...), current_user: dict = Depends(get_current_user)):
    """Reject a template (admin only)"""
    template = next((t for t in templates_db if t.id == template_id), None)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    template.status = "rejected"
    
    return {"success": True, "message": "Template rejected", "reason": reason}

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
